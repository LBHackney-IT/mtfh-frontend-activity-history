import React from "react";

import { screen, waitFor } from "@testing-library/react";

import { routeRender } from "../../test-utils";

import { ActivitiesPersonView } from ".";

import { locale } from "@services";

test("renders the activities view", async () => {
  const [{ container }] = routeRender(<ActivitiesPersonView entityType="person" />, {
    url: "/activities/person/123",
  });
  expect(container).toMatchSnapshot();

  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );

  //     expect(screen.queryByText(/Joan Evans/)).toBeInTheDocument()
});
