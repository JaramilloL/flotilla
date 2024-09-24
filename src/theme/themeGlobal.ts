import { createTheme } from '@mui/material'
import { blue, grey, yellow, orange } from '@mui/material/colors'
//tema de colores y estilos

export const theme = createTheme({
    palette: {
      primary: {
        main: '#1F3A93', // Azul oscuro para la barra de navegación, botones principales, etc.
        contrastText: '#FFFFFF', // Texto en botones y elementos sobre fondo azul oscuro.
      },
      secondary: {
        main: '#FF5722', // Naranja para botones secundarios o elementos interactivos.
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#F5F5F5', // Fondo general de la página en un gris claro.
        paper: '#FFFFFF', // Fondo de tarjetas o elementos de contenedor.
      },
      text: {
        primary: '#1F1F1F', // Texto principal en gris oscuro.
        secondary: '#666666', // Texto secundario en gris medio.
      },
      warning: {
        main: yellow[700], // Amarillo para advertencias o notificaciones importantes.
      },
    },
    typography: {
      fontFamily: `'Roboto', sans-serif`,
      h1: {
        fontSize: '2rem',
        fontWeight: 700,
        color: blue[900], // Azul oscuro para encabezados principales.
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 600,
        color: blue[800],
      },
      body1: {
        fontSize: '1rem',
        color: grey[800], // Texto normal en gris oscuro.
      },
      button: {
        fontWeight: 600,
        textTransform: 'uppercase', // Texto de botones en mayúsculas.
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8, // Bordes redondeados para botones.
          },
          containedPrimary: {
            backgroundColor: '#1F3A93', // Botones principales.
            '&:hover': {
              backgroundColor: blue[800], // Cambio de color al pasar el mouse.
            },
          },
          containedSecondary: {
            backgroundColor: '#FF5722', // Botones secundarios en naranja.
            '&:hover': {
              backgroundColor: orange[700],
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#1F3A93', // Barra de navegación.
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF', // Fondos de las tarjetas o diálogos.
            padding: '16px', // Espaciado estándar.
          },
        },
      },
    },
  });