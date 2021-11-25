import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { Activity, PersonEqualityDataActivityData } from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { MigratedEntityRecord, UpdatedEntityRecord, formattedDate } from "../utils";

import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";

import { locale } from "@services";

const { activities }: any = locale;
const { entityEdited, entityCreated } = activities;

interface PersonEqualityInformationActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  personEqualityInformationRecord: Activity;
  referenceData: Record<string, ReferenceData[]>;
}

const filterProperties = (data?: PersonEqualityDataActivityData | null) => {
  if (!data) return {};
  const {
    ageGroup,
    gender,
    ethnicity,
    religionOrBelief,
    pregnancyOrMaternity,
    sexualOrientation,
    disabled,
    caringResponsibilities,
  } = data;
  return {
    ageGroup,
    gender,
    ethnicity,
    religionOrBelief,
    pregnancyOrMaternity,
    sexualOrientation,
    disabled,
    caringResponsibilities,
  };
};

export const PersonEqualityInformationActivityRecord = ({
  referenceData,
  personEqualityInformationRecord,
  ...props
}: PersonEqualityInformationActivityRecordProps): JSX.Element | null => {
  const {
    type,
    targetType,
    oldData: oldDataActivity,
    newData: newDataActivty,
  } = personEqualityInformationRecord;

  const oldData = useMemo(
    () => filterProperties(oldDataActivity as PersonEqualityDataActivityData),
    [oldDataActivity],
  );
  const newData = useMemo(
    () => filterProperties(newDataActivty as PersonEqualityDataActivityData),
    [newDataActivty],
  );

  const date = formattedDate(personEqualityInformationRecord.createdAt);
  const category = entityEdited(personEqualityInformationRecord.targetType);
  const edittedBy = personEqualityInformationRecord.authorDetails.fullName;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "create":
        return <CreatedPersonEqualityRecord targetType={targetType} />;
      case "migrate":
        return <MigratedEntityRecord targetType={targetType} />;
      case "update":
        return (
          <UpdatedEntityRecord
            referenceData={referenceData}
            targetType={targetType}
            oldData={oldData}
            newData={newData}
          />
        );

      default:
        return null;
    }
  }, [type, targetType, oldData, newData, referenceData]);

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

const CreatedPersonEqualityRecord = ({ targetType }: any): JSX.Element => (
  <p>
    <b>{entityCreated(targetType)}</b>
  </p>
);
