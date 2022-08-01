import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  ChangeOfNameInformation,
  SoleToJointInformation,
} from "./activities-process-information";

import { Button, ErrorSummary } from "@mtfh/common";
import { useProcess } from "@mtfh/common/lib/api/process/v1";
import { Center, Spinner } from "@mtfh/common/lib/components";

import { ActivityHistoryList } from "@components";
import { ActivityProcessName, EntityType, locale } from "@services";

const { closeButton } = locale.activities;

const processInformationComponents: Record<string, any> = {
  soletojoint: SoleToJointInformation,
  changeofname: ChangeOfNameInformation,
};

export const ActivitiesProcessView = ({
  entityType,
}: {
  entityType: EntityType;
}): JSX.Element => {
  const { id, processName } = useParams<{
    id: string;
    processName: ActivityProcessName;
  }>();

  const { data: process, error } = useProcess({
    id,
    processName,
  });

  if (error) {
    return (
      <ErrorSummary
        id="process-activity-history-view"
        title={locale.errors.unableToFetchRecord}
        description={locale.errors.unableToFetchRecordDescription}
      />
    );
  }

  if (!process) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const ProcessInformation = processInformationComponents[processName.toLowerCase()];

  return (
    <div data-testid="process-activities">
      {ProcessInformation && <ProcessInformation process={process} />}
      <ActivityHistoryList targetId={id} entityType={entityType} />
      <Button as={RouterLink} to={`/processes/${processName}/${id}`} variant="secondary">
        {closeButton}
      </Button>
    </div>
  );
};
