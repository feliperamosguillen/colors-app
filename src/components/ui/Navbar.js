import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const Navbar = () => {
    const {user, dispatch} = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        history.replace('/login');
        dispatch({
            type: types.logout
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Colores
            </Link>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info"> 
                        { user.email }
                    </span>

                    <button 
                        className="nav-item nav-link btn btn-danger"
                        onClick={ handleLogout }
                    > 
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}