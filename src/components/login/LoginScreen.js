import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import { API_URL } from '../../config/api';
import { getUser } from '../../helpers/getUser';

export const LoginScreen = ({ history }) => {
	const { dispatch } = useContext( AuthContext );
    const [errors, setErrors] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = () => {
        console.log(  API_URL );

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: email,
                password: password
            })
        };
        
        fetch(`${API_URL}users/login`, requestOptions)
            .then(response => response.json())
            .then(function(data){
                if(data.error){
                    setErrors('Usuario o password incorrecto.')    
                } else {
                    let token = data.token;
                    getUser(token).then(function(data){
                        dispatch({
                            type: types.login,
                            payload: {
                                token: token,
                                admin: data.user.admin,
                                email: data.user.email
                            }
                        });
                        
                        const lastPath = localStorage.getItem('lastPath') || '/';
                        history.replace( lastPath );
                    })
                }
            }).catch(function(e){
                console.log("hubo errosito")
                setErrors('Usuario o password incorrecto.')
            });


        //const lastPath = localStorage.getItem('lastPath') || '/';

        /*
        dispatch({
            type: types.login,
            payload: {
                email: 'user@admin.com'
            }
        });*/

        //history.replace( lastPath );
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <input type="textbox" 
                placeholder="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            <input type="password" 
                placeholder="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            
            <div>{ errors }</div>

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>

        </div>
    )
}
