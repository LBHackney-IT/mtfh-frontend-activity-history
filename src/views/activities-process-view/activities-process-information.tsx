import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { ErrorSummary } from "@mtfh/common";
import { usePerson } from "@mtfh/common/lib/api/person/v1";
import { Process } from "@mtfh/common/lib/api/process/v1";
import { useTenure } from "@mtfh/common/lib/api/tenure/v1";
import { Center, Heading, Link, Spinner } from "@mtfh/common/lib/components";

import { locale } from "@services";

const { pageTitle } = locale.activities;

export const SoleToJointInformation = ({
  process,
}: {
  process: Process;
}): JSX.Element => {
  const { currentState, previousStates, targetId, processName } = process;
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

  const automatedChecksPassedState = previousStates?.find(
    (item) => item.state === "AutomatedChecksPassed",
  );

  const incomingTenantId =
    currentState?.processData?.formData?.incomingTenantId ||
    automatedChecksPassedState?.processData?.formData?.incomingTenantId;

  const incomingTenant = incomingTenantId
    ? tenure?.householdMembers.find((m) => m.id === incomingTenantId)
    : undefined;

  return (
    <>
      <h1 className="lbh-heading-h1">{pageTitle}</h1>
      <h2 className="lbh-heading-h2">
        {
          locale.process.title[
            processName.toLowerCase() as keyof typeof locale.process.title
          ]
        }
      </h2>
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

export const ChangeOfNameInformation = ({
  process,
}: {
  process: Process;
}): JSX.Element => {
  const { processName, previousStates, targetId } = process;

  const nameSubmittedState = previousStates.find(
    (previous) => previous.state === "NameSubmitted",
  );
  const newPersonData = nameSubmittedState?.processData.formData;

  const { data: person, error } = usePerson(targetId);
  if (error) {
    return (
      <ErrorSummary
        id="person-information-view"
        title={locale.errors.unableToFetchRecord}
        description={locale.errors.unableToFetchRecordDescription}
      />
    );
  }

  if (!person) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Heading variant="h1">{pageTitle}</Heading>
      <Heading variant="h2">
        {
          locale.process.title[
            processName.toLowerCase() as keyof typeof locale.process.title
          ]
        }
      </Heading>
      <Heading variant="h2">
        <Link as={RouterLink} to={`/person/${targetId}`} variant="link">
          {person.title} {person.firstName} {person.middleName} {person.surname}
        </Link>
        {newPersonData && (
          <>
            {" "}
            changing to {newPersonData.title} {newPersonData.firstName}
            {newPersonData.middleName} {newPersonData.surname}
          </>
        )}
      </Heading>
    </>
  );
};
