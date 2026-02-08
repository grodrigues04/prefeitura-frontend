import { Table, TableBody, TableRow, TableCell, Paper, Stack } from '@mui/material';
import CoreTableContainer from '../Core/CoreTableContainer';
import CoreTableHead from '../Core/CoreTableHead';
import { useSignals, useSignal, useSignalEffect } from '@preact/signals-react/runtime';
import axios from 'axios';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import {
	atualizar,
	dadosTabela,
	dadosPacientes,
	ehAlteracao,
	pacienteSelecionado,
	modalAberto,
	modalExclusao,
	page,
	filtroNome,
	filtroLetra
} from '../signals';
function Tabela() {
	useSignals();
	const apiUrl = import.meta.env.VITE_API_URL;
	const mensagemUser = useSignal('');
	const carregandoDados = useSignal(true);
	const recuperarDados = async () => {
		axios
			.get(`${apiUrl}/registros`)
			.then((response) => {
				dadosPacientes.value = response.data.resposta;
				if (!response.data.resposta.length) {
					mensagemUser.value = 'Sem dados disponiveis';
				}
			})
			.catch((e) => {
				mensagemUser.value = 'Ocorreu um erro interno. Tente recarregar a pagina';
				console.log('Error');
			})
			.finally(() => {
				carregandoDados.value = false;
				console.log('terminou a requisicao');
			});
	};

	useSignalEffect(() => {
		const nome = filtroNome.value.toLowerCase();
		if (filtroNome.value) {
			filtroLetra.value = '';
		}
		const filtrados = nome
			? dadosPacientes.value.filter((item) => item.nome_paciente.toLowerCase().includes(nome))
			: filtroLetra.value
				? dadosPacientes.value.filter((item) => item.nome_paciente.toLowerCase().startsWith(filtroLetra.value))
				: dadosPacientes.value;

		dadosTabela.value = filtrados.slice(
			page.value * rowsPerPage.value,
			page.value * rowsPerPage.value + rowsPerPage.value
		);
	});

	const rowsPerPage = useSignal(5);
	const handleDelete = () => {
		console.log('asd');
	};
	const handleChangePage = (event, newPage) => {
		page.value = newPage;
	};
	const handleChangeRowsPerPage = (event) => {
		rowsPerPage.value = parseInt(event.target.value, 10);
		page.value = 0;
	};

	useEffect(() => {
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
							<TableCell>Data de nascimento</TableCell>
							<TableCell>Editar</TableCell>
							{/* <TableCell>Excluir</TableCell> */}
							<TableCell>Recebeu Exame?</TableCell>
						</TableRow>
					</CoreTableHead>
					<TableBody>
						{dadosTabela.value?.length > 0 ? (
							dadosTabela.value?.map((paciente, index) => (
								<TableRow>
									<TableCell>{paciente.nome_paciente}</TableCell>
									<TableCell>{paciente.data_entrada}</TableCell>
									<TableCell>{paciente.data_nascimento}</TableCell>
									<TableCell>
										<EditIcon
											onClick={() => {
												ehAlteracao.value = true;
												pacienteSelecionado.value = paciente;
												modalAberto.value = true;
											}}
										/>
									</TableCell>
									{/* <TableCell>
										<DeleteIcon
											onClick={() => {
												pacienteSelecionado.value = paciente;
												modalExclusao.value = true;
											}}
										/>
									</TableCell> */}
									<TableCell>
										{/* <FormControlLabel
											label="Recebeu exame ?"
											control={
												<Checkbox
													checked={false}
													// onChange={handleChange}
													slotProps={{
														input: { 'aria-label': 'controlled' }
													}}
												/>
											}
										></FormControlLabel> */}

										<Chip
											label="Não"
											color="warning"
											onDelete={() => {
												pacienteSelecionado.value = paciente;
												modalExclusao.value = true;
											}}
											deleteIcon={<EditIcon />}
										/>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell>{mensagemUser.value}</TableCell>
							</TableRow>
						)}
						{carregandoDados.value && (
							<TableRow>
								<TableCell
									colSpan={5}
									sx={{ p: 0 }}
								>
									<LinearProgress />
								</TableCell>
							</TableRow>
						)}{' '}
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
