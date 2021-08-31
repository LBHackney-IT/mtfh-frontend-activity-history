import React, { useMemo } from 'react';
import {
    Center,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    SimplePagination,
    SimplePaginationButton,
} from '@mtfh/common';
import { locale, useActivityHistory } from '@services';

import './activity-history-list.styles.scss';
import {
    ContactDetailsActivityRecord,
    PersonActivityRecord,
    TenureActivityRecord,
} from './';
import { isPerson, isContactDetails, isTenure } from '../../utils';

const {
    tableDate,
    tableCategory,
    tableEditDetails,
    tableEdittedBy,
    noActivityHistory,
} = locale.activities;

function NoActivityHistory() {
    return <p className="lbh-label">{noActivityHistory}</p>;
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
                        const { targetType } = activity;
                        if (isPerson(targetType)) {
                            return (
                                <PersonActivityRecord
                                    key={index}
                                    personRecord={activity}
                                />
                            );
                        }
                        if (isContactDetails(targetType)) {
                            return (
                                <ContactDetailsActivityRecord
                                    key={index}
                                    contactDetailsRecord={activity}
                                />
                            );
                        }
                        if (isTenure(targetType)) {
                            return (
                                <TenureActivityRecord
                                    key={index}
                                    tenureRecord={activity}
                                />
                            );
                        }
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
