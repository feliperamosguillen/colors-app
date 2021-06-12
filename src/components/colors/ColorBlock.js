import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext'
import { API_URL } from '../../config/api';
import { Link } from 'react-router-dom';

export const ColorBlock = ({element}) => {
    const {user} = useContext(AuthContext);

    const handleDeleteColor = (colorId) => {
        const token = user.token;
		const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: JSON.stringify({})
        };
        
        fetch(`${API_URL}colores/${colorId}`, requestOptions)
            .then(function(){
                alert("Color borrado");
                window.location.reload()
            });
	};

    return (
        <div className="color-block" style={{ backgroundColor: `${element.color}` }} key={ element.id }>
            <div className="color-block__year">
                { element.year }
            </div>
            <div className="color-block__container_name">
                <div className="color-block__color-name">{ element.name }</div>
                <div className="color-block__hexa">{ element.color }</div>
            </div>
            <div className="color-block__pantone">
                { element.pantone }
            </div>

            {
				(user) && ( 
					(user.admin===1) && 
                    <div className="delete-color">
                        <div
                            className="btn btn-danger"
                            onClick={() => handleDeleteColor(element.id)}
                        >
                            Eliminar color
                        </div>
                        <Link
                            className="btn btn-secondary"
                            to={`/edit-color/${element.id}`}
                        >
                            Editar color
                        </Link>
                    </div>
				)
			}
        </div>
    );   
}