import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

const primary = purple[500]; // #f44336

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "calc(100vh - 65px)",
        backgroundColor: primary,
      }}
    >
      <Typography variant="h4" style={{ color: 'white', textAlign: 'center' }}>
        The page you are looking for doesn't exist.
      </Typography>
    </Box>
  );
}