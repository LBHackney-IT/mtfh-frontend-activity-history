import React, { ReactElement } from 'react';
import { parseISO, format } from 'date-fns';

import { locale, Activity, ActivityChangeRecord } from '@services';

import './activity-history-list.styles.scss';

const {
    previouslyLabel,
    changedToLabel,
    removedLabel,
    addedLabel,
    entityCreated,
    entityMigrated,
    contactDetails,
} = locale.activities;

const { activities }: any = locale;
const { contactType } = contactDetails;

export const formattedDate = (date: any): ReactElement => {
    return (
        <div>
            <p>{format(parseISO(date), 'dd/MM/yy')}</p>
            <p>{format(parseISO(date), 'hh:mm')}</p>
        </div>
    );
};

export const updatedRecord = (activity: Activity) => {
    const {
        oldData: oldDataActivity,
        newData: newDataActivty,
        type,
        targetType,
    } = activity;

    const oldData = oldDataActivity || {};
    const newData = newDataActivty || {};

    const activityChangeRecord: ActivityChangeRecord = {
        targetType,
        newData,
        oldData,
    };

    if (type === 'migrate') {
        return <MigratedRecord targetType={targetType} />;
    }

    if (type === 'create') {
        return <CreatedRecord {...activityChangeRecord} />;
    }

    if (type === 'update') {
        return <UpdatedRecord {...activityChangeRecord} />;
    }

    if (type === 'delete') {
        return <DeletedRecord {...activityChangeRecord} />;
    }
};

export const MigratedRecord = ({ targetType }: any): ReactElement => (
    <p>
        <b>{entityMigrated(targetType)}</b>
    </p>
);

export const CreatedRecord = ({
    targetType,
    newData,
    oldData,
}: ActivityChangeRecord): any => {
    if (targetType === 'person') {
        return (
            <p>
                <b>{entityCreated(targetType)}</b>
            </p>
        );
    }

    if (targetType === 'contactDetails') {
        return (
            <div>
                <p>
                    <b>{contactType(newData.contactType)}</b>
                </p>
                <p>
                    {addedLabel} <b>{newData.value}</b>
                </p>
            </div>
        );
    }
};

export const UpdatedRecord = ({
    targetType,
    newData,
    oldData,
}: ActivityChangeRecord): any => {
    const activitiesOnTargetType = activities[targetType];
    const updatedElements = Object.keys(newData).map(
        (paramName: string, index) => {
            if (
                paramName === 'id' ||
                activitiesOnTargetType[paramName] === undefined
            )
                return null;

            if (oldData[paramName] === newData[paramName]) return null;
            return (
                <div key={index}>
                    <p>
                        <b>{activitiesOnTargetType[paramName].field}</b>
                    </p>
                    <p>
                        {previouslyLabel}{' '}
                        <b>
                            {activitiesOnTargetType[paramName].output(
                                oldData[paramName]
                            )}
                        </b>
                    </p>
                    <p>
                        {changedToLabel}{' '}
                        <b>
                            {activitiesOnTargetType[paramName].output(
                                newData[paramName]
                            )}
                        </b>
                    </p>
                </div>
            );
        }
    );

    return updatedElements;
};

export const DeletedRecord = ({
    targetType,
    newData,
    oldData,
}: ActivityChangeRecord): any => {
    const activitiesOnTargetType = activities[targetType];

    if (targetType === 'contactDetails') {
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
    }

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
