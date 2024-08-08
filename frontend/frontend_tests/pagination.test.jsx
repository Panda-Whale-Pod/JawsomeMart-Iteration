import { expect, test, describe, beforeEach } from 'vitest';

import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import Pagination from '../src/components/Marketplace/Pagination.jsx';
import { paginationFilter } from '../src/components/Marketplace/helpers.jsx';

test('make sure the pagination filter works as expected', () => {
    const displayedProducts = [];
    let currentPage = 1;
    let postsPerPage = 6;
    for (let i = 0; i < 10; i++) {
        displayedProducts.push({ test: 'component_obj' })
    }
    expect(paginationFilter(displayedProducts, currentPage, postsPerPage).length).toBe(6);
    currentPage = 2;

    expect(paginationFilter(displayedProducts, currentPage, postsPerPage).length).toBe(4);
});

describe('Unit testing Pagination', async () => {
    // const fn = vi.fn()
    // fn('hello world')
    // fn.mock.calls[0] === ['hello world']
    // const mockClick = vi.fn();
    const props = {
        displayedProducts: 70, // at this point in time we're just getting the length of all products
        postsPerPage: 6,
        setCurrentPage: (page) => { props.currentPage = page },
        currentPage: 1
    }
    beforeEach(() => {
        // console.log('sdaf')
        render(<Pagination {...props} />);
    });

    // test('Pagination should render a certain number of buttons', () => {
    //     console.log(screen.getAllByRole('button').length)
    //     expect(screen.getAllByRole('button').length).toBe(12);
    // });

    test('Expect pagination to limit/hide the number of middle elements', () => {
        expect(screen.getAllByRole('button').length).toBe(5);
    });

    // test('Expect there to be ... on the page due to the number of elements there', () => {
    //     expect(screen.getByText('...')).toBeInTheDocument();
    // });

})
