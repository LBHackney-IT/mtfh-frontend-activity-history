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

interface TenureActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
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
    createdAt,
    authorDetails,
  } = tenureRecord;

  const oldData = oldDataActivity || {};
  const newData = newDataActivty || {};

  const date = formattedDate(createdAt);
  const category =
    type === "create" ? entityCreated(targetType) : entityEdited(targetType);
  const edittedBy = authorDetails.fullName;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "create":
        return <CreatedTenureRecord targetType={targetType} />;
      case "delete":
        return (
          <DeletedTenureRecord
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
  const parametersOnTargetType = activities[targetType];

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
};
