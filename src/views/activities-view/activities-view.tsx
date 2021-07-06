import { Link as RouterLink, useParams } from 'react-router-dom';
import React from 'react';

import { Button, Link } from '@mtfh/common';

import { locale, usePerson } from '@services';

const { pageTitle, closeButton } = locale.activities;

export const ActivitiesView = (): JSX.Element => {
    const { id, type } = useParams<{ id: string; type: string }>();

    const { data: person } = usePerson(id);

    return (
        <div data-testid="activities">
            <Link as={RouterLink} to={`/${type}/${id}`} variant="back-link">
                {person?.firstName} {person?.surname}
            </Link>
            <h1 className="lbh-heading-h1">{pageTitle}</h1>
            <h2 className="lbh-heading-h2">
                {person?.firstName} {person?.surname}
            </h2>
            <Button as={RouterLink} to={`/${type}/${id}`} variant="secondary">
                {closeButton}
            </Button>
        </div>
    );
};
