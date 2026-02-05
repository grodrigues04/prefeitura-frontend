import Pesquisa from './pesquisa';
import Tabela from './tabela';
import Stack from '@mui/material/Stack';

function Main() {
	return (
		<>
			<Stack
				direction="column"
				gap="13px"
			>
				<Pesquisa />
				<Tabela />
			</Stack>
		</>
	);
}

export default Main;
