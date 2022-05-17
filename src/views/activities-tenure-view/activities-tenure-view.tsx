import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Button, Link } from "@mtfh/common";
import { useTenure } from "@mtfh/common/lib/api/tenure/v1";

import { ActivityHistoryList } from "@components";
import { ActivityName, locale } from "@services";

const { pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
  id: string;
}

const TenureInformation = ({ id }: EntityRequestId) => {
  const { data: tenure } = useTenure(id);
  return (
    <>
      <Link as={RouterLink} to={`/tenure/${id}`} variant="back-link">
        Tenure {tenure?.paymentReference}
      </Link>
      <h1 className="lbh-heading-h1">{pageTitle}</h1>
      <h2 className="lbh-heading-h2">
        Tenure payment reference {tenure?.paymentReference}
        <br />
        {tenure?.tenuredAsset?.fullAddress}
      </h2>
    </>
  );
};

export const ActivitiesTenureView = ({
  activityName,
}: {
  activityName: ActivityName;
}): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  return (
    <div data-testid="tenure-activities">
      <TenureInformation id={id} />
      <ActivityHistoryList targetId={id} activityName={activityName} />
      <Button as={RouterLink} to={`/tenure/${id}`} variant="secondary">
        {closeButton}
      </Button>
    </div>
  );
};
