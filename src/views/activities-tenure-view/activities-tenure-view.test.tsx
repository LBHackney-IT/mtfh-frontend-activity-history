import React from "react";

import { screen, waitFor } from "@testing-library/react";

import { routeRender } from "../../test-utils";

import { ActivitiesTenureView } from ".";

import { locale } from "@services";

test("renders the activities view", async () => {
  const [{ container }] = routeRender(<ActivitiesTenureView entityType="tenure" />, {
    url: "/activities/tenure/123",
  });
  expect(container).toMatchSnapshot();

  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );
});
