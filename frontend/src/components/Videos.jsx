import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Videos = () => {
  const theme = useTheme();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
    
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus iusto, qui est soluta harum suscipit deserunt aliquid quidem, repellendus beatae consequuntur, accusantium quasi. Nam asperiores adipisci nisi illo corrupti optio.
      </div>
    </Box>

  );
};

export default Videos;
