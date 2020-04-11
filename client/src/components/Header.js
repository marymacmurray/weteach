import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom"
import { MemoryRouter as Router } from 'react-router';
import { signOut } from '../services/api-helper';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/">Home</MenuItem>
            <MenuItem component={Link} to="/auth/login">Signup</MenuItem>
            <MenuItem component={Link} to="/resources">Resources</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
          {props.user ? <span>Welcome, {props.user.username}</span> : <span>We Teach</span>}
          </Typography>
          <Typography variant="inherit">
          </Typography>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/" onClick={() => {{props.clearUser()}}} color="inherit">Logout</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}