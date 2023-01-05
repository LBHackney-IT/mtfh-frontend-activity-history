import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { Activity, ActivityChangeRecord } from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { formattedDate } from "../utils";

import { locale } from "@services";

const { activities } = locale;
const { addedLabel, entityCreated, entityEdited } = activities;

interface CautionaryAlertActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  cautionaryAlertRecord: Activity;
}

export const CautionaryAlertActivityRecord = ({
  cautionaryAlertRecord,
  ...props
}: CautionaryAlertActivityRecordProps): JSX.Element | null => {
  const {
    oldData: oldDataActivity,
    newData: newDataActivty,
    type,
    targetType,
  } = cautionaryAlertRecord;

  const oldData = useMemo(() => oldDataActivity || {}, [oldDataActivity]);
  const newData = useMemo(() => newDataActivty || {}, [newDataActivty]);

  const date = formattedDate(cautionaryAlertRecord.createdAt);
  const category = entityEdited(cautionaryAlertRecord.targetType);
  const edittedBy = cautionaryAlertRecord.authorDetails.fullName;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "create":
        return (
          <CreatedCautionaryAlertRecord
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

const CreatedCautionaryAlertRecord = ({ targetType }: any): JSX.Element => (
    <p>
      <b>{entityCreated(targetType)}</b>
    </p>
);
