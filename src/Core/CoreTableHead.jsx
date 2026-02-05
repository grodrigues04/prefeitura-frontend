import { TableHead, styled } from '@mui/material';

const CoreTableHead = styled(TableHead)(({ theme }) => ({
	borderRadius: 2,
	overflow: 'hidden',
	boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
	backgroundColor: '#2797fa',
	color: '#fafafa'
}));

export default CoreTableHead;
