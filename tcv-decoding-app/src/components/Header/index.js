import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant={'h5'}> 
            TCV Decoding Application
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}