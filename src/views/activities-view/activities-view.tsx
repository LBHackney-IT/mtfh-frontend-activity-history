import { Link as RouterLink, useParams } from 'react-router-dom';
import React from 'react';
import { Button, Link } from '@mtfh/common';
import { locale, usePerson } from '@services';
import { ActivityHistoryList } from '@components';

const { pageTitle, closeButton } = locale.activities;

export const ActivitiesView = (): JSX.Element => {
    const { id, entityType } = useParams<{ id: string; entityType: string }>();
    const { data: person } = usePerson(id);

    return (
        <div data-testid="activities">
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
