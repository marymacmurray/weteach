import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import { Redirect } from "react-router-dom";
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import CreateResource from '../components/CreateResource'
import { readOneResouce, updateResource } from '../services/api-helper'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



export default function EditResource(props) {
  const classes = useStyles()


  return (
    
    <>  
      <form className={classes.root} noValidate autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          props.createSubmit();
        }}>
          <h1>Edit Resource</h1>
        <TextField id="outlined-basic" label="link" name="link" value={props.formData.link} variant="outlined" onChange={props.handleChange} />
          <br></br>  
        <TextField id="outlined-basic" label="title" name="name" value={props.formData.name} variant="outlined" onChange={props.handleChange} />
          <br></br>
        <TextField id="outlined-basic" label="description" name="description" value={props.formData.description} variant="outlined" onChange={props.handleChange}/>
          <br></br>  
        <Button
          variant="contained"
          color="primary"
          type="submit"
          label="Save"
        >Submit</Button>
      </form>
    </>
  );
}
