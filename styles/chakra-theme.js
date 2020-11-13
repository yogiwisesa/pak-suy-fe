import { theme } from '@chakra-ui/core';

// https://smart-swatch.netlify.app/#1A6EB2
export default {
  ...theme,
  colors: {
    ...theme.colors,
    btnKata: {
      500: '#006fe6',
      600: '#2662CF'
    },
    btnLizard: {
      500: '#658f3d',
      600: '#59a444'
    },
    btnTomato: {
      500: '#dc211c',
      600: '#fc6627'
    }
  }
};
