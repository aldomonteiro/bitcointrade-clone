import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import MyMenuIcon from './MenuIcon';
import TabMenu from './TabMenu';
import logo from '../logo.svg';
import Market from '../components/Market';
import PopperTicker from '../components/PopperTicker';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    position: 'relative',
  },
  rootContent: {
    display: 'flex',
    position: 'relative',
  },
  topToolBar: {
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.dark,
  },
  bottomToolBar: {
    position: 'relative',
    bottom: 0,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    wdith: '100vw',
    height: 100,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  typoLinks: {
    padding: 5,
  },
  lightFonts: {
    color: theme.palette.primary.light
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 2,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    position: 'relative'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ClippedDrawer () {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const logged = false;
  function handleChange (event, newValue) {
    setValue(newValue);
  }

  function handleDrawerOpen () {
    setOpen(true);
  }

  function handleDrawerClose () {
    setOpen(false);
  }

  return (
    <div>
      <CssBaseline />
      <Toolbar className={classes.topToolBar}>
        <img src={logo} alt="logo" />
        <TabMenu className={classes.lightFonts} value={value} handleChange={handleChange} />
      </Toolbar>
      <div className={classes.root}>
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            {logged && (<>
              <MyMenuIcon handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} open={open} />
              <Typography variant="h6" noWrap>
                SALDO
            </Typography>
            </>)}
            <PopperTicker />
          </Toolbar>
        </AppBar>
        <div className={classes.rootContent}>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}>
            {value === 0 && <Market />}
            {value === 1 &&
              <Typography paragraph>
                Item 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
          </Typography>}
          </main>
        </div>
      </div>
      <Toolbar className={classes.bottomToolBar}>
        <Typography className={classes.typoLinks} variant="h6" noWrap>
          Dúvidas
        </Typography>
        <Typography className={classes.typoLinks} variant="h6" noWrap>
          Contato
        </Typography>
      </Toolbar>
    </div>
  );
}
