import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { TenureActivityRecord } from './tenure-record';
import { routeRender } from '../../../test-utils';
import {
    mockCreatedTenure,
    mockMigratedTenure,
    mockTenureUpdatedIsActive,
    mockTenureUpdatedTenureType,
    mockTenureUpdatedStartOfTenureDate,
    mockTenureUpdatedEndOfTenureDate,
    mockTenureUpdatedEndOfTenureDateToNoEntry,
} from '../../../mocks';

test('it should display the record for migrated tenure', async () => {
    routeRender(
        <TenureActivityRecord key="123" tenureRecord={mockMigratedTenure} />
    );

    await waitFor(() =>
        expect(screen.queryByText(/Tenure migrated/)).toBeInTheDocument()
    );
});

test('it should display the record for created tenure', async () => {
    routeRender(
        <TenureActivityRecord key="123" tenureRecord={mockCreatedTenure} />
    );

    await waitFor(() =>
        expect(screen.queryByText(/Tenure created/)).toBeInTheDocument()
    );
});

test('it should display an update for tenure status record ', async () => {
    routeRender(
        <TenureActivityRecord
            key="123"
            tenureRecord={mockTenureUpdatedIsActive}
        />
    );

    await waitFor(() =>
        expect(screen.queryByText(/Tenure status/)).toBeInTheDocument()
    );
});

test('it should display an update for tenure type record ', async () => {
    routeRender(
        <TenureActivityRecord
            key="123"
            tenureRecord={mockTenureUpdatedTenureType}
        />
    );

    await waitFor(() =>
        expect(screen.queryByText(/Tenure type/)).toBeInTheDocument()
    );
});

test('it should display an update for tenure status record ', async () => {
    routeRender(
        <TenureActivityRecord
            key="123"
            tenureRecord={mockTenureUpdatedStartOfTenureDate}
        />
    );

    await waitFor(() =>
        expect(screen.queryByText(/Start date/)).toBeInTheDocument()
    );
});

test('it should display an update for tenure startOfTenureDate record ', async () => {
    routeRender(
        <TenureActivityRecord
            key="123"
            tenureRecord={mockTenureUpdatedEndOfTenureDate}
        />
    );

    await waitFor(() =>
        expect(screen.queryByText(/End date/)).toBeInTheDocument()
    );
});
