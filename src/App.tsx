import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import './App.css';

import AppRoutes from './routes/AppRoutes';
import { store } from './store';
import MainLayout from './components/layout/MainLayout';

// Define theme with neon colors
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#39FF14', // Neon green
    },
    secondary: {
      main: '#00ff9f', // Neon blue
    },
    background: {
      default: '#0A1929', // Deep blue
      paper: '#0F2539',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        },
      },
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider store={store}>
          <div className="App">
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </div>
        </ReduxProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
