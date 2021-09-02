import React, { ComponentPropsWithoutRef, useMemo } from 'react';
import { locale } from '@services';
import { Activity, ActivityChangeRecord } from '../../../services/activities';
import {
    ActivityRecordItem,
    MigratedEntityRecord,
    UpdatedEntityRecord,
    formattedDate,
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

    const activityRecord = useMemo(() => {
        switch (type) {
            case 'create':
                return <CreatedTenureRecord targetType={targetType} />;
            case 'delete':
                return (
                    <DeletedTenureRecord
                        targetType={targetType}
                        oldData={oldData}
                        newData={newData}
                    />
                );
            case 'update':
                return (
                    <UpdatedEntityRecord
                        targetType={targetType}
                        oldData={oldData}
                        newData={newData}
                    />
                );
            case 'migrate':
                return <MigratedEntityRecord targetType={targetType} />;
            default:
                return null;
        }
    }, []);

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
