import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import { routeRender } from './test-utils';
import App from './app';

test('it renders view', async () => {
    routeRender(<App />);

    // await waitFor(() =>
    //     expect(screen.getByTestId('activities')).toBeInTheDocument()
    // );
});
