import React from "react";

import { screen } from "@testing-library/react";

import App from "./app";
import { routeRender } from "./test-utils";

test("it renders activities view", async () => {
  routeRender(<App />, { url: "/activities/person/:id", path: "/" });

  await screen.findByTestId("person-activities");
});
