import { Link as RouterLink, useParams } from 'react-router-dom';
import React from 'react';
import { parseISO, format } from 'date-fns';
import { Button, Link, Table, Thead, Tbody, Tr, Th, Td } from '@mtfh/common';
import { locale, usePerson, Person, useActivityHistory } from '@services';

import { mockActivities } from '../../mocks/data';

import './activities-view.styles.scss';

const {
    pageTitle,
    closeButton,
    tableDate,
    tableCategory,
    tableEditDetails,
    tableEdittedBy,
    previouslyLabel,
    changedToLabel,
    removedLabel,
    addedLabel,
    noEntryLabel,
} = locale.activities;

const formattedDate = (date: any) => {
    return (
        <div>
            <p>{format(parseISO(date), 'dd.MM.yy')}</p>
            <p>{format(parseISO(date), 'hh:mm')}</p>
        </div>
    );
};

const updatedData = (
    oldData: Partial<Omit<Person, 'id'>>,
    newData: Partial<Omit<Person, 'id'>>
) => {
    const dictionaries: any = {
        id: 'ID',
        title: 'Title',
        firstName: 'First name',
        middleName: 'Middle name',
        lastName: 'Last name',
        preferredTitle: 'Preferred Title',
        preferredFirstname: 'Preferred First name',
        preferredMiddlename: 'Preferred Middle name',
        preferredSurname: 'Preferred Last name',
    };

    // fallback
    if (oldData === newData) return;

    if (
        JSON.stringify(Object.keys(oldData)) ===
        JSON.stringify(Object.keys(newData))
    ) {
        return Object.keys(oldData).map((paramName: string, index) => {
            if (paramName === 'id') return;
            if (oldData[paramName] === newData[paramName]) return;
            return (
                <div key={index}>
                    <p>
                        <b>{dictionaries[paramName]}</b>
                    </p>
                    <p>
                        {previouslyLabel}{' '}
                        <b>
                            {!!oldData[paramName]
                                ? oldData[paramName]
                                : noEntryLabel}
                        </b>
                    </p>
                    <p>
                        {changedToLabel} <b>{newData[paramName]}</b>
                    </p>
                </div>
            );
        });
    }

    const removedData = Object.keys(oldData).filter(
        (paramName: string, index) => {
            if (oldData[paramName] === newData[paramName]) return;
            return oldData[paramName];
        }
    );

    const addedData = Object.keys(newData).filter(
        (paramName: string, index) => {
            if (oldData[paramName] === newData[paramName]) return;
            return newData[paramName];
        }
    );

    if (removedData.length > 0) {
        return removedData.map((paramName: string, index) => {
            if (paramName === 'id') return;
            return (
                <div key={index}>
                    <p>
                        <b>{dictionaries[paramName]}</b>
                    </p>
                    <p>
                        {removedLabel} <b>{oldData[paramName]}</b>
                    </p>
                </div>
            );
        });
    }

    if (addedData.length > 0) {
        return addedData.map((paramName: string, index) => {
            if (paramName === 'id') return;
            return (
                <div key={index}>
                    <p>
                        <b>{dictionaries[paramName]}</b>
                    </p>
                    <p>
                        {addedLabel} <b>{newData[paramName]}</b>
                    </p>
                </div>
            );
        });
    }
};

export const ActivitiesView = (): JSX.Element => {
    const { id, type } = useParams<{ id: string; type: string }>();

    const { data: person } = usePerson(id);
    const { data: activities } = useActivityHistory(id);

    const { results } = mockActivities;

    return (
        <div data-testid="activities">
            <Link as={RouterLink} to={`/${type}/${id}`} variant="back-link">
                {person?.firstName} {person?.surname}
            </Link>
            <h1 className="lbh-heading-h1">{pageTitle}</h1>
            <h2 className="lbh-heading-h2">
                {person?.firstName} {person?.surname}
            </h2>

            <Table>
                <Thead>
                    <Tr>
                        <Th>{tableDate}</Th>
                        <Th>{tableCategory}</Th>
                        <Th>{tableEditDetails}</Th>
                        <Th>{tableEdittedBy}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {results.map((activity, index) => (
                        <Tr
                            key={index}
                            className="govuk-table__row mtfh-activities-history"
                        >
                            <Td>{formattedDate(activity.createdAt)}</Td>
                            <Td>{`Edit to ${activity.targetType}`}</Td>
                            <Td>
                                {updatedData(
                                    activity.oldData,
                                    activity.newData
                                )}
                            </Td>
                            <Th>{activity.authorDetails.fullName}</Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Button as={RouterLink} to={`/${type}/${id}`} variant="secondary">
                {closeButton}
            </Button>
        </div>
    );
};
