import React from "react";

import { generateMockTenureV1, mockProcessV1 } from "@hackney/mtfh-test-utils";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { mockEqualityData, mockStartedProcess } from "../../mocks";
import { get, routeRender } from "../../test-utils";

import { ActivitiesProcessView } from ".";

import { locale } from "@services";

const mockProcess = {
  ...mockProcessV1,
  currentState: {
    ...mockProcessV1.currentState,
    state: "AutomatedChecksPassed",
    processData: {
      formData: {
        incomingTenantId: "543aa5cc-879c-40f7-8f25-e886ffa3ff8a",
      },
    },
  },
};

beforeEach(() => {
  get("/api/v1/reference-data", mockEqualityData);
  get("/api/v1/tenures/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19", generateMockTenureV1());
  get("/api/activityhistory", {
    results: [mockStartedProcess],
    paginationDetails: {
      nextToken: null,
    },
  });
});

test("renders the activities view processName=soletotjoint", async () => {
  get("/api/v1/process/soletojoint/123", { ...mockProcess, processName: "soletojoint" });
  const [{ container }] = routeRender(<ActivitiesProcessView entityType="process" />, {
    url: "/activities/process/soletojoint/123",
    path: "/activities/process/:processName/:id",
  });
  await waitForElementToBeRemoved(screen.queryAllByText(/Loading/));
  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );
  expect(container).toMatchSnapshot();
});

test("renders the activities view processName=changeofname", async () => {
  get("/api/v1/process/changeofname/123", {
    ...mockProcess,
    processName: "changeofname",
    previousStates: [
      {
        ...mockProcessV1.currentState,
        state: "NameSubmitted",
        processData: {
          formData: {
            firstName: "First Name",
            surname: "Surname",
            title: "Mr",
            middleName: "Middle Name",
          },
        },
      },
    ],
  });
  const [{ container }] = routeRender(<ActivitiesProcessView entityType="process" />, {
    url: "/activities/process/changeofname/123",
    path: "/activities/process/:processName/:id",
  });
  await waitForElementToBeRemoved(screen.queryAllByText(/Loading/));
  await waitFor(() =>
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent(
      locale.activities.pageTitle,
    ),
  );
  expect(container).toMatchSnapshot();
});
