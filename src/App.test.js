import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Please enter your username and password./i);
  expect(linkElement).toBeInTheDocument();
});
