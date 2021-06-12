import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext'
import { getColors } from '../../helpers/getColors';
import { ColorBlock } from './ColorBlock';
var _ = require('lodash');

export const ColorsScreen = () => {
	const {user} = useContext(AuthContext);

	const [colors, setColors] = useState({
        data: [],
        loading: true
    });

    const [page, setPage] = useState(1);

    useEffect(() => {
        getColors(page).then( colors => setColors({
            data: colors,
            loading: false
        })).catch(error => {
            console.log(error);
          });
    }, [page]);
	
	const handlePageClick = (pageToLoad) => {
		if(pageToLoad>=0 && pageToLoad<colors.data.last_page){
			setPage(pageToLoad + 1)
		}
	};

	return (
		<div>
			<h1>Colors</h1>

			{
				(user) && ( 
					(user.admin===1) && 
					<Link
						className="navbar-brand" 
						to="/create-color"
					>
						Agregar
					</Link>
				)
			}

				{
					colors && 
						_.chunk(colors.data.data, 3).map( colorRow => (
							<div className="container-fluid px-0 mx-0" key={_.random(1000)} >
								<div className="colors-row" >
								{
									colorRow.map( element => (
										<ColorBlock element={element} key={ `block-${_.random(100000)}${_.random(100000)}`} />
									))
								}
								</div>
							</div>
						))
				}
				
				<nav className="pagination-container">
					<a className="page-link" onClick={() => handlePageClick(page-2)}>Anterior</a>
					<ul className="pagination mx-0">
						{Array.apply(0, Array(colors.data.last_page)).map(function (x, i) {
							return  <li className={`page-item ${(i+1)==page ? "disabled" : ""}`} key={ `page${i}`}>
										<a className="page-link" onClick={() => handlePageClick(i)}>{ i+1 }</a>
									</li>;
						})}
					</ul>
					<a className="page-link" onClick={() => handlePageClick(page)}>Siguiente</a>
				</nav>
		</div>
	)
}