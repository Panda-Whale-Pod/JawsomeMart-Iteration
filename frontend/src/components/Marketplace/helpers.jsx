export const paginationFilter = (displayedProducts, currentPage, postsPerPage) => {
    // console.log('yo', displayedProducts, currentPage, postsPerPage)
    const lastProductIndex = currentPage * postsPerPage;
    const firstProductIndex = lastProductIndex - postsPerPage;
    // console.log(displayedProducts.slice(firstProductIndex, lastProductIndex))
    return displayedProducts.slice(firstProductIndex, lastProductIndex)
}