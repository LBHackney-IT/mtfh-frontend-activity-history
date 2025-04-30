import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { Activity } from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { formattedDate } from "../utils";

import { usePatchOrArea } from "@mtfh/common/lib/api/patch/v1";

import { locale } from "@services";

const { activities } = locale;
const { entityEdited } = activities;

interface AssetActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  assetRecord: Activity;
}

export const AssetActivityRecord = ({
  assetRecord,
  ...props
}: AssetActivityRecordProps): JSX.Element | null => {
  const {
    type,
    targetType,
    oldData: oldDataActivity,
    newData: newDataActivty,
  } = assetRecord;

  const oldData = useMemo(() => oldDataActivity || {}, [oldDataActivity]);
  const newData = useMemo(() => newDataActivty || {}, [newDataActivty]);

  const date = formattedDate(assetRecord.createdAt);
  const category = entityEdited(assetRecord.targetType);
  const edittedBy = assetRecord.authorDetails.fullName;
  const { data: oldAssetPatch } = usePatchOrArea(oldData?.patchId);
  const { data: newAssetPatch } = usePatchOrArea(newData?.patchId);

  const activityRecord = useMemo(() => {
    switch (type) {
      case "update":
        return (
          <UpdatedAssetRecord
            targetType={targetType}
            oldAssetPatch={oldAssetPatch?.name}
            newAssetPatch={newAssetPatch?.name}
          />
        );
      default:
        return null;
    }
  }, [type, targetType, oldAssetPatch, newAssetPatch]);
  console.log("activityRecord", activityRecord);
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

const UpdatedAssetRecord = ({
  targetType,
  oldAssetPatch,
  newAssetPatch,
}: any): JSX.Element => (
  <>
    <b>{entityEdited(targetType)}</b>
    <p>Old Patch Name: {oldAssetPatch}</p>
    <p>New Patch Name: {newAssetPatch}</p>
  </>
);
