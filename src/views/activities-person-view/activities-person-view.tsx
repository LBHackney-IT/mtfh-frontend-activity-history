import { Link as RouterLink, useParams } from 'react-router-dom';
import React from 'react';
import { Button, Link } from '@mtfh/common';
import { locale, usePerson, useTenure } from '@services';
import { ActivityHistoryList } from '@components';

const { pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
    id: string;
}

const PersonInformation = ({ id }: EntityRequestId) => {
    const { data: person } = usePerson(id);
    return (
        <>
            <Link as={RouterLink} to={`/person/${id}`} variant="back-link">
                {person?.firstName} {person?.surname}
            </Link>
            <h1 className="lbh-heading-h1">{pageTitle}</h1>
            <h2 className="lbh-heading-h2">
                {person?.firstName} {person?.surname}
            </h2>
        </>
    );
};

export const ActivitiesPersonView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();

    return (
        <div data-testid="person-activities">
            <PersonInformation id={id} />
            <ActivityHistoryList targetId={id} />
            <Button as={RouterLink} to={`/person/${id}`} variant="secondary">
                {closeButton}
            </Button>
        </div>
    );
};
