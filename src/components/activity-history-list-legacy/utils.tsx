import React, { ReactElement } from 'react';
import { parseISO, format } from 'date-fns';

import { locale, Activity } from '@services';

import './activity-history-list-legacy.styles.scss';

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

export const formattedDate = (date: any): ReactElement => {
    return (
        <div>
            <p>{format(parseISO(date), 'dd/MM/yy')}</p>
            <p>{format(parseISO(date), 'H:mm')}</p>
        </div>
    );
};

export const updatedData = (activity: Activity) => {
    const {
        oldData: oldDataActivity,
        newData: newDataActivty,
        type,
        targetType,
    } = activity;
    const { contactType } = contactDetails;

    const activitiesOnTargetType = activities[targetType];

    if (type === 'migrate') {
        return (
            <p>
                <b>{entityMigrated(targetType)}</b>
            </p>
        );
    }

    const oldData = oldDataActivity || {};
    const newData = newDataActivty || {};

    if (type === 'update') {
        const updatedElements = Object.keys(newData).map(
            (paramName: string, index) => {
                if (
                    paramName === 'id' ||
                    activitiesOnTargetType[paramName] === undefined
                )
                    return null;

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
    }

    if (type === 'delete') {
        if (targetType === 'contactDetails') {
            return (
                <>
                    <div>
                        <p>
                            <b>{contactType(oldData.contactType)}</b>
                        </p>
                        <p>
                            {removedLabel} <b>{oldData.value}</b>
                        </p>
                    </div>
                </>
            );
        }

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

    if (type === 'create') {
        if (targetType === 'person') {
            return (
                <p>
                    <b>{entityCreated(targetType)}</b>
                </p>
            );
        }

        if (targetType === 'contactDetails') {
            return (
                <>
                    <div>
                        <p>
                            <b>{contactType(newData.contactType)}</b>
                        </p>
                        <p>
                            {addedLabel} <b>{newData.value}</b>
                        </p>
                    </div>
                </>
            );
        }

        const addedData = Object.keys(newData).filter((paramName: string) => {
            if (oldData[paramName] === newData[paramName]) return;
            return newData[paramName];
        });
        return addedData.map((paramName: string, index) => {
            if (paramName === 'id') return;
            return (
                <div key={index}>
                    <p>
                        <b>{activitiesOnTargetType[paramName].field}</b>
                    </p>
                    <p>
                        {addedLabel} <b>{newData[paramName]}</b>
                    </p>
                </div>
            );
        });
    }
};
