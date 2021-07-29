import React, { ReactElement } from 'react';
import { parseISO, format } from 'date-fns';

import { locale, Activity } from '@services';

import './activity-history-list.styles.scss';

const {
    previouslyLabel,
    changedToLabel,
    removedLabel,
    addedLabel,
    entityCreated,
    entityMigrated,
} = locale.activities;

const { activities }: any = locale;

export const formattedDate = (date: any): ReactElement => {
    return (
        <div>
            <p>{format(parseISO(date), 'dd/MM/yy')}</p>
            <p>{format(parseISO(date), 'hh:mm')}</p>
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
        const updatedElements = Object.keys(oldData).map(
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
    }

    if (type === 'delete') {
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
        if (targetType === 'person' || targetType === 'contactDetails') {
            return (
                <p>
                    <b>{entityCreated(targetType)}</b>
                </p>
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
