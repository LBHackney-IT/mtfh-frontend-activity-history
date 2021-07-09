import React from 'react';
import { parseISO, format } from 'date-fns';
import { Table, Thead, Tbody, Tr, Th, Td } from '@mtfh/common';
import { locale, Activity, useActivityHistory } from '@services';
import { mockActivities } from '../../mocks/data';

import './activity-history-list.styles.scss';

const {
    tableDate,
    tableCategory,
    tableEditDetails,
    tableEdittedBy,
    previouslyLabel,
    changedToLabel,
    removedLabel,
    addedLabel,
    editToLabel,
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

const updatedData = (activity: Activity) => {
    const { oldData, newData, type } = activity;

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
                            {oldData[paramName]
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

    const addedData = Object.keys(newData).filter(
        (paramName: string, index) => {
            if (oldData[paramName] === newData[paramName]) return;
            return newData[paramName];
        }
    );

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

export interface ActivityHistoryListProps {
    targetId: string;
}

export const ActivityHistoryList = ({
    targetId,
}: ActivityHistoryListProps): JSX.Element => {
    const { data: activities } = useActivityHistory(targetId);

    const { results } = mockActivities;
    return (
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
                        className="govuk-table__row mtfh-activity-history"
                    >
                        <Td>{formattedDate(activity.createdAt)}</Td>
                        <Td>
                            {editToLabel} {activity.targetType}
                        </Td>
                        <Td>{updatedData(activity)}</Td>
                        <Th>{activity.authorDetails.fullName}</Th>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
