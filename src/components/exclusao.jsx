import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { pacienteSelecionado, modalExclusao, atualizar,  } from '../signals';
import axios from 'axios';
import { useSignals, useSignal } from '@preact/signals-react/runtime';
import LinearProgress from '@mui/material/LinearProgress';
function Exclusao() {
	useSignals();
	const apiUrl = import.meta.env.VITE_API_URL;
	const carregando = useSignal(false);
	const excluir = async () => {
		carregando.value = true;
		console.log(pacienteSelecionado.value);
		axios
			.delete(`${apiUrl}/deletar-paciente/${pacienteSelecionado.value._id}`)
			.then(() => {
				modalExclusao.value = false;
				atualizar.value = pacienteSelecionado.value._id;
			})
			.catch(() => {
				console.log('Ocorreu um erro', e);
			})
			.finally(() => {
				carregando.value = false;
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
			<Typography color="primary">
				Confirma o recebimento do exame ? <br />
				(Paciente sera excluido)
			</Typography>
			<Button
				variant="contained"
				color="warning"
				onClick={() => {
					excluir();
				}}
			>
				Confirmar
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
			{carregando.value && <LinearProgress />}
		</Stack>
	);
}
export default Exclusao;
