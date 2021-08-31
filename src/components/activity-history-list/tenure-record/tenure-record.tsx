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
const { entityCreated, entityEdited, removedLabel } = activities;

interface TenureActivityRecordProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    tenureRecord: Activity;
}

export const TenureActivityRecord = ({
    tenureRecord,
    ...props
}: TenureActivityRecordProps): JSX.Element | null => {
    const {
        oldData: oldDataActivity,
        newData: newDataActivty,
        type,
        targetType,
    } = tenureRecord;

    const oldData = oldDataActivity || {};
    const newData = newDataActivty || {};

    const date = formattedDate(tenureRecord.createdAt);
    const category = entityEdited(tenureRecord.targetType);
    const edittedBy = tenureRecord.authorDetails.fullName;

    let activityRecord: any;

    if (type === 'create') {
        activityRecord = <CreatedTenureRecord targetType={targetType} />;
    }

    if (type === 'delete') {
        activityRecord = (
            <DeletedTenureRecord
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
        // return <h1>yo</h1>
    }

    if (type === 'migrate') {
        activityRecord = <MigratedEntityRecord targetType={targetType} />;
    }

    // activityRecord = updatedRecord(tenureRecord);
    // if (!activityRecord) return null;

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

const CreatedTenureRecord = ({ targetType }: any): JSX.Element => (
    <p>
        <b>{entityCreated(targetType)}</b>
    </p>
);

const DeletedTenureRecord = ({
    targetType,
    newData,
    oldData,
}: ActivityChangeRecord): any => {
    const activitiesOnTargetType = activities[targetType];

    const removedData = Object.keys(oldData).filter((paramName: string) => {
        if (oldData[paramName] === newData[paramName]) return;
        return oldData[paramName];
    });

    return removedData.map((paramName: string, index) => {
        if (paramName === 'id') return;
        return (
            <div key={index}>
                <p>
                    <b>{activitiesOnTargetType[paramName].field}</b>
                </p>
                <p>
                    {removedLabel}{' '}
                    <b>
                        {activitiesOnTargetType[paramName].output(
                            oldData[paramName]
                        )}
                    </b>
                </p>
            </div>
        );
    });
};
