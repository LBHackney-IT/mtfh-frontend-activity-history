import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { Activity, TenurePersonActivityData } from "../../../services/activities";
import { ActivityRecordItem } from "../activity-record-item";
import { MigratedEntityRecord, formattedDate } from "../utils";

import { HouseholdMember } from "@mtfh/common/lib/api/tenure/v1";

import { locale } from "@services";

const {
  activities: {
    tenurePerson,
    entityEdited,
    personAddedToTenure,
    personRemovedFromTenure,
    personAddedDetailsTitle,
    personRemovedDetailsTitle,
  },
} = locale;

interface TenurePersonActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  tenurePersonRecord: Activity;
}

const getHouseholdMemberChanged = (
  newData: TenurePersonActivityData,
  oldData: TenurePersonActivityData,
): HouseholdMember | undefined => {
  const oldDataMemberIds = oldData.householdMembers.map((member) => member.id);
  const newDataMemberIds = newData.householdMembers.map((member) => member.id);
  const householdMemberIdChanged = oldDataMemberIds
    .filter((oldMemberId) => !newDataMemberIds.includes(oldMemberId))
    .concat(
      newDataMemberIds.filter((newMemberId) => !oldDataMemberIds.includes(newMemberId)),
    )[0];
  return newDataMemberIds.includes(householdMemberIdChanged)
    ? newData.householdMembers.find((member) => member.id === householdMemberIdChanged)
    : oldData.householdMembers.find((member) => member.id === householdMemberIdChanged);
};

export const TenurePersonActivityRecord = ({
  tenurePersonRecord,
  ...props
}: TenurePersonActivityRecordProps): JSX.Element | null => {
  const {
    oldData: oldDataActivity,
    newData: newDataActivty,
    type,
    targetType,
    createdAt,
    authorDetails,
  } = tenurePersonRecord;

  const oldData = (oldDataActivity || {
    householdMembers: [],
  }) as TenurePersonActivityData;
  const newData = (newDataActivty || {
    householdMembers: [],
  }) as TenurePersonActivityData;

  const date = formattedDate(createdAt);
  const category =
    type === "create"
      ? personAddedToTenure
      : type === "delete"
      ? personRemovedFromTenure
      : entityEdited(targetType);
  const edittedBy = authorDetails.fullName;
  const householdMemberChanged = getHouseholdMemberChanged(newData, oldData);

  const activityRecord = useMemo(() => {
    if (type === "migrate") return <MigratedEntityRecord targetType={targetType} />;
    if (!householdMemberChanged) return null;
    if (type === "create")
      return (
        <PersonAddedOrRemoved
          title={personAddedDetailsTitle}
          householdMemberChanged={householdMemberChanged}
        />
      );
    if (type === "delete")
      return (
        <PersonAddedOrRemoved
          title={personRemovedDetailsTitle}
          householdMemberChanged={householdMemberChanged}
        />
      );

    return null;
  }, [targetType, type, householdMemberChanged]);

  if (!householdMemberChanged) return null;

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

interface PersonAddedOrRemovedProps {
  title: string;
  householdMemberChanged: HouseholdMember & { [key: string]: any };
}

const PersonAddedOrRemoved = ({
  title,
  householdMemberChanged,
}: PersonAddedOrRemovedProps): JSX.Element => (
  <div>
    {title}
    {Object.entries(tenurePerson).map(([tenurePersonKey, tenurePersonVal], index) => (
      <p key={index}>
        {tenurePersonVal.field}{" "}
        <b>{tenurePersonVal.output(householdMemberChanged[tenurePersonKey])}</b>
      </p>
    ))}
  </div>
);
