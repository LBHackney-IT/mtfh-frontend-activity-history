import React, { useMemo } from 'react';
import { parseISO, format } from 'date-fns';
import {
    Center,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    SimplePagination,
    SimplePaginationButton,
} from '@mtfh/common';
import { locale, Activity, useActivityHistory } from '@services';

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
    noActivitiyHistory,
    entityCreated,
    entityMigrated,
    entityEdited,
} = locale.activities;

const formattedDate = (date: any) => {
    return (
        <div>
            <p>{format(parseISO(date), 'dd/MM/yy')}</p>
            <p>{format(parseISO(date), 'hh:mm')}</p>
        </div>
    );
};

const updatedData = (activity: Activity) => {
    const {
        oldData: oldDataActivity,
        newData: newDataActivty,
        type,
        targetType,
    } = activity;

    const dictionaries: any = {
        id: 'ID',
        title: 'Title',
        firstName: 'First name',
        middleName: 'Middle name',
        surname: 'Last name',
        preferredTitle: 'Preferred title',
        preferredFirstName: 'Preferred first name',
        preferredMiddleName: 'Preferred middle name',
        preferredSurname: 'Preferred last name',
        gender: 'Gender',
    };

    if (type === 'migrate') {
        return (
            <p>
                <b>{entityMigrated(targetType)}</b>
            </p>
        );
    }

    const oldData = oldDataActivity || {};
    const newData = newDataActivty || {};

    if (type === 'update') {
        return (
            <>
                {Object.keys(oldData).map((paramName: string, index) => {
                    if (paramName === 'id' || !dictionaries[paramName])
                        return null;

                    if (oldData[paramName] === newData[paramName]) return null;
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
                })}
            </>
        );
    }

    if (type === 'delete') {
        const removedData = Object.keys(oldData).filter(
            (paramName: string, index) => {
                if (oldData[paramName] === newData[paramName]) return;
                return oldData[paramName];
            }
        );
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

    if (type === 'create') {
        if (targetType === 'person') {
            return (
                <p>
                    <b>{entityCreated(targetType)}</b>
                </p>
            );
        }
        const addedData = Object.keys(newData).filter(
            (paramName: string, index) => {
                if (oldData[paramName] === newData[paramName]) return;
                return newData[paramName];
            }
        );
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

function NoActivitiyHistory() {
    return <p className="lbh-label">{noActivitiyHistory}</p>;
}

export interface ActivityHistoryListProps {
    targetId: string;
}

export const ActivityHistoryList = ({
    targetId,
}: ActivityHistoryListProps): JSX.Element => {
    const { data, size, setSize, error } = useActivityHistory(targetId);

    const response = useMemo(() => {
        if (!data) return null;
        return data[size - 1];
    }, [data, size]);

    if (error?.response?.status === 404) {
        return <NoActivitiyHistory />;
    }

    if (!response) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    const {
        results: activityHistory,
        paginationDetails: { nextToken },
    } = response;

    return (
        <div>
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
                    {activityHistory.map((activity, index) => {
                        const dataChange = updatedData(activity);
                        if (!dataChange) return null;

                        return (
                            <Tr
                                key={index}
                                className="govuk-table__row mtfh-activity-history"
                            >
                                <Td>{formattedDate(activity.createdAt)}</Td>
                                <Td>{entityEdited(activity.targetType)}</Td>
                                <Td>{dataChange}</Td>
                                <Th>{activity.authorDetails.fullName}</Th>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <SimplePagination>
                {size !== 1 && (
                    <SimplePaginationButton
                        variant="previous"
                        onClick={() => setSize(size - 1)}
                    >
                        Previous
                    </SimplePaginationButton>
                )}
                {nextToken && (
                    <SimplePaginationButton
                        variant="next"
                        onClick={() => setSize(size + 1)}
                    >
                        Next
                    </SimplePaginationButton>
                )}
            </SimplePagination>
        </div>
    );
};
