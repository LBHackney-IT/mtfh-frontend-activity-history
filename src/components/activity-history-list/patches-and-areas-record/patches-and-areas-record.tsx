import React, { ComponentPropsWithoutRef, useMemo } from "react";

import {
  Activity,
  PatchResponsibilityEntityActivityData,
} from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { formattedDate } from "../utils";

import { locale } from "@services";

const { activities } = locale;
const { entityEdited } = activities;

interface PatchesAndAreasActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  patchesAndAreasRecord: Activity;
}

// const filterProperties = (data?: PatchResponsibilityEntityActivityData | null) => {
//   if (!data) return {};
//   const {
//     name,
//     responsibleType,
//     contactDetails,
//   } = data;
//   return {
//     name,
//     responsibleType,
//     contactDetails,
//   };
// };

export const PatchesAndAreasActivityRecord = ({
  patchesAndAreasRecord,
  ...props
}: PatchesAndAreasActivityRecordProps): JSX.Element | null => {
  const {
    type,
    targetType,
    oldData: oldDataActivity,
    newData: newDataActivty,
  } = patchesAndAreasRecord;

  // const oldData = useMemo(
  //   () => filterProperties(oldDataActivity as PatchResponsibilityEntityActivityData),
  //   [oldDataActivity],
  // );
  // const newData = useMemo(
  //   () => filterProperties(newDataActivty as PatchResponsibilityEntityActivityData),
  //   [newDataActivty],
  // );

  const oldData = useMemo(() => oldDataActivity || {}, [oldDataActivity]);
  const newData = useMemo(() => newDataActivty || {}, [newDataActivty]);

  const date = formattedDate(patchesAndAreasRecord.createdAt);
  const category = entityEdited(patchesAndAreasRecord.targetType);
  const edittedBy = patchesAndAreasRecord.authorDetails.fullName;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "update":
        console.log("targetType: " + targetType);
        return (
          <UpdatedPatchesAndAreasRecord
            targetType="patchesAndAreas"
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

interface UpdatedPatchesAndAreasRecordProps {
  targetType: string;
  oldData: PatchResponsibilityEntityActivityData;
  newData: PatchResponsibilityEntityActivityData;
}
const UpdatedPatchesAndAreasRecord = ({
  targetType,
  oldData,
  newData,
}: any): JSX.Element => (
  <>
    <b>{entityEdited(targetType)}</b>
    <p>Old Name: {oldData?.name}</p>
    <p>Old Email: {oldData?.contactDetails?.emailAddress}</p>
    <p>New Name: {newData?.name}</p>
    <p>New Email: {newData?.contactDetails?.emailAddress}</p>
  </>
);
