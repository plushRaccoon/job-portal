import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RenderCandidatesData, RenderCandidatesDetails  } from '../utils/renderCandidatesData';
import '@testing-library/jest-dom';
import { vi } from 'vitest';


const mockApplication = {
  id: '1',
  cv: 'John Doe CV',
  position: {
    title: 'Software Engineer',
    status: 'Active',
  },
};

const mockItem = {
  applications: [mockApplication],
};

describe('RenderCandidatesData Component', () => {
  const mockItem = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  it('matches snapshot', () => {
    const { asFragment } = render(<RenderCandidatesData item={mockItem} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('RenderCandidatesDetails Component', () => {
  const mockOnDelete = vi.fn();
  const mockOnEdit = vi.fn();

  it('renders applications correctly', () => {
    render(<RenderCandidatesDetails item={mockItem} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    const component = screen.getByRole('listitem');
    expect(component).toMatchSnapshot();
  });

  it('handles delete button click', () => {
    render(<RenderCandidatesDetails item={mockItem} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith('applications', mockApplication.id);
  });

  it('opens edit modal on edit button click', () => {
    render(<RenderCandidatesDetails item={mockItem} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByTestId('BorderColorRoundedIcon'));
    expect(screen.getByText('Edit Application')).toBeInTheDocument();
  });

  it('handles edit form submission', () => {
    render(<RenderCandidatesDetails item={mockItem} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByLabelText('edit'));
    fireEvent.click(screen.getByText('Save Changes'));

    expect(mockOnEdit).toHaveBeenCalledWith('applications', mockApplication.id, mockApplication);
  });
});
