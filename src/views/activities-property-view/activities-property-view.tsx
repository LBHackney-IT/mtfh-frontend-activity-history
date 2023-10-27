import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Button, Link } from "@mtfh/common";
import { Asset, useAsset } from "@mtfh/common/lib/api/asset/v1";
import { ActivityHistoryList } from "@components";
import { EntityType, locale } from "@services";

const { pageTitle, closeButton } = locale.activities;

export interface EntityRequestId {
  asset: Asset;
}

const PropertyInformation = ({ asset }: EntityRequestId) => {
  return (
    <>
      <Link as={RouterLink} to={`/property/${asset.id}`} variant="back-link">
        {asset?.assetAddress.addressLine1} {asset?.assetAddress.postCode}
      </Link>
      <h1 className="lbh-heading-h1">{pageTitle}</h1>
      <h2 className="lbh-heading-h2">
        {asset?.assetAddress.addressLine1} {asset?.assetAddress.postCode}
      </h2>
    </>
  );
};

export const ActivitiesPropertyView = ({
  entityType,
}: {
  entityType: EntityType;
}): JSX.Element => {
  const { id: assetPK } = useParams<{ id: string }>();
  const { data: asset } = useAsset(assetPK);
  var patches = asset?.patches;
  if(!asset || !patches || patches?.length == 0 )
  {
    console.log(`property patches empty ${patches}`)
    return <h1>No activity history</h1>
  }
  const patchId = patches[0].id

  return (
    <div data-testid="property-activities">
      <PropertyInformation asset={asset} />
      <ActivityHistoryList targetId={patchId} entityType={entityType} />
      <Button as={RouterLink} to={`/property/${assetPK}`} variant="secondary">
        {closeButton}
      </Button>
    </div>
  );
};
