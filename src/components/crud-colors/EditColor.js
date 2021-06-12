import React, { useContext, useState, useEffect } from 'react';
import { API_URL } from '../../config/api';
import { AuthContext } from '../../auth/AuthContext'
import { useHistory } from 'react-router-dom';
import { getColor } from '../../helpers/getColor';

export const EditColor = ({colorId}) => {
    const {user} = useContext(AuthContext);
    const [setErrors] = useState("");
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [pantone, setPantone] = useState("");
    const [year, setYear] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorColor, setErrorColor] = useState("");
    const [errorPantone, setErrorPantone] = useState("");
    const [errorYear, setErrorYear] = useState("");
    const history = useHistory();
    
    const [objColor, setObjColor] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getColor(colorId, user.token).then(function(color){
            setName(color.name);
            setColor(color.color);
            setPantone(color.pantone);
            setYear(color.year);

            setObjColor({
                data: color,
                loading: false
            })
        }).catch(error => {
          });
    }, []);

    const handleUpdate = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ 
                name: name,
                color: color,
                pantone: pantone,
                year: year
            })
        };

        fetch(`${API_URL}colores/${colorId}`, requestOptions)
            .then(response => response.json())
            .then(function(data){
                if(data.error){
                    if(data.error["name"][0]){
                        setErrorName(data.error["name"][0])
                    }
                    if(data.error["color"][0]){
                        setErrorColor(data.error["color"][0])
                    }
                    if(data.error["pantone"][0]){
                        setErrorPantone(data.error["pantone"][0])
                    }
                    if(data.error["year"][0]){
                        setErrorYear(data.error["year"][0])
                    }
                } else {
                    alert("color updated.");
                    history.replace( '/colores' );
                }
            }).catch(function(e){
                console.log(e)
                setErrors('Usuario o password incorrecto.')
            });
    }

    return (
        <div>
            Editar Color

            <div className="add-colors-container">
                <div className="form-group">
                    <input type="textbox" 
                        placeholder="name" 
                        value={name}
                        className="form-control"
                        onChange={e => setName(e.target.value)}
                        />
                    <div>{ errorName }</div>
                </div>
                <div className="form-group">
                    <input type="textbox" 
                        placeholder="color" 
                        value={color}
                        className="form-control"
                        onChange={e => setColor(e.target.value)}
                        />
                    <div>{errorColor}</div>
                </div>
                <div className="form-group">
                    <input type="textbox" 
                        placeholder="pantone" 
                        value={pantone}
                        className="form-control"
                        onChange={e => setPantone(e.target.value)}
                        />
                    <div>{errorPantone}</div>
                </div>
                <div className="form-group">
                    <input type="textbox" 
                        placeholder="year" 
                        value={year}
                        className="form-control"
                        onChange={e => setYear(e.target.value)}
                        />
                    <div>{errorYear}</div>
                </div>
                <button className="btn btn-warning"
                    onClick={ handleUpdate }
                    >
                    Update
                </button>
            </div>
        </div>
    );
};
