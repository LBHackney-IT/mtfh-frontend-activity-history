import { Link as RouterLink, useParams } from 'react-router-dom';
import React from 'react';
import { Button, Link } from '@mtfh/common';
import { locale, usePerson } from '@services';
import { ActivityHistoryListLegacy } from '@components';

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

export const ActivitiesViewLegacy = (): JSX.Element => {
    const { id, entityType } = useParams<{ id: string; entityType: string }>();

    return (
        <div data-testid="activities">
            <PersonInformation id={id} entityType={entityType} />
            <ActivityHistoryListLegacy targetId={id} />
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
