import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define custom colors
const neonGreen = '#39FF14';
const darkBg = '#0a0a0a';
const darkerBg = '#050505';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: neonGreen,
      light: '#62ff46',
      dark: '#2db800',
      contrastText: '#000000',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: darkerBg,
      paper: darkBg,
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Orbitron", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h2: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h3: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h4: {
      fontFamily: 'Orbitron, sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        containedPrimary: {
          color: '#000000',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${neonGreen}22`,
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
};

// Create theme instances
export const createLightTheme = () => createTheme(lightTheme);
export const createDarkTheme = () => createTheme(darkTheme);

// Default theme is dark
export default createDarkTheme();
