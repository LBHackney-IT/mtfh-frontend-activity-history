import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { ActivityHistoryList } from './activity-history-list';
import { get, routeRender } from '../../test-utils';
import {
    mockActivities,
    mockUpdatedFirstName,
    mockMigratedPerson,
    mockRemovedLastName,
    mockCreatedPerson,
} from '../../mocks';

test('it renders no comments with no results', async () => {
    get('/api/activityhistory', {}, 404);
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.getByText(/No activity history/)).toBeInTheDocument()
    );
});

test('it pages the results upon clicking next and previous', async () => {
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(screen.getByText(/Next/)).toBeInTheDocument());

    get('/api/activityhistory', {
        results: [mockMigratedPerson],
        paginationDetails: {
            nextToken: null,
        },
    });
    userEvent.click(screen.getByText(/Next/));

    await waitFor(() =>
        expect(screen.getByText(/Person migrated/)).toBeInTheDocument()
    );

    userEvent.click(screen.getByText(/Previous/));

    await waitFor(() =>
        expect(screen.getByText(/First name/)).toBeInTheDocument()
    );
});

test('it renders correctly', () => {
    routeRender(<ActivityHistoryList targetId="123" />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
});

test('it displays a Person created on the activity history list for a new person record', async () => {
    get('/api/activityhistory', {
        results: [mockUpdatedFirstName],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.getByText(/Person created/)).toBeInTheDocument()
    );
});

test('it pages the results', async () => {
    get('/api/activityhistory', {
        results: [mockCreatedPerson, mockUpdatedFirstName],
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
        expect(screen.getByText(/Person created/)).toBeInTheDocument()
    );

    // await waitFor(() =>
    //     expect(screen.getByText(/First name/)).toBeInTheDocument()
    // );
    // await waitFor(() =>
    //     expect(screen.getByText(/Last name/)).toBeInTheDocument()
    // );
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
        results: [mockUpdatedFirstName],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(screen.queryByText(/Next/)).toBe(null));
});
