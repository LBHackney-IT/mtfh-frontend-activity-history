import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { locale } from '@services';

import { ActivitiesViewLegacy } from '../activities-view';
import { routeRender } from '../../test-utils';

test('renders the activities view', async () => {
    const [{ container }] = routeRender(<ActivitiesViewLegacy />, {
        url: '/activities/person/123',
    });
    expect(container).toMatchSnapshot();

    await waitFor(() =>
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
            locale.activities.pageTitle
        )
    );
});
