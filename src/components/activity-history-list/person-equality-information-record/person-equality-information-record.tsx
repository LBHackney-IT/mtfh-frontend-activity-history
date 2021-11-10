import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { Activity } from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { MigratedEntityRecord, formattedDate } from "../utils";

import { locale } from "@services";

const { activities }: any = locale;
const { entityEdited } = activities;

interface PersonEqualityInformationActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  personEqualityInformationRecord: Activity;
}

export const PersonEqualityInformationActivityRecord = ({
  personEqualityInformationRecord,
  ...props
}: PersonEqualityInformationActivityRecordProps): JSX.Element | null => {
  const { type, targetType } = personEqualityInformationRecord;

  const date = formattedDate(personEqualityInformationRecord.createdAt);
  const category = entityEdited(personEqualityInformationRecord.targetType);
  const edittedBy = personEqualityInformationRecord.authorDetails.fullName;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "migrate":
        return <MigratedEntityRecord targetType={targetType} />;
      default:
        return null;
    }
  }, [type, targetType]);

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
