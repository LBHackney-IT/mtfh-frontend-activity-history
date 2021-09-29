import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import { routeRender } from './test-utils';
import App from './app';

test('it renders activities view', async () => {
    routeRender(<App />, { url: '/activities/person/:id', path: '/' });

    await waitFor(() =>
        expect(screen.getByTestId('person-activities')).toBeInTheDocument()
    );
});
