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
      <MemoryRouter initialEntries={['/Marketplace']}>
        <Routes>
          <Route path="/product" element={<Marketplace />} />
          <Route path="/new-page" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate the button click
    const button = screen.getByRole('button', { name: /add to cart/i });
    await userEvent.click(button);

    // Check if the new page is rendered
    expect(screen.getByText(/new page content/i)).toBeInTheDocument(); // Replace with actual content from NewPage
  });
});

