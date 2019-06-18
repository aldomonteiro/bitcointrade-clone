import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  }
}));


const MyMenuIcon = ({ handleDrawerOpen, handleDrawerClose, open }) => {
  const classes = useStyles();

  return (
    <IconButton
      onClick={(evt) => open ? handleDrawerClose(evt) : handleDrawerOpen(evt)}
      edge="start"
      className={classes.menuButton}
    >
      <MenuIcon color="secondary" className={clsx(open && classes.hide)} />
      <ChevronLeftIcon color="secondary" className={clsx(!open && classes.hide)} />
    </IconButton>
  );
};


export default MyMenuIcon;