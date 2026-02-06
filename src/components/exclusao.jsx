import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { pacienteSelecionado, modalAberto, modalExclusao, atualizar } from '../signals';
import axios from 'axios';
import { useSignals, useSignal } from '@preact/signals-react/runtime';

function Exclusao() {
	useSignals();
	const apiUrl = import.meta.env.VITE_API_URL;
	const excluir = async () => {
		console.log(pacienteSelecionado.value);
		axios
			.delete(`${apiUrl}/deletar-paciente/${pacienteSelecionado.value._id}`)
			.then(() => {
				modalExclusao.value = false;
				atualizar.value = true;
			})
			.catch(() => {
				console.log('Ocorreu um erro', e);
			});
	};
	return (
		<Stack
			spacing={{ xs: 1, sm: 2 }}
			direction="column"
			useFlexGap
			sx={{ flexWrap: 'wrap' }}
		>
			<Typography
				id="modal-modal-title"
				variant="h6"
				component="h2"
				color="warning"
			>
				Paciente: {pacienteSelecionado.value?.nome_paciente}
			</Typography>
			<Typography color="primary">Confirma a exclusão do paciente?</Typography>
			<Button
				variant="contained"
				color="warning"
				onClick={() => {
					excluir();
				}}
			>
				Excluir
			</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					modalExclusao.value = false;
				}}
			>
				Cancelar
			</Button>
		</Stack>
	);
}
export default Exclusao;
