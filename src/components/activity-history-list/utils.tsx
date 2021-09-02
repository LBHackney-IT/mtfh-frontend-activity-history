import React, { ReactElement } from 'react';
import { parseISO, format } from 'date-fns';

import { locale, ActivityChangeRecord } from '@services';

import './activity-history-list.styles.scss';

const { activities }: any = locale;
const { previouslyLabel, changedToLabel, entityMigrated } = activities;

export const formattedDate = (date: any): ReactElement => {
    return (
        <div>
            <p>{format(parseISO(date), 'dd/MM/yy')}</p>
            <p>{format(parseISO(date), 'H:mm')}</p>
        </div>
    );
};

export const MigratedEntityRecord = ({ targetType }: any): ReactElement => (
    <p>
        <b>{entityMigrated(targetType)}</b>
    </p>
);

export const UpdatedEntityRecord = ({
    targetType,
    newData,
    oldData,
}: ActivityChangeRecord): any => {
    const parametersOnTargetType = activities[targetType];

    const updatedElements = Object.keys(newData).map(
        (paramName: string, index) => {
            if (paramName === 'id') return null;

            if (parametersOnTargetType[paramName] === undefined) {
                return (
                    <p key={index}>
                        <b>{paramName}</b>
                    </p>
                );
            }
            if (oldData[paramName] === newData[paramName]) return null;
            return (
                <div key={index}>
                    <p>
                        <b>{parametersOnTargetType[paramName].field}</b>
                    </p>
                    <p>
                        {previouslyLabel}{' '}
                        <b>
                            {parametersOnTargetType[paramName].output(
                                oldData[paramName]
                            )}
                        </b>
                    </p>
                    <p>
                        {changedToLabel}{' '}
                        <b>
                            {parametersOnTargetType[paramName].output(
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
