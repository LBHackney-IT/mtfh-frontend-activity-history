import React from "react";

import { screen, waitFor } from "@testing-library/react";

import { routeRender } from "../../test-utils";

import { ActivitiesProcessView } from ".";

import { locale } from "@services";

test("renders the activities view", async () => {
  const [{ container }] = routeRender(<ActivitiesProcessView entityType="process" />, {
    url: "/activities/process/soletojoint/123",
    path: "/activities/process/:processName/:id",
  });

  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );
  expect(container).toMatchSnapshot();
});
