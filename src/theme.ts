import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'light', // or 'dark' for a dark mode
  fontFamily: 'Arial, sans-serif',
  headings: {
    fontFamily: 'Georgia, serif',
    fontWeight: 700,
  },
  colors: {
    primary: ['#f0f4f8', '#d9e2ec', '#bcccdc', '#9fb3c8', '#829ab1', '#627d98', '#486581', '#334e68', '#243b53', '#102a43'],
    secondary: ['#ffe3e3', '#ffbdbd', '#ff9b9b', '#f86a6a', '#ef4e4e', '#e12d39', '#cf1124', '#ab091e', '#8a041a', '#610316'],
  },
  primaryColor: 'primary',
  components: {
    Table: {
      styles: (theme) => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.md,
          backgroundColor: 'black',
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colors.gray[3]}`,
          
        },
        thead: {
          backgroundColor: theme.colors.primary[0],
        },
        th: {
          fontWeight: 600,
          color: theme.colors.primary[8],
        },
        tbody: {
          tr: {
            '&:nth-of-type(even)': {
              backgroundColor: theme.colors.gray[0],
            },
          },
        },
      }),
    },
  },
};

