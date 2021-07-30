import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { ActivityHistoryList } from './activity-history-list';
import { get, routeRender } from '../../test-utils';
import {
    mockUpdatedFirstName,
    mockMigratedPerson,
    mockRemovedLastName,
    mockCreatedPerson,
    mockUpdatedLanguages,
    mockUpdatedIdentifications,
    mockCreatedPhoneNumber,
    mockCreatedEmail,
    mockRemovedPhoneNumber,
    mockRemovedEmail,
    mockUpdatedDateOfBirth,
    mockUpdatedPlaceOfBirth,
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

test('it should display change in Languages', async () => {
    get('/api/activityhistory', {
        results: [mockUpdatedLanguages],
        paginationDetails: {
            nextToken: null,
        },
    });
    const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryByText(/Languages/)).toBeInTheDocument()
    );
    await waitFor(() => expect(container).toMatchSnapshot());
});

test('it should display change in Identifications', async () => {
    get('/api/activityhistory', {
        results: [mockUpdatedIdentifications],
        paginationDetails: {
            nextToken: null,
        },
    });
    const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryByText(/Identitifications/)).toBeInTheDocument()
    );
    await waitFor(() => expect(container).toMatchSnapshot());
});

test('it should display a row for created phone number', async () => {
    get('/api/activityhistory', {
        results: [mockCreatedPhoneNumber],
        paginationDetails: {
            nextToken: null,
        },
    });
    const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(container).toMatchSnapshot());
    await waitFor(() =>
        expect(screen.queryByText(/Added/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.queryByText(/07123123123/)).toBeInTheDocument()
    );
});

test('it should display a row for created email', async () => {
    get('/api/activityhistory', {
        results: [mockCreatedEmail],
        paginationDetails: {
            nextToken: null,
        },
    });
    const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(container).toMatchSnapshot());
    await waitFor(() =>
        expect(screen.queryByText(/Added/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.queryByText(/email@address.com/)).toBeInTheDocument()
    );
});

test('it should display a row for removed phone number', async () => {
    get('/api/activityhistory', {
        results: [mockRemovedPhoneNumber],
        paginationDetails: {
            nextToken: null,
        },
    });
    const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(container).toMatchSnapshot());

    await waitFor(() =>
        expect(screen.queryByText(/Removed/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.queryByText(/07123123123/)).toBeInTheDocument()
    );
});

test('it should display a row for removed email', async () => {
    get('/api/activityhistory', {
        results: [mockRemovedEmail],
        paginationDetails: {
            nextToken: null,
        },
    });
    const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(container).toMatchSnapshot());

    await waitFor(() =>
        expect(screen.queryByText(/Removed/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.queryByText(/email@address.com/)).toBeInTheDocument()
    );
});

test('it should display a row for change in date of birth', async () => {
    get('/api/activityhistory', {
        results: [mockUpdatedDateOfBirth],
        paginationDetails: {
            nextToken: null,
        },
    });
    const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(container).toMatchSnapshot());

    await waitFor(() =>
        expect(screen.queryByText(/Date of birth/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.queryByText('23/04/62')).toBeInTheDocument()
    );
});

test('it should display a row for change in place of birth', async () => {
    get('/api/activityhistory', {
        results: [mockUpdatedPlaceOfBirth],
        paginationDetails: {
            nextToken: null,
        },
    });
    const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(container).toMatchSnapshot());

    await waitFor(() =>
        expect(screen.queryByText(/Place of birth/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.queryByText(/London/)).toBeInTheDocument()
    );
});
