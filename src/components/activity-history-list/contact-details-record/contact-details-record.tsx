import React, { ComponentPropsWithoutRef } from 'react';
import { locale } from '@services';
import { Activity } from '../../../services/activities';
import { ActivityRecordItem, formattedDate, updatedRecord } from '..';

const { entityEdited } = locale.activities;

interface ContactDetailsActivityRecordProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    contactDetailsRecord: Activity;
}

export const ContactDetailsActivityRecord = ({
    contactDetailsRecord,
    ...props
}: ContactDetailsActivityRecordProps): JSX.Element | null => {
    const date = formattedDate(contactDetailsRecord.createdAt);
    const category = entityEdited(contactDetailsRecord.targetType);
    const activityRecord = updatedRecord(contactDetailsRecord);
    const edittedBy = contactDetailsRecord.authorDetails.fullName;

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
