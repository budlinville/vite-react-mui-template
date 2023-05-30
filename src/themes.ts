import { ThemeOptions, createTheme } from '@mui/material/styles';

const lightOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        // primary:    { main: '#efefef' },
        // secondary:  { main: '#e8e8e8' },
    },
};

export const light = createTheme(lightOptions);


const darkOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        // primary:    { main: '#181818' },
        // secondary:  { main: '#2f2f2f' },
    },
};

export const dark = createTheme(darkOptions);