import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import Marketplace from '../src/components/Marketplace/Marketplace';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductPage from '../src/components/Product/ProductPage';

describe('ProductPage', () => {
  it('navigates to product page when product is clicked', async () => {
    render(
      // used to simulate routing in tests - allows you to set up initial routes and render different components based on the route
      <MemoryRouter initialEntries={['/Marketplace']}>
        <Routes>
          <Route path="/Marketplace" element={<Marketplace />} />
          <Route path="/products/66ae490625d36af8f8a9c83c" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate the button click
    const button = screen.getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    await userEvent.click(button);

    // Check if the new page is rendered
    expect(screen.getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')).toBeInTheDocument();
  });
});

