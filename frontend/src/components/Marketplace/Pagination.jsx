import React, { useState } from 'react'
import './Pagination.css'

const Pagination = ({ displayedProducts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];

    const pageCount = Math.ceil(displayedProducts / postsPerPage);

    if (pageCount <= 4) {
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
    }
    else {
        for (let i = 1; i <= 4; i++) {
            pages.push(i);
        }
        if (pageCount > 4) {
            pages[3] = []; // '...' element
            for (let i = 4; i <= pageCount-1; i++) {
                pages[3].push(i);
            }
            pages.push(pageCount); // passing in the final page number
        }
    }

    const [isHidden, setIsHidden] = useState(true);

    const handleButtonClick = () => {
        setIsHidden(!isHidden);
    };


    return (
        <div className='pagination'>
            {pages.map((page, index) => {
                if (Array.isArray(page)) {
                    return (
                        <div key={index}>
                            <button onClick={handleButtonClick}
                            className={isHidden ? '' : 'hideButton'}
                            >
                                ...
                            </button>
                            {!isHidden && (
                                pages[3].map((page, index) => {
                                    return (
                                        <button key={index} onClick={() => setCurrentPage(page)}
                                            className={page === currentPage ? 'active' : ''}
                                        >
                                            {page}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    )
                }
                else {
                    return (
                        <button key={index} onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? 'active' : ''}
                        >
                            {page}
                        </button>
                    );
                }
            })}
        </div>
    )
}

export default Pagination;