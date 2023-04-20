import React, { useState } from "react";
import { Avatar, Button, Typography, Paper, Grid, Container } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
//import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
//import { Password } from "@mui/icons-material";
import { signup, signin } from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", data: { result, token } });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const gooleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'Password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} sx={{ marginBottom: 3, marginTop: 3, marginLeft: 2, marginRight: 2, width: '60%' }}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="154215991197-el05vuvjfo0dbnrvddpinh6oo9ctdhad.apps.googleusercontent.com" 
                        fullWidth
                        variant="contained"
                        className={classes.googleButton}
                        sx={{ marginBottom: 3, marginTop: 3, marginLeft: 2, marginRight: 2, width: '60%' }}
                        /* render={(renderProps)=>{
                        }} */
                        buttonText="Google Sign In"
                        onSuccess={googleSuccess}
                        onFailure={gooleFailure}
                        cookiePolicy="single_host_origin"
                    >
                            {/* <Button className={classes.googleButton} color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button> */}
                    </GoogleLogin>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;