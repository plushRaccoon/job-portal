import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorModal } from '../components/error-modal';
import { vi } from 'vitest';

describe('ErrorModal Component', () => {
  const handleCloseErrorModal = vi.fn();

  it('renders with default error message when errorMessage prop is not provided', () => {
    render(<ErrorModal openErrorModal={true} handleCloseErrorModal={handleCloseErrorModal} errorMessage={''} />);
    
    expect(screen.getByTestId('error-modal-title')).toBeInTheDocument();
  });

  it('renders with provided error message', () => {
    const errorMessage = 'Custom error message';
    render(<ErrorModal openErrorModal={true} handleCloseErrorModal={handleCloseErrorModal} errorMessage={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not render when openErrorModal is false', () => {
    render(<ErrorModal openErrorModal={false} handleCloseErrorModal={handleCloseErrorModal} errorMessage={''} />);
    
    expect(screen.queryByText('Oops! Something went wrong.')).not.toBeInTheDocument();
  });
});
