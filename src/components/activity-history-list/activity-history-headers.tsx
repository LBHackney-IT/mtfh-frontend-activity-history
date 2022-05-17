import React from "react";

import { Th, Thead, Tr } from "@mtfh/common/lib/components";

import { ActivityName, locale } from "@services";

const {
  tableBy,
  tableDate,
  tableCaseDetails,
  tableCategory,
  tableEditDetails,
  tableEdittedBy,
} = locale.activities;

export const ActivityHistoryHeaders = ({
  activityName,
}: {
  activityName: ActivityName;
}): JSX.Element => {
  let headers = (
    <Tr>
      <Th>{tableDate}</Th>
      <Th>{tableCategory}</Th>
      <Th>{tableEditDetails}</Th>
      <Th>{tableEdittedBy}</Th>
    </Tr>
  );
  if (activityName === "process") {
    headers = (
      <Tr>
        <Th>{tableDate.charAt(0).toUpperCase() + tableDate.slice(1)}</Th>
        <Th>{tableCategory.charAt(0).toUpperCase() + tableCategory.slice(1)}</Th>
        <Th>{tableCaseDetails}</Th>
        <Th>{tableBy}</Th>
      </Tr>
    );
  }
  return <Thead>{headers}</Thead>;
};
