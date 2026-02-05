import { useForm, Controller } from 'react-hook-form';
import { useSignals, useSignal } from '@preact/signals-react/runtime';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { modalAberto, cadastroAlerta, atualizar } from '../signals/index.js';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
function Cadastro() {
	useSignals();
	const currentYear = dayjs();
	const { control, handleSubmit } = useForm();
	const apiUrl = import.meta.env.VITE_API_URL;
	const cadastrar = (data) => {
		cadastroAlerta.value = false;
		data.saida_exame = data.saida_exame.format('DD/MM/YYYY');
		data.data_entrada = data.data_entrada.format('DD/MM/YYYY');
		axios
			.post(`${apiUrl}/cadastro`, {
				data: data
			})
			.then(() => {
				cadastroAlerta.value = true;
				atualizar.value = data;
			})
			.catch(() => {});
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
											maxDate={currentYear}
											label="Data de entrada"
											value={field.value || null}
											onChange={(newValue) => field.onChange(newValue)}
											slotProps={{
												textField: {
													required: true,
													fullWidth: true
												}
											}}
										/>
									</LocalizationProvider>
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="saida_exame"
								control={control}
								render={({ field }) => (
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											label="Saída dos exames"
											value={field.value || null}
											onChange={(newValue) => field.onChange(newValue)}
											slotProps={{
												textField: {
													required: true,
													fullWidth: true
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
							severity="success"
						>
							Cadastro realizado com sucesso
						</Alert>
					)}
				</Stack>
			</form>
		</Box>
	);
}

export default Cadastro;
