import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { locale } from '@services';

import { ActivitiesTenureView } from './';
import { routeRender } from '../../test-utils';

test('renders the activities view', async () => {
    const [{ container }] = routeRender(<ActivitiesTenureView />, {
        url: '/activities/tenure/123',
    });
    expect(container).toMatchSnapshot();

    await waitFor(() =>
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
            locale.activities.pageTitle
        )
    );

    // expect(screen.queryByText(/Joan Evans/)).toBeInTheDocument();
});
