import { Link as RouterLink, useParams } from 'react-router-dom';
import React from 'react';
import { Button, Link } from '@mtfh/common';
import { locale, usePerson, useTenure } from '@services';
import { ActivityHistoryList } from '@components';

const { pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
    id: string;
    entityType: string;
}

const PersonInformation = ({ id, entityType }: EntityRequestId) => {
    const { data: person } = usePerson(id);
    return (
        <>
            <Link
                as={RouterLink}
                to={`/${entityType}/${id}`}
                variant="back-link"
            >
                {person?.firstName} {person?.surname}
            </Link>
            <h1 className="lbh-heading-h1">{pageTitle}</h1>
            <h2 className="lbh-heading-h2">
                {person?.firstName} {person?.surname}
            </h2>
        </>
    );
};

const TenureInformation = ({ id, entityType }: EntityRequestId) => {
    const { data: tenure } = useTenure(id);
    return (
        <>
            <Link
                as={RouterLink}
                to={`/${entityType}/${id}`}
                variant="back-link"
            >
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

const BasicEntityInformation = () => {
    const { id, entityType } = useParams<{ id: string; entityType: string }>();
    if (entityType === 'tenure') {
        return <TenureInformation id={id} entityType={entityType} />;
    }
    return <PersonInformation id={id} entityType={entityType} />;
};

export const ActivitiesView = (): JSX.Element => {
    const { id, entityType } = useParams<{ id: string; entityType: string }>();

    return (
        <div data-testid="activities">
            <BasicEntityInformation />
            <ActivityHistoryList targetId={id} />
            <Button
                as={RouterLink}
                to={`/${entityType}/${id}`}
                variant="secondary"
            >
                {closeButton}
            </Button>
        </div>
    );
};
