import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { locale } from '@services';
import { ActivityHistoryList } from './activity-history-list';
import { get, routeRender } from '../../test-utils';
import {
    mockUpdatedFirstName,
    mockMigratedPerson,
    mockCreatedPerson,
    mockUpdatedLanguages,
    mockUpdatedIdentifications,
    mockCreatedPhoneNumber,
    mockCreatedEmail,
    mockRemovedPhoneNumber,
    mockRemovedEmail,
    mockUpdatedDateOfBirth,
    mockUpdatedPlaceOfBirth,
    mockCreatedPhoneNumberWithContactTypeAsString,
    mockCreatedEmailWithContactTypeAsString,
    mockCreatedAddressWithContactTypeAsString,
    mockMigratedTenure,
    mockUpdatedTenure,
    mockCreatedTenure,
    mockEdittedTenureWithInValidParam,
    mockAddedPersonToTenure,
    mockRemovedPersonFromTenure,
} from '../../mocks';

test('it renders no comments with no results', async () => {
    get('/api/activityhistory', {}, 404);
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.getByText(/No activity history/)).toBeInTheDocument()
    );
});

test.skip('it pages the results upon clicking next and previous', async () => {
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
        results: [mockCreatedPerson],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.getByText(/Person created/)).toBeInTheDocument()
    );
});

test('it displays a Person editted on the activity history list for a new person record', async () => {
    get('/api/activityhistory', {
        results: [mockUpdatedFirstName],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.getByText(/Edit to person/)).toBeInTheDocument()
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

test('it should display a row for created phone number (contactType is number)', async () => {
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

test('it should display a row for created email (contactType is number)', async () => {
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

test('it should display a row for removed phone number (contactType is number)', async () => {
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

test('it should display a row for removed email (contactType is number)', async () => {
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
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryByText(/Place of birth/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.queryByText(/London/)).toBeInTheDocument()
    );
});

test('it should display a row for created phone number (contactType is string)', async () => {
    get('/api/activityhistory', {
        results: [mockCreatedPhoneNumberWithContactTypeAsString],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryByText(/Added/)).toBeInTheDocument()
    );

    await waitFor(() =>
        expect(screen.queryByText(/Phone/)).toBeInTheDocument()
    );

    await waitFor(() =>
        expect(screen.queryByText(/07123123123/)).toBeInTheDocument()
    );
});

test('it should display a row for created email (contactType is string)', async () => {
    get('/api/activityhistory', {
        results: [mockCreatedEmailWithContactTypeAsString],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryByText(/Added/)).toBeInTheDocument()
    );

    await waitFor(() =>
        expect(screen.queryByText(/Email/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(screen.queryByText(/email@address.com/)).toBeInTheDocument()
    );
});

test('it should display a row for created address (contactType is string)', async () => {
    get('/api/activityhistory', {
        results: [mockCreatedAddressWithContactTypeAsString],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryByText(/Added/)).toBeInTheDocument()
    );

    await waitFor(() =>
        expect(screen.queryByText(/Address/)).toBeInTheDocument()
    );
    await waitFor(() =>
        expect(
            screen.queryByText(/An address with postcode/)
        ).toBeInTheDocument()
    );
});

test('it should display a row for migrated tenure', async () => {
    get('/api/activityhistory', {
        results: [mockMigratedTenure],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryByText(/Tenure migrated/)).toBeInTheDocument()
    );
});

test('it should display a row with parameter name if the param is not part of the updatable entity', async () => {
    get('/api/activityhistory', {
        results: [mockEdittedTenureWithInValidParam],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryByText(/invalidParam/)).toBeInTheDocument()
    );
});

test('it should display a row for created tenure', async () => {
    get('/api/activityhistory', {
        results: [mockCreatedTenure],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() =>
        expect(screen.queryAllByText(/Tenure created/).length).toBe(2)
    );
});

test('it should display a row for updated tenure status (Activity) details', async () => {
    get('/api/activityhistory', {
        results: [mockUpdatedTenure],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => expect(screen.getByText(/Active/)).toBeInTheDocument());

    await waitFor(() =>
        expect(screen.getByText(/Inactive/)).toBeInTheDocument()
    );
});

test('it should display a row for an added person to tenure', async () => {
    get('/api/activityhistory', {
        results: [mockAddedPersonToTenure],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => {
        expect(
            screen.getByText(locale.activities.personAddedToTenure)
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                mockAddedPersonToTenure.newData?.householdMembers[0].fullName
            )
        ).toBeInTheDocument();
        expect(screen.getByText('01/01/01')).toBeInTheDocument();
        expect(screen.getByText('Household member')).toBeInTheDocument();
    });
});

test('it should display a row for a removed person from tenure', async () => {
    get('/api/activityhistory', {
        results: [mockRemovedPersonFromTenure],
        paginationDetails: {
            nextToken: null,
        },
    });
    routeRender(<ActivityHistoryList targetId="123" />);

    await waitFor(() => {
        expect(
            screen.getByText(locale.activities.personRemovedFromTenure)
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                mockRemovedPersonFromTenure.oldData?.householdMembers[0]
                    .fullName
            )
        ).toBeInTheDocument();
        expect(screen.getByText('01/01/01')).toBeInTheDocument();
        expect(screen.getByText('Household member')).toBeInTheDocument();
    });
});
