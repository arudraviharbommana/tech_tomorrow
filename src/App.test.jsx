import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Alimony+ app', () => {
  it('renders the dashboard and key task modules', () => {
    render(<App />);

    expect(screen.getByText('Pre-trial readiness overview')).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Courtroom Tour').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Practice Cards').length).toBeGreaterThan(0);
  });

  it('allows a user to toggle checklist items and update the readiness count', async () => {
    const user = userEvent.setup();
    render(<App />);

    const checklistButton = screen.getAllByRole('button', {
      name: /Readiness Checklist/i,
    })[0];
    await user.click(checklistButton);

    const taxReturns = screen.getByRole('checkbox', {
      name: /Latest tax returns and certificates/i,
    });

    expect(screen.getAllByText(/50% ready/i).length).toBeGreaterThan(0);

    await user.click(taxReturns);

    expect(screen.getAllByText(/67% ready/i).length).toBeGreaterThan(0);
    expect(taxReturns).toBeChecked();
  });
});
