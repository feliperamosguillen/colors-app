import { useState, useEffect } from 'react';
import { getColors } from '../../helpers/getColors';
/*import { useFetchColors } from '../../hooks/useFetchColors';*/
import { ColorBlock } from './ColorBlock';
import { Pagination } from './Pagination';
var _ = require('lodash');

export const ColorsScreen = () => {
	let currentPage = 2;
	
	/*const { data:colors } = useFetchColors(currentPage);*/

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
					colors && 
						_.chunk(colors.data.data, 3).map( colorRow => (
							<div className="container-fluid px-0 mx-0" key={_.random(1000)} >
								<div className="colors-row" >
								{
									colorRow.map( element => (
										<ColorBlock element={element} key={ `block-${_.random(1000)}`} />
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