// theme.ts
import { createTheme } from '@mui/material/styles';
import { ThemeMode } from '@/store/slices/themeSlice';

const getCustomTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#9c27b0',
      },
      secondary: {
        main: '#8e24aa',
      },
      background:
        mode === 'dark'
          ? {
              default: '#1a1a2e',
              paper: '#22223b',
            }
          : {
              default: '#ffffff',
              paper: '#f4f4f4',
            },
      text:
        mode === 'dark'
          ? {
              primary: '#ffffff',
              secondary: '#b3b3c2',
            }
          : {
              primary: '#000000',
              secondary: '#555555',
            },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: '2rem',
        fontWeight: 700,
      },
      h6: {
        fontSize: '1.2rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.9rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            padding: '12px 24px',
            borderRadius: '8px',
            textTransform: 'none',
            background: 'linear-gradient(to right, #8e24aa, #9c27b0)',
            '&:hover': {
              background: 'linear-gradient(to right, #9c27b0, #8e24aa)',
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            border: '4px solid',
            borderColor: '#8e24aa',
            boxShadow: '0 0 15px rgba(142, 36, 170, 0.6)',
          },
        },
      },
    },
  });

export default getCustomTheme;
