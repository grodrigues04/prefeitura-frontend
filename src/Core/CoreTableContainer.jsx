import { TableContainer, Paper, styled } from '@mui/material';

const CoreTableContainer = styled(TableContainer)(({ theme }) => ({
	borderRadius: 2,
	overflow: 'hidden',
	boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
}));

export default CoreTableContainer;
