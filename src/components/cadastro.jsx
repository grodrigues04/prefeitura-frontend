import { useForm, Controller } from 'react-hook-form';
import { useSignals, useSignal } from '@preact/signals-react/runtime';
import { batch } from '@preact/signals';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { modalAberto, cadastroAlerta, atualizar, pacienteSelecionado, ehAlteracao } from '../signals/index.js';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

function Cadastro() {
	useSignals();
	console.log("Teste")
	const carregando = useSignal(false);
	const openDataEntrada = useSignal(false);
	const openDataSaida = useSignal(false);
	const defaultValues = useSignal();
	const currentYear = dayjs();
	const { control, handleSubmit, reset } = useForm({});
	const apiUrl = import.meta.env.VITE_API_URL;
	const mensagem = useSignal('');
	useEffect(() => {
		if (ehAlteracao.value) {
			reset({
				...pacienteSelecionado.value,
				data_entrada: dayjs(pacienteSelecionado.value.data_entrada, 'DD/MM/YYYY'),
				data_nascimento: dayjs(pacienteSelecionado.value.data_nascimento, 'DD/MM/YYYY')
			});
		}
	}, []);

	const cadastrar = (data) => {
		carregando.value = true;
		cadastroAlerta.value = false;
		data.data_nascimento = data.data_nascimento.format('DD/MM/YYYY');
		data.data_entrada = data.data_entrada.format('DD/MM/YYYY');
		data.alteracao = ehAlteracao.value;
		axios
			.post(`${apiUrl}/cadastro`, {
				data: data
			})
			.then(() => {
				mensagem.value = 'Cadastro realizado com sucesso!';
				cadastroAlerta.value = true;
				atualizar.value = data;
				if (ehAlteracao.value) {
					mensagem.value = 'Edição realizada com sucesso';
				}
			})
			.catch(() => {
				console.log('Ocorreu um erro ao tentar cadastrar/editar o item');
			})
			.finally(() => {
				carregando.value = true;
				ehAlteracao.value = false;
			});
	};

	return (
		<Box>
			<form
				onSubmit={handleSubmit(cadastrar)}
				noValidate
			>
				<Stack
					spacing={{ xs: 1, sm: 2 }}
					direction="column"
					useFlexGap
					sx={{ flexWrap: 'wrap' }}
				>
					<Grid
						container
						spacing={2}
						alignItems="center"
						direction="column"
						justifyContent="center"
					>
						<Grid item>
							<Controller
								name="nome_paciente"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										id="outlined-basic"
										label="Nome do paciente"
										variant="outlined"
										required
									/>
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="data_entrada"
								control={control}
								render={({ field }) => (
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											disableFuture
											views={['day', 'month', 'year']}
											format="DD/MM/YYYY"
											label="Data de entrada"
											open={openDataEntrada.value}
											onOpen={() => {
												batch(() => {
													openDataEntrada.value = true;
													openDataSaida.value = false;
												});
											}}
											onClose={() => (openDataEntrada.value = false)}
											value={field.value || null}
											onChange={(newValue) => field.onChange(newValue)}
											slotProps={{
												textField: {
													required: true,
													fullWidth: true,
													readOnly: true,

													onClick: () => (openDataEntrada.value = true)
												}
											}}
										/>
									</LocalizationProvider>
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="data_nascimento"
								control={control}
								render={({ field }) => (
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											disableFuture
											label="Data de nascimento"
											views={['day', 'month', 'year']}
											format="DD/MM/YYYY"
											value={field.value || null}
											open={openDataSaida.value}
											onOpen={() => {
												batch(() => {
													openDataSaida.value = true;
													openDataEntrada.value = false;
												});
											}}
											onClose={() => (openDataSaida.value = false)}
											onChange={(newValue) => {
												field.onChange(newValue);
											}}
											slotProps={{
												textField: {
													readOnly: true,
													required: true,
													fullWidth: true,
													onClick: () => (openDataSaida.value = true)
												}
											}}
										/>
									</LocalizationProvider>
								)}
							/>
						</Grid>
					</Grid>
					<Button
						variant="contained"
						type="submit"
						fullWidth
					>
						Cadastrar
					</Button>

					{cadastroAlerta.value && (
						<Alert
							icon={<CheckIcon fontSize="inherit" />}
							severity={ehAlteracao.value ? 'info' : 'success'}
						>
							{mensagem.value}
						</Alert>
					)}
					{carregando.value && !cadastroAlerta.value && <LinearProgress />}
				</Stack>
			</form>
		</Box>
	);
}

export default Cadastro;
