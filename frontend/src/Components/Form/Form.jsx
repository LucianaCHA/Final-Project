import { useState, useMemo, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { postUser } from "../../Redux/Actions/actions";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
export const Form = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState({});

    function validate (input) {
        const validName = /^[a-zA-z]*[a-zA-Z\\-_@&$%#\s]{3,18}$/; // Letras y espacios, pueden llevar acentos.
        const validUser = /^[a-zA-Z0-9_.\-.]{4,16}$/; // Letras, numeros, guion y guion_bajo
        const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const validPassword = /^.{4,12}$/; // 4 a 12 digitos.
        const validPicture = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg)/ ;

        let error= {};
        if(!input.firstName) {
            error.firstName = 'This field cannot be empty';
        }
        else if(!validName.test(input.firstName)) {
            error.firstName = 'Special characters or numbers are not allowed';
        }
        if(!input.lastName) {
            error.lastName = 'This field cannot be empty';
        }
        else if(!validName.test(input.lastName)) {
            error.lastName = 'Special characters or numbers are not allowed';
        }
        else if(!input.age) {
            error.age = 'This field cannot be empty'
        }
        else if(input.age <= 16) {
            error.age = 'You must be over 16 years old';
        }
        else if(!input.userName) {
            error.userName = 'This field cannot be empty';
        }
        else if(!validUser.test(input.userName)) {
            error.userName = 'The user must have 4 to 10 digits';
        }
        else if(!input.email.length) {
            error.email = 'This field cannot be empty';
        }
        else if(!validEmail.test(input.email)) {
            error.email = 'Special characters or numbers are not allowed';
        }
        else if(!input.password) {
            error.password = 'This field cannot be empty';
        }
        else if(!validPassword.test(input.password)) {
            error.password = 'The password must have 4 to 10 digits';
        }
        else if(input.password !== input.password2) {
            error.password2 = 'Both passwords must be the same';
        }
        else if(input.picture && !validPicture.test(input.picture)) {
            error.picture = 'This is not a valid URL'
        }
        return error;
    }
    const disable = useMemo(() => {
        if( error.firstName || error.lastName || error.age || error.userName|| error.email || error.password || error.password2 || error.picture ) {
            return true;
        }
        return false;
    }, [error])   

    const [input, setInput] = useState({
        firstName:"",
        lastName: "",
        age: "",
        userName: "",
        email: "",
        password: "",
        password2:"",
        picture:"",
        plan:"standar"
    })

    useEffect(() =>  {
        setError(validate(input))
    }, [input])

    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postUser(input))
        alert('User created successfully!')
        setInput({
            firstName: "",
            lastName: "",
            age: "",
            userName: "",
            email: "",
            password: "",
            password2: "",
            picture: "",
            plan:"standar"
        })
    }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
   
        return(
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                         <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField label='Username' placeholder='Enter username' fullWidth required/>
                    <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                     />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    <Typography >
                         <Link href="#" >
                            Forgot password ?
                    </Link>
                    </Typography>
                    <Typography > Do you have an account ?
                         <Link href="#" >
                            Sign Up 
                    </Link>
                    </Typography>
                </Paper>
            </Grid>
        )
}