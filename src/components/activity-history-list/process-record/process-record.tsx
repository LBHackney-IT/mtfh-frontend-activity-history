import React, { ComponentPropsWithoutRef, useMemo } from "react";
import { useParams } from "react-router-dom";

import { ActivityRecordItem } from "../activity-record-item";
import { MigratedEntityRecord, UpdatedEntityRecord, formattedDate } from "../utils";

import { Activity, ActivityChangeRecord, ActivityProcessName, locale } from "@services";

const { activities }: any = locale;
const { process, entityEdited, removedLabel } = activities;

interface ProcessActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  processRecord: Activity;
}

export const ProcessActivityRecord = ({
  processRecord,
  ...props
}: ProcessActivityRecordProps): JSX.Element | null => {
  const { processName } = useParams<{ processName: ActivityProcessName }>();
  const {
    oldData: oldDataActivity,
    newData: newDataActivty,
    type,
    targetType,
    createdAt,
    authorDetails,
  } = processRecord;

  const oldData = useMemo(() => oldDataActivity || {}, [oldDataActivity]);
  const newData = useMemo(() => newDataActivty || {}, [newDataActivty]);

  const date = formattedDate(createdAt);
  const category =
    type === "create" ? process.category.started(targetType) : entityEdited(targetType);
  const editedBy = authorDetails.fullName;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "create":
        return <CreatedProcessRecord processName={processName} />;
      case "delete":
        return (
          <DeletedProcessRecord
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
  }, [type, targetType, oldData, newData, processName]);
  return (
    <ActivityRecordItem
      {...props}
      date={date}
      category={category}
      editDetails={activityRecord}
      editedBy={editedBy}
    />
  );
};

const CreatedProcessRecord = ({
  processName,
}: {
  processName: ActivityProcessName;
}): JSX.Element => (
  <p>
    <b>{process.details.started(processName)}</b>
  </p>
);

const DeletedProcessRecord = ({
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
