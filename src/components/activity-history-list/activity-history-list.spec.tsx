import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { ActivityHistoryList } from './activity-history-list';
import { get, routeRender } from '../../test-utils';
import {
    mockAddedFirstName,
    mockMigratedPerson,
    mockRemovedLastName,
} from '../../mocks';

test('it renders correctly', async () => {
    routeRender(<ActivityHistoryList targetId="123" />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
});

test('it renders no comments with no results', async () => {
    get('/api/activityhistory', '123', 404);
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.getByText(/No activity history/)).toBeInTheDocument()
    );
});

test('it pages the results', async () => {
    get('/api/activityhistory', {
        results: [mockAddedFirstName, mockRemovedLastName],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(screen.getByText(/date/)).toBeInTheDocument());
    await waitFor(() =>
        expect(screen.getByText(/category/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.getByText(/edit details/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.getByText(/edited by/)).toBeInTheDocument()
    );

    await waitFor(() =>
        expect(screen.getByText(/First name/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.getByText(/Last name/)).toBeInTheDocument()
    );
});

test('it pages the results for migrated person information', async () => {
    get('/api/activityhistory', {
        results: [mockMigratedPerson],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.getByText(/Person migrated/)).toBeInTheDocument()
    );
});

test('it does not render pagination unnecessarily', async () => {
    get('/api/activityhistory', {
        results: [mockAddedFirstName],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(screen.queryByText(/Next/)).toBe(null));
});
