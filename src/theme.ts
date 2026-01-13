import { createTheme, useMediaQuery, type PaletteMode } from "@mui/material";
import { useMemo } from "react";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#bf40bf',
                },
                secondary: {
                    main: '#75daff',
                },
                background: {
                    default: '#f5f5f5',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#333333',
                    secondary: '#ffffff',
                },
            }
            : {
                primary: {
                    main: '#dda0dd',
                },
                secondary: {
                    main: '#75daff',
                },
                background: {
                    default: '#1a1a2e',
                    paper: '#252545',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#333333',
                },
            }),
    },
    typography: {
        fontFamily: '"Malgun Gothic", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    textTransform: 'none' as const,
                    fontWeight: 'bold',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export const useAppTheme = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const mode: PaletteMode = prefersDarkMode ? 'dark' : 'light';
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return theme;
};