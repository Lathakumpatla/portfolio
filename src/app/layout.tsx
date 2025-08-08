'use client'

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store/store';
import getTheme from '@/theme';

function InnerThemeProvider({ children }: { children: ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Latha Kumpatla</title>
       
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider store={store}>
          <InnerThemeProvider>{children}</InnerThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
