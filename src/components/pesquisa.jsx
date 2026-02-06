import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { alfabeto } from '../Common/constantes.js';
import {
	modalAberto,
	cadastroAlerta,
	ehAlteracao,
	modalExclusao,
	dadosTabela,
	dadosPacientes,
	page,
	filtroNome
} from '../signals/index.js';
import Exclusao from './exclusao.jsx';
import Cadastro from './cadastro.jsx';
import Modal from '@mui/material/Modal';
import { useSignals, useSignal } from '@preact/signals-react/runtime';
import { useEffect } from 'react';
function Pesquisa() {
	useSignals();
	const filtroLetra = useSignal('');
	const { control, handleSubmit, watch } = useForm();
	useEffect(() => {
		filtroNome.value = watch('nome') || '';
		page.value = 0;
	}, [watch('nome')]);

	useEffect(() => {
		if (!modalAberto.value) {
			ehAlteracao.value = false;
			cadastroAlerta.value = false;
		}
	}, [modalAberto.value]);

	const handleCloseModal = () => {
		modalAberto.value = !modalAberto.value;
	};

	const handleCloseModalExclusao = () => {
		modalExclusao.value = !modalExclusao.value;
	};
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				alignItems: 'center',
				justifyContent: 'center',
				gap: '10px'
			}}
		>
			<form>
				<Grid
					container
					spacing={{ xs: 1, sm: 2, md: 3 }}
					alignItems="center"
				>
					<Grid
						item
						xs={9}
						md={9}
					>
						<Controller
							name="nome"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									id="outlined-basic"
									label="Nome do paciente"
									variant="outlined"
								/>
							)}
						/>
					</Grid>
					<Grid
						item
						xs={3}
						md={3}
					>
						<Button
							variant="contained"
							onClick={handleCloseModal}
						>
							Cadastrar
						</Button>
					</Grid>
				</Grid>
			</form>

			<Stack
				spacing={{ xs: 1, sm: 2 }}
				direction="row"
				useFlexGap
				sx={{ flexWrap: 'wrap' }}
			>
				{alfabeto.map((letra, index) => (
					<Chip
						key={index}
						label={letra}
						color="primary"
						onClick={(e) => {
							filtroLetra.value = letra;
						}}
					/>
				))}
			</Stack>
			<Modal
				open={modalAberto.value}
				onClose={handleCloseModal}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
						minWidth: 400
					}}
				>
					<Cadastro />
				</Box>
			</Modal>
			<Modal
				title="teste"
				aria-labelledby="modal-modal-title"
				open={modalExclusao.value}
				onClose={handleCloseModalExclusao}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
						minWidth: 400
					}}
				>
					<Exclusao />
				</Box>
			</Modal>
		</Box>
	);
}

export default Pesquisa;
