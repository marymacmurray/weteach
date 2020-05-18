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
import { Route, Link } from 'react-router-dom';
import { destroyResource } from '../services/api-helper'
import ResourcesIndex from './ResourcesIndex';

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


export default function MyResources(props) {
  const getUserResources = () => props.getUserResources
  const classes = useStyles();

  return (
    <React.Fragment>
      {getUserResources}
      <CssBaseline />

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {
            // {/* {() => (
            //   props.userResources.length !== 0 ? */}
                props.userResources.map((resource) => (
                  <Grid item key={resource.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        component="img"
                        className={classes.img}
                        title={resource.name}
                        src={resource.image ? resource.image : "https://i.imgur.com/fPKyi1p.png"}
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
                          props.deleteResource(resource.id)
                        }} size="small" color="primary" >
                          Delete
                  </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
            //     {/* :
            //     <Card className={classes.card}>
            //       <Typography>
            //         You haven't added any resources yet.
            //       </Typography>
            //       <Route path="/resources" render={(props) => <ResourcesIndex {...props} />}>
            //         <Link to="/resources">Add Resources</Link>
            //       </Route>
            //     </Card>
            // ) */}
            }
          </Grid>
        </Container>
      </main>

    </React.Fragment>
  )
}