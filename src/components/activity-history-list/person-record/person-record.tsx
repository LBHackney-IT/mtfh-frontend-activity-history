import React, { ComponentPropsWithoutRef, useMemo } from "react";

import {
  ActivityRecordItem,
  MigratedEntityRecord,
  UpdatedEntityRecord,
  formattedDate,
} from "..";
import { Activity, ActivityChangeRecord } from "../../../services/activities";

import { locale } from "@services";

const { activities }: any = locale;
const { entityCreated, entityEdited, removedLabel } = activities;

interface PersonActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
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

  const activityRecord = useMemo(() => {
    switch (type) {
      case "create":
        return <CreatedPersonRecord targetType={targetType} />;
      case "delete":
        return (
          <DeletedPersonRecord
            targetType={targetType}
            oldData={oldData}
            newData={newData}
          />
        );
      case "update":
        return (
          <UpdatedEntityRecord
            targetType={targetType}
            oldData={oldData}
            newData={newData}
          />
        );
      case "migrate":
        return <MigratedEntityRecord targetType={targetType} />;
      default:
        return null;
    }
  }, [type, targetType, oldData, newData]);

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
  const parametersOnTargetType = activities[targetType];

  if (targetType === "person") {
    const removedData = Object.keys(oldData).filter((paramName: string) => {
      if (oldData[paramName] === newData[paramName]) return;
      return oldData[paramName];
    });

    return removedData.map((paramName: string, index) => {
      if (paramName === "id") return;
      return (
        <div key={index}>
          <p>
            <b>{parametersOnTargetType[paramName].field}</b>
          </p>
          <p>
            {removedLabel}{" "}
            <b>{parametersOnTargetType[paramName].output(oldData[paramName])}</b>
          </p>
        </div>
      );
    });
  }
};
