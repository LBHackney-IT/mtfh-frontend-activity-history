import React from 'react';

import { Tr, Th, Td } from '@mtfh/common';

export interface ActivityRecordItemProps {
    date: any;
    category: any;
    editDetails: any;
    editedBy: any;
}

export const ActivityRecordItem = ({
    date,
    category,
    editDetails,
    editedBy,
}: ActivityRecordItemProps): JSX.Element | null => {
    return (
        <Tr className="govuk-table__row mtfh-activity-history">
            <Td>{date}</Td>
            <Td>{category}</Td>
            <Td>{editDetails}</Td>
            <Th>{editedBy}</Th>
        </Tr>
    );
};
