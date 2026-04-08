import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('Page', () => {
  it('renders the starter content', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { name: /next.js \+ vitest \+ storybook/i })).toBeInTheDocument();
  });
});
