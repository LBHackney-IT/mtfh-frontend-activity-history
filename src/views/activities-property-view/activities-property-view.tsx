import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Button, Link } from "@mtfh/common";
import { useAsset } from "@mtfh/common/lib/api/asset/v1";

import { ActivityHistoryList } from "@components";
import { EntityType, locale } from "@services";

const { pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
  id: string;
}

const PropertyInformation = ({ id }: EntityRequestId) => {
  const { data: property } = useAsset(id);
  return (
    <>
      <Link as={RouterLink} to={`/property/${id}`} variant="back-link">
        {property?.assetAddress.addressLine1} {property?.assetAddress.postCode}
      </Link>
      <h1 className="lbh-heading-h1">{pageTitle}</h1>
      <h2 className="lbh-heading-h2">
        {property?.assetAddress.addressLine1} {property?.assetAddress.postCode}
      </h2>
    </>
  );
};

export const ActivitiesPropertyView = ({
  entityType,
}: {
  entityType: EntityType;
}): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  return (
    <div data-testid="property-activities">
      <PropertyInformation id={id} />
      <ActivityHistoryList targetId={id} entityType={entityType} />
      <Button as={RouterLink} to={`/property/${id}`} variant="secondary">
        {closeButton}
      </Button>
    </div>
  );
};
