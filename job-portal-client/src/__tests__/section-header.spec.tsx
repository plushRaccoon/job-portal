import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectionHeader } from '../components/section-header';
import { vi } from 'vitest';

vi.mock('../components/candidate-form', () => ({
  CreateCandidateForm: vi.fn(({ handleClose, open, addCandidate }) => (
    <div>
      {open && <form data-testid="candidate-form">Candidate Form</form>}
    </div>
  )),
}));

vi.mock('../components/position-form', () => ({
  CreatePositionForm: vi.fn(({ handleClose, open, addPosition }) => (
    <div>
      {open && <form data-testid="position-form">Position Form</form>}
    </div>
  )),
}));

describe('SectionHeader Component', () => {
  it('renders correctly with required props', () => {
    render(<SectionHeader name="positions" />);
    render(<SectionHeader name="candidates" />);
    expect(screen.getByText('POSITIONS')).toBeInTheDocument();
    expect(screen.getByText('CANDIDATES')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: /create new/i });
    expect(buttons).toHaveLength(2);
  });

  it('handles open and close state correctly', () => {
    render(<SectionHeader name="candidates" />);
    render(<SectionHeader name="positions" />);
    const buttons = screen.queryAllByRole('button', { name: /create new/i });

    buttons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('candidate-form')).toBeInTheDocument();
    expect(screen.getByTestId('position-form')).toBeInTheDocument();

    const outsideClick = document.body;
    fireEvent.click(outsideClick);
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
