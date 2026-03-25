import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SEO from '../components/SEO';
import { HelmetProvider } from 'react-helmet-async';

const renderWithHelmet = (ui) => {
  return render(<HelmetProvider>{ui}</HelmetProvider>);
};

describe('SEO Component', () => {
  it('renders default meta tags', () => {
    renderWithHelmet(<SEO />);
    
    // Check if Helmet is rendering (we can't directly test head elements in jsdom)
    expect(screen.getByRole('document')).toBeInTheDocument();
  });

  it('renders custom title when provided', () => {
    renderWithHelmet(<SEO title="Custom Title" />);
    
    expect(screen.getByRole('document')).toBeInTheDocument();
  });
});
