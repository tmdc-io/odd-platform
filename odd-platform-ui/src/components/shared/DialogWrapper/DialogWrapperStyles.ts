import { createStyles, Theme, WithStyles, fade } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    container: {},
    title: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {},
    actions: {
      flexWrap: 'wrap',
    },
    spinner: {
      display: 'none',
    },
    loading: {
      '& $title, & $content, & $actions': {
        pointerEvents: 'none',
        opacity: 0.7,
      },
      '& $spinner': {
        display: 'block',
      },
      '& $title': {
        marginTop: 0,
      },
    },
    error: {
      flexBasis: '100%',
      height: '24px',
      margin: theme.spacing(1, 0),
    },
    spinnerColor: {
      backgroundColor: fade('#0080FF', 0.9),
    },
    spinnerBarColor: {
      backgroundColor: theme.palette.text.secondary,
    },
  });

export type StylesType = WithStyles<typeof styles>;
