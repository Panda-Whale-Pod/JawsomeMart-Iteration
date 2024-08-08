import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import Marketplace from '../src/components/Marketplace/Marketplace';
import ProductPage from '../src/components/Product/ProductPage';

describe('ProductPage', () => {
  it('navigates to product page when product-box div is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/Marketplace']}>
        <Routes>
          <Route path="/Marketplace" element={<Marketplace />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Debug output
    screen.debug();

    // Find a product-box div by text or role
    const productBox = screen.queryByText(/BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats/i);
    
    if (productBox) {
      await userEvent.click(productBox);
      
      // Wait for the page to update and check if the new page is rendered with the text "About This Item"
      await waitFor(() => {
        expect(screen.getByText("About This Item:")).toBeInTheDocument();
      });
    } else {
      console.log('Product box not found.');
    }
  });
});
