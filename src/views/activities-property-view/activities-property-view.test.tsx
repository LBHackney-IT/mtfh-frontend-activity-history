import React from "react";

import { screen, waitFor } from "@testing-library/react";

import { routeRender } from "../../test-utils";

import { ActivitiesPropertyView } from ".";

import { locale } from "@services";

test("renders the activities view", async () => {
  const [{ container }] = routeRender(<ActivitiesPropertyView entityType="property" />, {
    url: "/activities/property/123",
  });
  expect(container).toMatchSnapshot();

  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );
});
