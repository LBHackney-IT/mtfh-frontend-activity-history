import React from "react";

import { Th, Thead, Tr } from "@mtfh/common/lib/components";

import { EntityType, locale } from "@services";

const {
  tableBy,
  tableDate,
  tableCaseDetails,
  tableCategory,
  tableEditDetails,
  tableEdittedBy,
} = locale.activities;

export const ActivityHistoryHeaders = ({
  entityType,
}: {
  entityType: EntityType;
}): JSX.Element => {
  let headers = (
    <Tr>
      <Th>{tableDate}</Th>
      <Th>{tableCategory}</Th>
      <Th>{tableEditDetails}</Th>
      <Th>{tableEdittedBy}</Th>
    </Tr>
  );
  if (entityType === "process") {
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
