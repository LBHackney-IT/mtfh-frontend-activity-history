import { Link as RouterLink, useParams } from 'react-router-dom';
import React from 'react';
import { Button, Link } from '@mtfh/common';
import { locale, useTenure } from '@services';
import { ActivityHistoryList } from '@components';

const { pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
    id: string;
}

const TenureInformation = ({ id }: EntityRequestId) => {
    const { data: tenure } = useTenure(id);
    return (
        <>
            <Link as={RouterLink} to={`/tenure/${id}`} variant="back-link">
                Tenure {tenure?.paymentReference}
            </Link>
            <h1 className="lbh-heading-h1">{pageTitle}</h1>
            <h2 className="lbh-heading-h2">
                Tenure payment reference {tenure?.paymentReference}
                <br></br>
                {tenure?.tenuredAsset?.fullAddress}
            </h2>
        </>
    );
};

export const ActivitiesTenureView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();

    return (
        <div data-testid="tenure-activities">
            <TenureInformation id={id} />
            <ActivityHistoryList targetId={id} />
            <Button as={RouterLink} to={`/tenure/${id}`} variant="secondary">
                {closeButton}
            </Button>
        </div>
    );
};