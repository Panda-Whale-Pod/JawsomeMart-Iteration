import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Marketplace } from '../src/components/Marketplace/Marketplace';

describe(Marketplace, () => {
  it('marketplace displays corrent initial products', () => {
    const {} = render(<Marketplace />);
  });
});
