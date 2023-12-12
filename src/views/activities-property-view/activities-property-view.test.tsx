import React from "react";

import { screen, waitFor } from "@testing-library/react";

import { routeRender } from "../../test-utils";

import { ActivitiesPropertyView } from ".";

import { locale } from "@services";
import { mockUpdatedPatchesAndAreas } from "../../mocks/data";

test("renders the activities view", async () => {
  const id = mockUpdatedPatchesAndAreas.id;
  const [{ container }] = routeRender(<ActivitiesPropertyView entityType="property" />, {
    url: `/activities/property/${id}`,
  });
  expect(container).toMatchSnapshot();

  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );
});
