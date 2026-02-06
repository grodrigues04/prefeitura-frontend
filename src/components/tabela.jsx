import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import CoreTableContainer from '../Core/CoreTableContainer';
import CoreTableHead from '../Core/CoreTableHead';
import { useSignals, useSignal } from '@preact/signals-react/runtime';
import axios from 'axios';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { atualizar, dadosPacientes, ehAlteracao, pacienteSelecionado, modalAberto, modalExclusao } from '../signals';
function Tabela() {
	useSignals();
	const apiUrl = import.meta.env.VITE_API_URL;

	const recuperarDados = async () => {
		const response = await axios.get(`${apiUrl}/registros`);
		dadosPacientes.value = response.data.resposta;
		console.log('dadosPacientes.value', dadosPacientes.value);
	};

	useEffect(() => {
		console.log('Atualizei');
		recuperarDados();
	}, [atualizar.value]);
	return (
		<CoreTableContainer component={Paper}>
			<Table>
				<CoreTableHead>
					<TableRow>
						<TableCell>Nome do Paciente</TableCell>
						<TableCell>Data de Entrada</TableCell>
						<TableCell>Saída dos Exames</TableCell>
						<TableCell>Editar</TableCell>
						<TableCell>Excluir</TableCell>
					</TableRow>
				</CoreTableHead>
				<TableBody>
					{dadosPacientes.value?.length > 0 ? (
						dadosPacientes.value?.map((paciente, index) => (
							<TableRow>
								<TableCell>{paciente.nome_paciente}</TableCell>
								<TableCell>{paciente.data_entrada}</TableCell>
								<TableCell>{paciente.saida_exame}</TableCell>
								<TableCell>
									<EditIcon
										onClick={() => {
											ehAlteracao.value = true;
											pacienteSelecionado.value = paciente;
											modalAberto.value = true;
										}}
									/>
								</TableCell>
								<TableCell>
									<DeleteIcon
										onClick={() => {
											pacienteSelecionado.value = paciente;
											modalExclusao.value = true;
										}}
									/>
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
