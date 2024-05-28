import React from 'react';
import { render } from '@testing-library/react';
import { RenderPositionsData, RenderPositionsDetails } from '../utils/renderPositionsData';
import '@testing-library/jest-dom';

const mockPosition = {
  title: 'Software Engineer',
  status: 'Active',
  applications: [
    {
      id: '1',
      candidate: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      },
      cv: 'John Doe CV',
    },
  ],
};

describe('RenderPositionsData Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<RenderPositionsData item={mockPosition} />);
    
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('RenderPositionsDetails Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<RenderPositionsDetails item={mockPosition} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
