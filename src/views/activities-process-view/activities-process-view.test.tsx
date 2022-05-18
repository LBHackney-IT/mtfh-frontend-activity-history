import React from "react";

import { screen, waitFor } from "@testing-library/react";

import { routeRender } from "../../test-utils";

import { ActivitiesProcessView } from ".";

import { locale } from "@services";

test("renders the activities view", async () => {
  const processName = "soletojoint";
  const [{ container }] = routeRender(<ActivitiesProcessView activityName="process" />, {
    url: `/activities/process/${processName}/123`,
  });
  expect(container).toMatchSnapshot();

  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );
});
