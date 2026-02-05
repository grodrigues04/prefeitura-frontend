import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import CoreTableContainer from '../Core/CoreTableContainer';
import CoreTableHead from '../Core/CoreTableHead';
import { useSignals, useSignal } from '@preact/signals-react/runtime';
import axios from 'axios';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
function Tabela() {
	useSignals();
	const apiUrl = import.meta.env.VITE_API_URL;
	const dadosPacientes = useSignal([]);
	const recuperarDados = async () => {
		const response = await axios.get(`${apiUrl}/registros`);

		dadosPacientes.value = response.data.resposta;
		console.log('dadosPacientes.value', dadosPacientes.value);
	};

	useEffect(() => {
		recuperarDados();
	}, []);
	return (
		<CoreTableContainer component={Paper}>
			<Table>
				<CoreTableHead>
					<TableRow>
						<TableCell>Nome do Paciente</TableCell>
						<TableCell>Saída dos Exames</TableCell>
						<TableCell>Data de Entrada</TableCell>
						<TableCell>Editar</TableCell>
					</TableRow>
				</CoreTableHead>
				<TableBody>
					{dadosPacientes.value.length > 0 ? (
						dadosPacientes.value.map((paciente, index) => (
							<TableRow>
								<TableCell>{paciente.nome_paciente}</TableCell>
								<TableCell>{paciente.data_entrada}</TableCell>
								<TableCell>{paciente.saida_exame}</TableCell>
								<TableCell>
									<EditIcon />
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell>Sem dados disponiveis</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</CoreTableContainer>
	);
}

export default Tabela;
