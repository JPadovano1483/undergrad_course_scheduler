import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('App Renders', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
});
