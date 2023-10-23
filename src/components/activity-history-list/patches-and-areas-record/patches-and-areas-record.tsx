import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { Activity } from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { formattedDate } from "../utils";

import { locale } from "@services";

const { activities } = locale;
const { entityCreated, entityEdited } = activities;

interface PatchesAndAreasActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  patchesAndAreasRecord: Activity;
}

export const PatchesAndAreasActivityRecord = ({
  patchesAndAreasRecord,
  ...props
}: PatchesAndAreasActivityRecordProps): JSX.Element | null => {
  const {
    oldData: oldDataActivity,
    newData: newDataActivty,
    type,
    targetType,
  } = patchesAndAreasRecord;

  const oldData = useMemo(() => oldDataActivity || {}, [oldDataActivity]);
  const newData = useMemo(() => newDataActivty || {}, [newDataActivty]);

  const date = formattedDate(patchesAndAreasRecord.createdAt);
  const category = entityEdited(patchesAndAreasRecord.targetType);
  const edittedBy = patchesAndAreasRecord.authorDetails.fullName;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "update":
        return (
          <UpdatedPatchesAndAreasRecord
            targetType={targetType}
            oldData={oldData}
            newData={newData}
          />
        );
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

const UpdatedPatchesAndAreasRecord = ({ targetType }: any): JSX.Element => (
  <p>
    <b>{entityEdited(targetType)}</b>
  </p>
);
