import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button} from 'semantic-ui-react';
import { FaUserCircle } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri'
import { loginUser, setRememberMe } from '../../Redux/Actions/actions';
import { useDispatch } from 'react-redux';

const FormLoginUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        user: '',
        password: '',
    })

    const [error, setError] = useState('');

    function validateEmail(value) {
        let emailUser = /\S+@\S+\.\S+/;
        if(!emailUser.test(value)) {
            setError('The user be must a email')
        }
        else {
            setError('')
        }
    }

    function handleChange(e) {
        const {value, name} = e.target;
        if(name === "user") {
            validateEmail(input.user)
        }
        setInput({
            ...input,
            [name]: value
        })
    }

    function handleSubmit(e) {
        dispatch(loginUser(input))
            setInput({
                name: '',
                passsword:'',
            })
            navigate('/homeComics');
        }

    return (
        <Container
            style={{
                textAlign: "center",
                display:"flex",
                alignItems:"center",
                flexDirection: "column",
                justifyContent:"center",
                height:"100vh",
            }}
        >
            <h1>User Login</h1>
            <Form style={{ width:"30%"}} onSubmit={handleSubmit}>
                <div>
                    <FaUserCircle />
                    <label style={{marginLeft: '3px'}}>Email*:</label>
                    <input
                        type="text"
                        placeholder="Email"
                        name="user"
                        value={input.user}
                        onChange={handleChange}
                    />
                    {!error? null : <p style={{ color:"red"}} >{error}</p>}
                </div>
                <div>
                    <RiLockPasswordFill />
                    <label style={{marginLeft: '3px'}}>Password*:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        autocomplete="current-password"
                    />
                    <p style={{fontSize: '12px', color:'grey'}}>Forgot password?</p>
                </div>
                <div>
					<input
                        style={{marginTop:'4px'}}
						type='checkbox'
						name='rememberMe'
						onClick={() => dispatch(setRememberMe())}
					/>
					<label style={{color:'grey'}}>Remember me?</label>
				</div>
                <div>
                    <Button type="submit"> Login</Button>
                </div>
                <div>
                    <span style={{color:'grey'}}> Not an account?
                        <Link to="/formSubscribe">
                        Sign up
                        </Link> 
                    </span>
                </div>
            </Form>
        </Container>
    )
}

export default FormLoginUser