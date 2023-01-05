import React from "react";

import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  generateMockActivity,
  mockAddedPersonToTenure,
  mockCreatedAddressWithContactTypeAsString,
  mockCreatedEmail,
  mockCreatedEmailWithContactTypeAsString,
  mockCreatedPerson,
  mockCreatedPersonEqualityInformation,
  mockCreatedPhoneNumber,
  mockCreatedPhoneNumberWithContactTypeAsString,
  mockCreatedTenure,
  mockEdittedTenureWithInValidParam,
  mockEqualityData,
  mockMigratedPerson,
  mockMigratedPersonEqualityInformation,
  mockMigratedTenure,
  mockRemovedEmail,
  mockRemovedPersonFromTenure,
  mockRemovedPhoneNumber,
  mockStartedProcess,
  mockUpdatedDateOfBirth,
  mockUpdatedFirstName,
  mockUpdatedIdentifications,
  mockUpdatedLanguages,
  mockUpdatedPersonEqualityInformation,
  mockUpdatedPlaceOfBirth,
  mockUpdatedTenure,
  mockCreatedCautionaryAlert,
} from "../../mocks";
import { get, routeRender } from "../../test-utils";

import { ActivityHistoryList } from "@components";
import { ActivityData, locale } from "@services";

beforeEach(() => {
  get("/api/v1/reference-data", mockEqualityData);
});

test("it renders no comments with no results", async () => {
  get("/api/activityhistory", {}, 404);
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/No activity history/)).resolves.toBeInTheDocument();
});

test.skip("it pages the results upon clicking next and previous", async () => {
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/Next/)).resolves.toBeInTheDocument();

  get("/api/activityhistory", {
    results: [mockMigratedPerson],
    paginationDetails: {
      nextToken: null,
    },
  });
  userEvent.click(screen.getByText(/Next/));

  await expect(screen.findByText(/Person migrated/)).resolves.toBeInTheDocument();

  userEvent.click(screen.getByText(/Previous/));

  await expect(screen.findByText(/First name/)).resolves.toBeInTheDocument();
});

test("it renders correctly", () => {
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);
  expect(screen.getByText(/Loading/)).toBeInTheDocument();
});

test("it displays a Person created on the activity history list for a new person record", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPerson],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/Person created/)).resolves.toBeInTheDocument();
});

test("it displays a Person editted on the activity history list for a new person record", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedFirstName],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/Edit to person/)).resolves.toBeInTheDocument();
});

test("it pages the results", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPerson, mockUpdatedFirstName],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/date/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/category/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/edit details/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/edited by/)).resolves.toBeInTheDocument();

  await expect(screen.findByText(/Person created/)).resolves.toBeInTheDocument();
});

test("it pages the results for migrated person information", async () => {
  get("/api/activityhistory", {
    results: [mockMigratedPerson],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/Person migrated/)).resolves.toBeInTheDocument();
});

test("it does not render pagination unnecessarily", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedFirstName],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await waitFor(() => expect(screen.queryByText(/Next/)).toBe(null));
});

test("it should display change in Languages", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedLanguages],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="person" />,
  );

  await expect(screen.findByText(/Languages/)).resolves.toBeInTheDocument();
  await waitFor(() => expect(container).toMatchSnapshot());
});

test("it should display change in Identifications", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedIdentifications],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="person" />,
  );

  await expect(screen.findByText(/Identitifications/)).resolves.toBeInTheDocument();
  await waitFor(() => expect(container).toMatchSnapshot());
});

test("it should display a row for created phone number (contactType is number)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPhoneNumber],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="person" />,
  );

  await expect(screen.findByText(/Added/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/07123123123/)).resolves.toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("it should display a row for created email (contactType is number)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedEmail],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="person" />,
  );

  await expect(screen.findByText(/Added/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/email@address.com/)).resolves.toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("it should display a row for removed phone number (contactType is number)", async () => {
  get("/api/activityhistory", {
    results: [mockRemovedPhoneNumber],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="person" />,
  );

  await expect(screen.findByText(/Removed/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/07123123123/)).resolves.toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("it should display a row for removed email (contactType is number)", async () => {
  get("/api/activityhistory", {
    results: [mockRemovedEmail],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="person" />,
  );

  await expect(screen.findByText(/Removed/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/email@address.com/)).resolves.toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("it should display a row for change in date of birth", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedDateOfBirth],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="person" />,
  );

  await expect(screen.findByText(/Date of birth/)).resolves.toBeInTheDocument();
  await expect(screen.findByText("23/04/62")).resolves.toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("it should display a row for change in place of birth", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedPlaceOfBirth],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/Place of birth/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/London/)).resolves.toBeInTheDocument();
});

test("it should display a row for created phone number (contactType is string)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPhoneNumberWithContactTypeAsString],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/Added/)).resolves.toBeInTheDocument();

  await expect(screen.findByText(/Phone/)).resolves.toBeInTheDocument();

  await expect(screen.findByText(/07123123123/)).resolves.toBeInTheDocument();
});

test("it should display a row for created email (contactType is string)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedEmailWithContactTypeAsString],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/Added/)).resolves.toBeInTheDocument();

  await expect(screen.findByText(/Email/)).resolves.toBeInTheDocument();
  await expect(screen.findByText(/email@address.com/)).resolves.toBeInTheDocument();
});

test("it should display a row for created address (contactType is string)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedAddressWithContactTypeAsString],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(screen.findByText(/Added/)).resolves.toBeInTheDocument();

  await expect(screen.findByText(/Address/)).resolves.toBeInTheDocument();
  await expect(
    screen.findByText(/An address with postcode/),
  ).resolves.toBeInTheDocument();
});

test("it should display a row for migrated tenure", async () => {
  get("/api/activityhistory", {
    results: [mockMigratedTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="tenure" />);

  await expect(screen.findByText(/Tenure migrated/)).resolves.toBeInTheDocument();
});

test("it should display a row with parameter name if the param is not part of the updatable entity", async () => {
  get("/api/activityhistory", {
    results: [mockEdittedTenureWithInValidParam],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="tenure" />);

  await expect(screen.findByText(/invalidParam/)).resolves.toBeInTheDocument();
});

test("it should display a row for created tenure", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="tenure" />);

  await waitFor(() => expect(screen.queryAllByText(/Tenure created/).length).toBe(2));
});

test("it should display a row for updated tenure status (Activity) details", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="tenure" />);

  await expect(screen.findByText(/Active/)).resolves.toBeInTheDocument();

  await expect(screen.findByText(/Inactive/)).resolves.toBeInTheDocument();
});

test("it should display a row for an added person to tenure", async () => {
  get("/api/activityhistory", {
    results: [mockAddedPersonToTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="tenure" />);

  await waitFor(() => {
    expect(screen.getByText(locale.activities.personAddedToTenure)).toBeInTheDocument();
    expect(
      screen.getByText(mockAddedPersonToTenure.newData?.householdMembers[0].fullName),
    ).toBeInTheDocument();
    expect(screen.getByText("01/01/01")).toBeInTheDocument();
    expect(screen.getByText("Household member")).toBeInTheDocument();
  });
});

test("it should display a row for a removed person from tenure", async () => {
  get("/api/activityhistory", {
    results: [mockRemovedPersonFromTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="tenure" />);

  await waitFor(() => {
    expect(
      screen.getByText(locale.activities.personRemovedFromTenure),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockRemovedPersonFromTenure.oldData?.householdMembers[0].fullName),
    ).toBeInTheDocument();
    expect(screen.getByText("01/01/01")).toBeInTheDocument();
    expect(screen.getByText("Household member")).toBeInTheDocument();
  });
});

test("it should display a row for migrated equality information", async () => {
  get("/api/activityhistory", {
    results: [mockMigratedPersonEqualityInformation],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(
    screen.findByText(/Equality information migrated/),
  ).resolves.toBeInTheDocument();
});

test("it should display a row for created equality information", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPersonEqualityInformation],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(
    screen.findByText(/Equality information created/),
  ).resolves.toBeInTheDocument();
});

test("it should display a row for updated equality information", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedPersonEqualityInformation],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="person" />,
  );

  await expect(screen.findByText("Age Group")).resolves.toBeInTheDocument();
  await expect(screen.findByText("85+")).resolves.toBeInTheDocument();
  await expect(screen.findByText("Under 16")).resolves.toBeInTheDocument();

  await expect(screen.findByText("Gender")).resolves.toBeInTheDocument();
  await expect(
    screen.findByText("Male (gender different to birth sex: No)"),
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText("Another gender (gender different to birth sex: Yes)"),
  ).resolves.toBeInTheDocument();

  await expect(screen.findByText("Ethnicity")).resolves.toBeInTheDocument();
  await expect(screen.findByText("Mixed background")).resolves.toBeInTheDocument();
  await expect(screen.findByText("Another ethnic group")).resolves.toBeInTheDocument();

  await expect(screen.findByText("Religion or Belief")).resolves.toBeInTheDocument();
  await expect(screen.findByText("Secular beliefs")).resolves.toBeInTheDocument();
  await expect(screen.findByText("Another belief")).resolves.toBeInTheDocument();

  await expect(screen.findByText("Pregnancy or Maternity")).resolves.toBeInTheDocument();
  await expect(screen.findByText("01/05/21")).resolves.toBeInTheDocument();
  await expect(screen.findByText("[No entry]")).resolves.toBeInTheDocument();

  await expect(screen.findByText("Sexual Orientation")).resolves.toBeInTheDocument();
  await expect(screen.findByText("Heterosexual")).resolves.toBeInTheDocument();
  await expect(screen.findByText("Another orientation")).resolves.toBeInTheDocument();

  await expect(screen.findByText("Disabled")).resolves.toBeInTheDocument();
  await expect(screen.findByText("Caring Responsibilities")).resolves.toBeInTheDocument();

  expect(container).toMatchSnapshot();
});

test("activity target type is null", async () => {
  get("/api/activityhistory", {
    results: [generateMockActivity({ targetType: undefined })],
    paginationDetails: {
      nextToken: null,
    },
  });

  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="process" />,
  );

  await waitForElementToBeRemoved(screen.getByText("Loading..."));
  expect(container).toMatchSnapshot();
});

test("it should display a row for started sole to joint process", async () => {
  get("/api/activityhistory", {
    results: [mockStartedProcess],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="process" />,
    {
      url: "/activities/process/soletojoint/123",
      path: "/activities/process/:processName/:id",
    },
  );

  await waitFor(() => {
    expect(screen.queryAllByText(/Process started/).length).toBe(1);
    expect(screen.getByText(/New [\w*\s]* started/)).toBeInTheDocument();
  });
  expect(container).toMatchSnapshot();
});

test.skip("it should display activity history for sole to joint process", async () => {
  get("/api/activityhistory", {
    results: [
      [{ state: "SelectTenants" }, { state: "AutomatedChecksPassed" }],
      [{ state: "SelectTenants" }, { state: "AutomatedChecksFailed" }],
      [{ state: "AutomatedChecksPassed" }, { state: "ManualChecksPassed" }],
      [{ state: "AutomatedChecksPassed" }, { state: "ManualChecksFailed" }],
      [{ state: "ManualChecksPassed" }, { state: "BreachChecksPassed" }],
      [{ state: "ManualChecksPassed" }, { state: "BreachChecksFailed" }],
      [{ state: "BreachChecksPassed" }, { state: "DocumentsRequestedDes" }],
      [
        { state: "DocumentsRequestedDes" },
        {
          state: "DocumentsRequestedAppointment",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "DocumentsRequestedAppointment" },
        {
          processData: {
            formData: { appointmentDateTime: "2022-05-29T06:26:32.6430601Z" },
          },
        },
      ],
      [
        { state: "DocumentsAppointmentRescheduled" },
        {
          state: "DocumentsAppointmentRescheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "DocumentsRequestedAppointment" },
        {
          state: "ApplicationSubmitted",
        },
      ],
      [
        { state: "ApplicationSubmitted" },
        {
          state: "TenureInvestigationPassed",
        },
      ],
      [
        { state: "TenureInvestigationPassed" },
        {
          state: "InterviewScheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "InterviewScheduled" },
        {
          state: "InterviewScheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "InterviewScheduled" },
        {
          state: "InterviewRescheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "InterviewRescheduled" },
        {
          state: "InterviewRescheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "InterviewScheduled" },
        {
          state: "HOApprovalFailed",
        },
      ],
      [
        { state: "InterviewScheduled" },
        {
          state: "HOApprovalPassed",
        },
      ],
      [
        { state: "HOApprovalPassed" },
        {
          state: "TenureAppointmentScheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "TenureAppointmentScheduled" },
        {
          state: "TenureAppointmentScheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "TenureAppointmentScheduled" },
        {
          state: "TenureAppointmentRescheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "TenureAppointmentRescheduled" },
        {
          state: "TenureAppointmentRescheduled",
          stateData: { appointmentDateTime: "2022-05-24T06:26:32.6430601Z" },
        },
      ],
      [
        { state: "TenureUpdated" },
        {
          state: "ProcessCancelled",
          stateData: { comment: "test" },
        },
      ],
      [
        { state: "TenureUpdated" },
        {
          state: "ProcessClosed",
          stateData: { reason: "test" },
        },
      ],
      [
        { state: "TenureAppointmentRescheduled" },
        {
          state: "TenureUpdated",
        },
      ],
    ].map((states: ActivityData) => {
      return generateMockActivity({
        oldData: {
          state: states[0].state,
          stateData: states[0].stateData,
        },
        newData: {
          state: states[1].state,
          stateData: states[1].stateData,
          processData: states[1].processData || {},
        },
        type: "update",
      });
    }),
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="process" />,
    {
      url: "/activities/process/soletojoint/123",
      path: "/activities/process/:processName/:id",
    },
  );

  await waitFor(() => {
    expect(screen.queryAllByText(/Manual eligibility checks/).length).toBe(2);
    expect(
      screen.getByText(/Sole to Joint: Manual Eligibility Checks passed/),
    ).toBeInTheDocument();
  });
  expect(container).toMatchSnapshot();
});

test("it should display change of name specific activity history", async () => {
  get("/api/activityhistory", {
    results: [
      [
        { state: "EnterNewName" },
        {
          state: "NameSubmitted",
        },
      ],
      [
        { state: "NameSubmitted" },
        {
          state: "NameUpdated",
        },
      ],
    ].map((states: ActivityData) => {
      return generateMockActivity({
        oldData: {
          state: states[0].state,
          stateData: states[0].stateData,
        },
        newData: {
          state: states[1].state,
          stateData: states[1].stateData,
          processData: states[1].processData || {},
        },
        type: "update",
      });
    }),
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(
    <ActivityHistoryList targetId="123" entityType="process" />,
    {
      url: "/activities/process/changeofname/123",
      path: "/activities/process/:processName/:id",
    },
  );

  await waitFor(() => {
    expect(screen.queryAllByText(/Process completed/).length).toBe(1);
    expect(screen.getByText(/Change of Name: Request submitted/)).toBeInTheDocument();
  });
  expect(container).toMatchSnapshot();
});

test.skip("it should display a row for created cautionary alert", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedCautionaryAlert],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" entityType="person" />);

  await expect(
    screen.findByText(/Cautionary alert created/),
  ).resolves.toBeInTheDocument();
});
