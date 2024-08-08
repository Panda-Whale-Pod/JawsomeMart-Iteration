import React from 'react'
// import './Pagination.css'
import styles from './Marketplace.module.css';

const Pagination = ({ displayedProducts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(displayedProducts / postsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className={styles.pagination}>
            <div className={styles.paginationButtons}>
            {pages.map((page, index) => {
                return (
                    <button key={index} onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? styles.active : ''}
                    >
                        {page}
                    </button>
                );
            })}
            </div>
        </div>
    )
}

export default Pagination;