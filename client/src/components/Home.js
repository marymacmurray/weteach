import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom"
import { destroyResource, verifyUser } from '../services/api-helper'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 140,
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const resources = {props.resources}

export default function Home(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Together, we teach.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              It takes a village, build yours here.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>

                  {props.user ? <Button component={Link} to="/" onClick={() => { { props.clearUser() } }} variant="contained" color="primary" color="inherit">Logout</Button>
                    :
                    <Button component={Link} to="/auth/login" variant="contained" color="primary">Sign Up</Button>
                  }

                  {/* // localStorage.getItem('authToken') 
                      //   <Button component={Link} to="/auth/login" variant="contained" color="primary">
                      //     Sign Up
                      //   </Button> */}

                </Grid>
                <Grid item>
                  <Button component={Link} to="/resources" variant="outlined" color="primary">
                    Add Resources
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.resources.map((resource) => (
              <Grid item key={resource.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.img}
                    title={resource.name}
                    src={resource.image}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {resource.name}
                    </Typography>
                    <Typography>
                      {resource.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" target="_blank" href={`${resource.link}`}>Go</Button>
                    <Button onClick={() => { props.setResource(resource.id) }} size="small" color="primary" >
                      Edit
                    </Button>
                    <Button onClick={() => {
                      props.setResource(resource.id)
                      destroyResource(resource.id)
                      props.deleteResource()
                    }} size="small" color="primary" >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

    </React.Fragment>
  );
}