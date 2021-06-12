
export const Pagination = ({pages, handlePageClick}) => {
    return (
        <nav>
            <ul className="pagination">
            {Array.apply(0, Array(pages.pages)).map(function (x, i) {
                console.log("index", x);

                return  <li className="page-item" key={ `page${i}`}>
                            <a className="page-link" href="#" onClick={handlePageClick(i)}>{ i+1 }</a>
                        </li>;
            })}
            </ul>
        </nav>
    );
};