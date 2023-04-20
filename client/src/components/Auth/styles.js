import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
  },
  root: {
    '& .MuiTextField-root': {
      margin: 1,
    },
  },
  avatar: {
    margin: 1,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 3,
  },
  submit: {
    marginBottom: 30,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    width: '60%',
  },
  googleButton: {
    marginTop: 5,
    marginBottom: 2,
    width: '60%',
  },
}));