import React from "react";

import { mockAssetV1, render, server } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";

import { ActivitiesPropertyView } from ".";

import * as auth from "@mtfh/common/lib/auth/auth";

import { locale } from "@services";

const assetData = {
  id: "15adc44b-6fde-46e8-af9c-e18b1495c9ab",
  assetId: "100021045676",
  areaId: "7c9790a5-ea4d-4819-bcdb-0a10094b7166",
  patchId: "a6809b57-9ba9-4a7d-bf14-f3a1182ca994",
  assetType: "LettableNonDwelling",
  rootAsset: null,
  parentAssetIds: null,
  isActive: false,
  assetLocation: null,
  assetAddress: {
    uprn: "100021045676",
    addressLine1: "51 GREENWOOD ROAD - FLAT B",
    addressLine2: "",
    addressLine3: "",
    addressLine4: "",
    postCode: "E8 1QT",
    postPreamble: "X",
  },
  assetManagement: {
    agent: null,
    areaOfficeName: null,
    isCouncilProperty: false,
    managingOrganisation: null,
    managingOrganisationId: "00000000-0000-0000-0000-000000000000",
    owner: null,
    isTMOManaged: false,
    propertyOccupiedStatus: null,
    propertyOccupiedStatusReason: null,
    isNoRepairsMaintenance: false,
    councilTaxType: null,
    councilTaxLiability: null,
    isTemporaryAccomodation: true,
    readyToLetDate: false,
  },
  assetCharacteristics: null,
  tenure: {
    id: "387ddd25-5b10-452d-ba44-1cfac0583075",
    type: "Asylum Seeker",
    startOfTenureDate: "2011-01-01T00:00:00Z",
  },
  versionNumber: 18,
};

beforeEach(() => {
  jest.resetAllMocks();

  jest.spyOn(auth, "isAuthorisedForGroups").mockReturnValue(true);

  server.use(
    rest.get("/api/v1/assets/:id", (req, res, ctx) => {
      return res(ctx.json(assetData));
    }),
  );
});

test("renders the activities view", async () => {
  const { container } = render(<ActivitiesPropertyView entityType="property" />, {
    url: `/activities/property/${mockAssetV1.id}`,
    path: "/activities/property/:id",
  });

  expect(container).toMatchSnapshot();

  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );
});
