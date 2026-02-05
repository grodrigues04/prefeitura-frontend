import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import CoreTableContainer from '../Core/CoreTableContainer';
import CoreTableHead from '../Core/CoreTableHead';
function Tabela() {
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
					<TableRow>
						<TableCell>paciente 1</TableCell>
						<TableCell>saida 1</TableCell>
						<TableCell>data 1</TableCell>
						<TableCell>Editar</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</CoreTableContainer>
	);
}

export default Tabela;
