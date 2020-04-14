import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateResource(props) {
  const classes = useStyles()

  return (
    <>
      <div className="createform">
      <h1>Add a resource</h1>
      <form className={classes.root} noValidate autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          props.createSubmit();
        }}>
          <TextField
            required={true}
            error={""?true:false}
            errortext={"Can't be blank"||""} helperText={"Can't be blank"||""}
            id="outlined-required" label="link" name="link" variant="outlined" onChange={props.handleChange} />
          <br></br>  
        <TextField required id="outlined-required" label="title" name="name" variant="outlined" onChange={props.handleChange} />
          <br></br>
        <TextField required id="outlined-required" label="description" name="description" variant="outlined" onChange={props.handleChange}/>
          <br></br>  
        <Button
          variant="contained"
          color="primary"
          type="submit"
          label="Save"
        >Submit</Button>
        </form>
        </div>
    </>
  );
}