import React, { ComponentPropsWithoutRef } from 'react';
import { locale } from '@services';
import { Activity } from '../../../services/activities';
import { ActivityRecordItem, formattedDate, updatedRecord } from '../';

const { entityEdited } = locale.activities;

interface PersonActivityRecordProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    personRecord: Activity;
}

export const PersonActivityRecord = ({
    personRecord,
    ...props
}: PersonActivityRecordProps): JSX.Element | null => {
    const date = formattedDate(personRecord.createdAt);
    const category = entityEdited(personRecord.targetType);
    const activityRecord = updatedRecord(personRecord);
    const edittedBy = personRecord.authorDetails.fullName;

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
