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



export default function EditResource(props) {
  const classes = useStyles()


  return (
    
    <div className="createform">  
          <h1>Edit Resource</h1>
      <form className={classes.root} noValidate autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          props.createSubmit();
        }}>
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
    </div>
  );
}
