import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { Activity, ActivityChangeRecord } from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { MigratedEntityRecord, UpdatedEntityRecord, formattedDate } from "../utils";

import { locale } from "@services";

const { activities } = locale;
const { addedLabel, contactDetails, entityEdited, removedLabel } = activities;
const { contactType } = contactDetails;

interface ContactDetailsActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  contactDetailsRecord: Activity;
}

export const ContactDetailsActivityRecord = ({
  contactDetailsRecord,
  ...props
}: ContactDetailsActivityRecordProps): JSX.Element | null => {
  const {
    oldData: oldDataActivity,
    newData: newDataActivty,
    type,
    targetType,
  } = contactDetailsRecord;

  const oldData = useMemo(() => oldDataActivity || {}, [oldDataActivity]);
  const newData = useMemo(() => newDataActivty || {}, [newDataActivty]);

  const date = formattedDate(contactDetailsRecord.createdAt);
  const category = entityEdited(contactDetailsRecord.targetType);
  const edittedBy = contactDetailsRecord.authorDetails.fullName;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "create":
        return (
          <CreatedContactDetailRecord
            targetType={targetType}
            oldData={oldData}
            newData={newData}
          />
        );
      case "delete":
        return (
          <DeletedContactDetailRecord
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

const CreatedContactDetailRecord = ({ newData }: ActivityChangeRecord): JSX.Element => (
  <div>
    <p>
      <b>{contactType(newData.contactType)}</b>
    </p>
    <p>
      {addedLabel} <b>{newData.value}</b>
    </p>
  </div>
);

const DeletedContactDetailRecord = ({ oldData }: ActivityChangeRecord): any => {
  return (
    <div>
      <p>
        <b>{contactType(oldData.contactType)}</b>
      </p>
      <p>
        {removedLabel} <b>{oldData.value}</b>
      </p>
    </div>
  );
};
