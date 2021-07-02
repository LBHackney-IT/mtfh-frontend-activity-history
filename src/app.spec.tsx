import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { routeRender } from './test-utils';
import App from './app';

test('it renders view', async () => {
    // routeRender(<App />, { url: 'activities/person/123', path: '/' });
    render(<App />);

    await waitFor(() =>
        expect(screen.getByTestId('activities')).toBeInTheDocument()
    );
});
