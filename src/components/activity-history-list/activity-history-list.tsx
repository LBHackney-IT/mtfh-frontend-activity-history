import React, { useMemo } from 'react';
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
import { locale, useActivityHistory } from '@services';

import './activity-history-list.styles.scss';
import { formattedDate, updatedRecord } from './utils';

import { Activity } from '../../services/activities';

const {
    tableDate,
    tableCategory,
    tableEditDetails,
    tableEdittedBy,
    noActivityHistory,
    entityEdited,
} = locale.activities;

const isPerson = (activity: Activity): boolean => {
    return activity.targetType === 'person';
};

const isContactDetails = (activity: Activity): boolean => {
    return activity.targetType === 'contactDetails';
};

const isTenure = (activity: Activity): boolean => {
    return activity.targetType === 'tenure';
};

function NoActivityHistory() {
    return <p className="lbh-label">{noActivityHistory}</p>;
}

export interface ActivityHistoryListProps {
    targetId: string;
}

export interface ActivityRecordProp {
    date: any;
    category: any;
    editDetails: any;
    editedBy: any;
}

export const ActivityRecord = ({
    date,
    category,
    editDetails,
    editedBy,
}: ActivityRecordProp): JSX.Element | null => {
    return (
        <Tr className="govuk-table__row mtfh-activity-history">
            <Td>{date}</Td>
            <Td>{category}</Td>
            <Td>{editDetails}</Td>
            <Th>{editedBy}</Th>
        </Tr>
    );
};

export const ActivityHistoryList = ({
    targetId,
}: ActivityHistoryListProps): JSX.Element => {
    const { data, size, setSize, error } = useActivityHistory(targetId);

    const response = useMemo(() => {
        if (!data) return null;
        return data[size - 1];
    }, [data, size]);

    if (error?.response?.status === 404) {
        return <NoActivityHistory />;
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
                        // if (isPerson(activity)) {
                        // }
                        // if (isContactDetails(activity)) {
                        // }
                        // if (isTenure(activity)) {
                        // }

                        const date = formattedDate(activity.createdAt);
                        const category = entityEdited(activity.targetType);
                        const activityRecord = updatedRecord(activity);
                        const edittedBy = activity.authorDetails.fullName;
                        if (!activityRecord) return null;

                        return (
                            <ActivityRecord
                                key={index}
                                date={date}
                                category={category}
                                editDetails={activityRecord}
                                editedBy={edittedBy}
                            />
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
