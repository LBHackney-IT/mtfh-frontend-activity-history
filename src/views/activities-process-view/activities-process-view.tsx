import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Button } from "@mtfh/common";

import { ActivityHistoryList } from "@components";
import { ActivityName, ActivityProcessName, locale } from "@services";

const { process, pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
  id?: string;
  processName: ActivityProcessName;
}

const ProcessInformation = ({ processName }: EntityRequestId) => {
  return (
    <>
      <h1 className="lbh-heading-h1">{pageTitle}</h1>
      <h2 className="lbh-heading-h2">{process.title[processName]}</h2>
      <h2 className="lbh-heading-h2">Tenure payment ref 00123456789</h2>
      <h2 className="lbh-heading-h2">45 Oriel Road Hackney London N16 5TT</h2>
      <h2 className="lbh-heading-h2">Tom Ogden adding Jo Ogden</h2>
    </>
  );
};

export const ActivitiesProcessView = ({
  activityName,
}: {
  activityName: ActivityName;
}): JSX.Element => {
  const { id, processName } =
    useParams<{ id: string; processName: ActivityProcessName }>();

  return (
    <div data-testid="tenure-activities">
      <ProcessInformation id={id} processName={processName} />
      <ActivityHistoryList targetId={id} activityName={activityName} />
      <Button as={RouterLink} to={`/processes/${processName}/${id}`} variant="secondary">
        {closeButton}
      </Button>
    </div>
  );
};
