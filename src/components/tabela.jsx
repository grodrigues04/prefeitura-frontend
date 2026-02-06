import { Table, TableBody, TableRow, TableCell, Paper, Stack } from '@mui/material';
import CoreTableContainer from '../Core/CoreTableContainer';
import CoreTableHead from '../Core/CoreTableHead';
import { useSignals, useSignal, useSignalEffect } from '@preact/signals-react/runtime';
import axios from 'axios';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import { atualizar, dadosPacientes, ehAlteracao, pacienteSelecionado, modalAberto, modalExclusao } from '../signals';
function Tabela() {
	useSignals();
	const apiUrl = import.meta.env.VITE_API_URL;
	const dadosTabela = useSignal([]);

	const recuperarDados = async () => {
		const response = await axios.get(`${apiUrl}/registros`);
		dadosPacientes.value = response.data.resposta;
	};

	useSignalEffect(() => {
		dadosTabela.value = dadosPacientes.value.slice(
			page.value * rowsPerPage.value,
			page.value * rowsPerPage.value + rowsPerPage.value
		);
	});

	const page = useSignal(0);
	const rowsPerPage = useSignal(5);

	const handleChangePage = (event, newPage) => {
		page.value = newPage;
	};
	const handleChangeRowsPerPage = (event) => {
		rowsPerPage.value = parseInt(event.target.value, 10);
		page.value = 0;
	};

	useEffect(() => {
		console.log('Atualizei');
		recuperarDados();
	}, [atualizar.value]);
	return (
		<CoreTableContainer component={Paper}>
			<Stack alignItems="center">
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
						{dadosTabela.value?.length > 0 ? (
							dadosTabela.value?.map((paciente, index) => (
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
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={dadosPacientes.value.length}
					page={page.value}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage.value}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Stack>
		</CoreTableContainer>
	);
}

export default Tabela;
