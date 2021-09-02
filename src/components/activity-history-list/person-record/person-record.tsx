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

interface PersonActivityRecordProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    personRecord: Activity;
}

export const PersonActivityRecord = ({
    personRecord,
    ...props
}: PersonActivityRecordProps): JSX.Element | null => {
    const {
        oldData: oldDataActivity,
        newData: newDataActivty,
        type,
        targetType,
    } = personRecord;

    const oldData = oldDataActivity || {};
    const newData = newDataActivty || {};

    const date = formattedDate(personRecord.createdAt);
    const category = entityEdited(personRecord.targetType);
    const edittedBy = personRecord.authorDetails.fullName;

    let activityRecord: any;

    if (type === 'create') {
        activityRecord = <CreatedPersonRecord targetType={targetType} />;
    }

    if (type === 'delete') {
        activityRecord = (
            <DeletedPersonRecord
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

const CreatedPersonRecord = ({ targetType }: any): JSX.Element => (
    <p>
        <b>{entityCreated(targetType)}</b>
    </p>
);

const DeletedPersonRecord = ({
    targetType,
    newData,
    oldData,
}: ActivityChangeRecord): any => {
    const activitiesOnTargetType = activities[targetType];

    if (targetType === 'person') {
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
    }
};
