import React, { ReactElement } from "react";

import { format, parseISO } from "date-fns";

import { ActivityChangeRecord, locale } from "@services";

import "./activity-history-list.styles.scss";

const { activities }: any = locale;
const { previouslyLabel, changedToLabel, entityMigrated } = activities;

export const formattedDate = (date: any): ReactElement => {
  return (
    <div>
      <p>{format(parseISO(date), "dd/MM/yy")}</p>
      <p>{format(parseISO(date), "H:mm")}</p>
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
  referenceData,
}: ActivityChangeRecord): any => {
  const parametersOnTargetType = activities[targetType];

  const updatedParams = [...new Set([...Object.keys(newData), ...Object.keys(oldData)])];

  const updatedElements = updatedParams.map((paramName: string, index) => {
    if (paramName === "id") return null;

    if (parametersOnTargetType[paramName] === undefined) {
      return (
        <p key={index}>
          <b>{paramName}</b>
        </p>
      );
    }
    if (JSON.stringify(oldData[paramName]) === JSON.stringify(newData[paramName]))
      return null;
    return (
      <div key={index}>
        <p>
          <b>{parametersOnTargetType[paramName].field}</b>
        </p>
        <p>
          {previouslyLabel}{" "}
          <b>
            {parametersOnTargetType[paramName].output(oldData[paramName], referenceData)}
          </b>
        </p>
        <p>
          {changedToLabel}{" "}
          <b>
            {parametersOnTargetType[paramName].output(newData[paramName], referenceData)}
          </b>
        </p>
      </div>
    );
  });

  return updatedElements;
};
