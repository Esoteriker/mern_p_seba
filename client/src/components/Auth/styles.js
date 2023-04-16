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
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 2,
    marginRight: 2,
  },
  googleButton: {
    marginTop: 3,
    marginBottom: 2,
  },
}));