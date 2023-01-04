import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { Activity, ActivityChangeRecord } from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { MigratedEntityRecord, UpdatedEntityRecord, formattedDate } from "../utils";

import { locale } from "@services";

const { activities } = locale;
const { addedLabel, cautionaryAlert, entityEdited, removedLabel } = activities;
const { contactType } = cautionaryAlert;

interface CautionaryAlertActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  cautionartAlertRecord: Activity;
}

export const CautionaryAlertActivityRecord = ({
  cautionartAlertRecord,
  ...props
}: CautionaryAlertActivityRecordProps): JSX.Element | null => {
  const {
    oldData: oldDataActivity,
    newData: newDataActivty,
    type,
    targetType,
  } = cautionartAlertRecord;

  const oldData = useMemo(() => oldDataActivity || {}, [oldDataActivity]);
  const newData = useMemo(() => newDataActivty || {}, [newDataActivty]);

  const date = formattedDate(cautionartAlertRecord.createdAt);
  const category = entityEdited(cautionartAlertRecord.targetType);
  const edittedBy = cautionartAlertRecord.authorDetails.fullName;

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

const CreatedCautionaryAlertRecord = ({ newData }: ActivityChangeRecord): JSX.Element => (
  <div>
    <p>
      <b>{contactType(newData.contactType)}</b>
    </p>
    <p>
      {addedLabel} <b>{newData.value}</b>
    </p>
  </div>
);