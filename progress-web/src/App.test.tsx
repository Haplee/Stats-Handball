import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
    });
});
