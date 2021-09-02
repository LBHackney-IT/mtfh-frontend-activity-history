import React, { ComponentPropsWithoutRef } from 'react';
import { locale } from '@services';
import { Activity, ActivityChangeRecord } from '../../../services/activities';
import {
    ActivityRecordItem,
    MigratedEntityRecord,
    UpdatedEntityRecord,
    formattedDate,
    updatedRecord,
} from '../';

const { activities }: any = locale;
const { addedLabel, contactDetails, entityEdited, removedLabel } = activities;
const { contactType } = contactDetails;

interface ContactDetailsActivityRecordProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    contactDetailsRecord: Activity;
}

export const ContactDetailsActivityRecord = ({
    contactDetailsRecord,
    ...props
}: ContactDetailsActivityRecordProps): JSX.Element | null => {
    const {
        oldData: oldDataActivity,
        newData: newDataActivty,
        type,
        targetType,
    } = contactDetailsRecord;

    const oldData = oldDataActivity || {};
    const newData = newDataActivty || {};

    const date = formattedDate(contactDetailsRecord.createdAt);
    const category = entityEdited(contactDetailsRecord.targetType);
    const edittedBy = contactDetailsRecord.authorDetails.fullName;

    let activityRecord: any;

    if (type === 'create') {
        activityRecord = (
            <CreatedContactDetailRecord
                targetType={targetType}
                oldData={oldData}
                newData={newData}
            />
        );
    }

    if (type === 'delete') {
        activityRecord = (
            <DeletedContactDetailRecord
                targetType={targetType}
                oldData={oldData}
                newData={newData}
            />
        );
    }

    if (type === 'update') {
        activityRecord = (
            <UpdatedEntityRecord
                targetType={targetType}
                oldData={oldData}
                newData={newData}
            />
        );
    }

    if (type === 'migrate') {
        activityRecord = <MigratedEntityRecord targetType={targetType} />;
    }

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

const CreatedContactDetailRecord = ({
    targetType,
    newData,
    oldData,
}: ActivityChangeRecord): JSX.Element => (
    <div>
        <p>
            <b>{contactType(newData.contactType)}</b>
        </p>
        <p>
            {addedLabel} <b>{newData.value}</b>
        </p>
    </div>
);

const DeletedContactDetailRecord = ({
    targetType,
    newData,
    oldData,
}: ActivityChangeRecord): any => {
    return (
        <div>
            <p>
                <b>{contactType(oldData.contactType)}</b>
            </p>
            <p>
                {removedLabel} <b>{oldData.value}</b>
            </p>
        </div>
    );
};
