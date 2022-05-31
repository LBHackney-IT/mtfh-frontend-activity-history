import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Button, ErrorSummary } from "@mtfh/common";
import { useProcess } from "@mtfh/common/lib/api/process/v1";
import { useTenure } from "@mtfh/common/lib/api/tenure/v1";
import { Center, Heading, Link, Spinner } from "@mtfh/common/lib/components";

import { ActivityHistoryList } from "@components";
import { ActivityProcessName, EntityType, locale } from "@services";

const { pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
  targetId: string;
  incomingTenantId: string | undefined;
  processName: ActivityProcessName;
}

const ProcessInformation = ({
  targetId,
  processName,
  incomingTenantId,
}: EntityRequestId) => {
  const { data: tenure, error } = useTenure(targetId);
  if (error) {
    return (
      <ErrorSummary
        id="person-information-view"
        title={locale.errors.unableToFetchRecord}
        description={locale.errors.unableToFetchRecordDescription}
      />
    );
  }

  if (!tenure) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const tenant = tenure.householdMembers.find((m) => m.isResponsible);

  const incomingTenant = incomingTenantId
    ? tenure?.householdMembers.find((m) => m.id === incomingTenantId)
    : undefined;

  return (
    <>
      <h1 className="lbh-heading-h1">{pageTitle}</h1>
      <h2 className="lbh-heading-h2">{locale.process.title[processName]}</h2>
      <h2 className="lbh-heading-h2">
        {locale.activities.tenurePaymentRef} {tenure?.paymentReference}
      </h2>
      <h2 className="lbh-heading-h2">{tenure?.tenuredAsset.fullAddress}</h2>
      {tenant && (
        <Heading variant="h2">
          <Link as={RouterLink} to={`/person/${tenant.id}`} variant="link">
            {tenant?.fullName}
          </Link>
          {incomingTenant && ` adding ${incomingTenant.fullName}`}
        </Heading>
      )}
    </>
  );
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

  const { previousStates, currentState } = process;
  const automatedChecksPassedState = previousStates?.find(
    (item) => item.state === "AutomatedChecksPassed",
  );
  const incomingTenantId =
    currentState?.processData?.formData?.incomingTenantId ||
    automatedChecksPassedState?.processData?.formData?.incomingTenantId;

  return (
    <div data-testid="process-activities">
      <ProcessInformation
        targetId={process.targetId}
        processName={processName}
        incomingTenantId={incomingTenantId}
      />
      <ActivityHistoryList targetId={id} entityType={entityType} />
      <Button as={RouterLink} to={`/processes/${processName}/${id}`} variant="secondary">
        {closeButton}
      </Button>
    </div>
  );
};
