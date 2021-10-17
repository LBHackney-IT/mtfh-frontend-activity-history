import React, { ComponentPropsWithoutRef, useMemo } from "react";

import { ActivityRecordItem, MigratedEntityRecord, formattedDate } from "..";
import { Activity, TenurePersonActivityData } from "../../../services/activities";

import { HouseholdMember, locale } from "@services";

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

  if (!householdMemberChanged) return null;

  const activityRecord = useMemo(() => {
    switch (type) {
      case "create":
        return (
          <PersonAddedOrRemoved
            title={personAddedDetailsTitle}
            householdMemberChanged={householdMemberChanged}
          />
        );
      case "delete":
        return (
          <PersonAddedOrRemoved
            title={personRemovedDetailsTitle}
            householdMemberChanged={householdMemberChanged}
          />
        );
      case "migrate":
        return <MigratedEntityRecord targetType={targetType} />;
      default:
        return null;
    }
  }, [type, householdMemberChanged]);

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
  householdMemberChanged: HouseholdMember;
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
