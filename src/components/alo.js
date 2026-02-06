import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

// Sample data
function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	// Add many more rows here to see pagination in action
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Jelly bean', 392, 0.0, 94, 0.0),
	createData('Lollipop', 305, 3.7, 67, 4.3),
	createData('Honeycomb', 356, 16.0, 49, 3.9),
	createData('Donut', 392, 0.0, 94, 0.0),
	createData('KitKat', 305, 3.7, 67, 4.3)
];

export default function PaginatedTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Reset page to 0 when rows per page changes
	};

	// Logic to display the correct slice of data
	const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align="right">Calories</TableCell>
						<TableCell align="right">Fat (g)</TableCell>
						<TableCell align="right">Carbs (g)</TableCell>
						<TableCell align="right">Protein (g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{displayedRows.map((row) => (
						<TableRow key={row.name}>
							<TableCell
								component="th"
								scope="row"
							>
								{row.name}
							</TableCell>
							<TableCell align="right">{row.calories}</TableCell>
							<TableCell align="right">{row.fat}</TableCell>
							<TableCell align="right">{row.carbs}</TableCell>
							<TableCell align="right">{row.protein}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]} // Customize options
							component="div" // Use "div" as root element, not td by default, when in a table footer
							count={rows.length} // Total number of rows
							rowsPerPage={rowsPerPage} // Current rows per page
							page={page} // Current page index (zero-based)
							onPageChange={handleChangePage} // Callback for page changes
							onRowsPerPageChange={handleChangeRowsPerPage} // Callback for rows per page changes
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}
