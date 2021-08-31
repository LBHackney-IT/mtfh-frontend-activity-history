import React, { ComponentPropsWithoutRef } from 'react';
import { locale } from '@services';
import { Activity } from '../../../services/activities';
import { ActivityRecordItem, formattedDate, updatedRecord } from '..';

const { entityEdited } = locale.activities;

interface TenureActivityRecordProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    tenureRecord: Activity;
}

export const TenureActivityRecord = ({
    tenureRecord,
    ...props
}: TenureActivityRecordProps): JSX.Element | null => {
    const date = formattedDate(tenureRecord.createdAt);
    const category = entityEdited(tenureRecord.targetType);
    const activityRecord = updatedRecord(tenureRecord);
    const edittedBy = tenureRecord.authorDetails.fullName;

    if (!activityRecord) return null;

    return (
        <ActivityRecordItem
            {...props}
            date={date}
            category={category}
            editDetails={activityRecord}
            editedBy={edittedBy}
        />
    );
};
