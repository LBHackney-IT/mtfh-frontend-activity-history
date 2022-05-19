import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Button, ErrorSummary } from "@mtfh/common";
import { useProcess } from "@mtfh/common/lib/api/process/v1";
import { useTenure } from "@mtfh/common/lib/api/tenure/v1";

import { ActivityHistoryList } from "@components";
import { ActivityName, ActivityProcessName, locale } from "@services";

const { process, pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
  targetId: string;
  processName: ActivityProcessName;
}

const ProcessInformation = ({ targetId, processName }: EntityRequestId) => {
  const { data: tenure } = useTenure(targetId);
  return (
    <>
      <h1 className="lbh-heading-h1">{pageTitle}</h1>
      <h2 className="lbh-heading-h2">{process.title[processName]}</h2>
      <h2 className="lbh-heading-h2">
        {locale.activities.tenurePaymentRef} {tenure?.paymentReference}
      </h2>
      <h2 className="lbh-heading-h2">{tenure?.tenuredAsset.fullAddress}</h2>
      <h2 className="lbh-heading-h2">Tom Ogden adding Jo Ogden</h2>
    </>
  );
};

export const ActivitiesProcessView = ({
  activityName,
}: {
  activityName: ActivityName;
}): JSX.Element => {
  const { id, processName } = useParams<{
    id: string;
    processName: ActivityProcessName;
  }>();

  const { data: process, error } = useProcess({
    id,
    processName,
  });

  if (!process || error) {
    return (
      <ErrorSummary
        id="sole-to-joint-view"
        title={locale.errors.unableToFetchRecord}
        description={locale.errors.unableToFetchRecordDescription}
      />
    );
  }

  return (
    <div data-testid="process-activities">
      <ProcessInformation targetId={process.targetId} processName={processName} />
      <ActivityHistoryList targetId={id} activityName={activityName} />
      <Button as={RouterLink} to={`/processes/${processName}/${id}`} variant="secondary">
        {closeButton}
      </Button>
    </div>
  );
};
