import React from "react";

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  mockAddedPersonToTenure,
  mockCreatedAddressWithContactTypeAsString,
  mockCreatedEmail,
  mockCreatedEmailWithContactTypeAsString,
  mockCreatedPerson,
  mockCreatedPhoneNumber,
  mockCreatedPhoneNumberWithContactTypeAsString,
  mockCreatedTenure,
  mockEdittedTenureWithInValidParam,
  mockMigratedPerson,
  mockMigratedPersonEqualityInformation,
  mockMigratedTenure,
  mockRemovedEmail,
  mockRemovedPersonFromTenure,
  mockRemovedPhoneNumber,
  mockUpdatedDateOfBirth,
  mockUpdatedFirstName,
  mockUpdatedIdentifications,
  mockUpdatedLanguages,
  mockUpdatedPlaceOfBirth,
  mockUpdatedTenure,
} from "../../mocks";
import { get, routeRender } from "../../test-utils";
import { ActivityHistoryList } from "./activity-history-list";

import { locale } from "@services";

test("it renders no comments with no results", async () => {
  get("/api/activityhistory", {}, 404);
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/No activity history/);
});

test.skip("it pages the results upon clicking next and previous", async () => {
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Next/);

  get("/api/activityhistory", {
    results: [mockMigratedPerson],
    paginationDetails: {
      nextToken: null,
    },
  });
  userEvent.click(screen.getByText(/Next/));

  await screen.findByText(/Person migrated/);

  userEvent.click(screen.getByText(/Previous/));

  await screen.findByText(/First name/);
});

test("it renders correctly", () => {
  routeRender(<ActivityHistoryList targetId="123" />);
  expect(screen.getByText(/Loading/)).toBeInTheDocument();
});

test("it displays a Person created on the activity history list for a new person record", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPerson],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Person created/);
});

test("it displays a Person editted on the activity history list for a new person record", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedFirstName],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Edit to person/);
});

test("it pages the results", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPerson, mockUpdatedFirstName],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/date/);
  await screen.findByText(/category/);
  await screen.findByText(/edit details/);
  await screen.findByText(/edited by/);

  await screen.findByText(/Person created/);
});

test("it pages the results for migrated person information", async () => {
  get("/api/activityhistory", {
    results: [mockMigratedPerson],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Person migrated/);
});

test("it does not render pagination unnecessarily", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedFirstName],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await waitFor(() => expect(screen.queryByText(/Next/)).toBe(null));
});

test("it should display change in Languages", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedLanguages],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Languages/);
  await waitFor(() => expect(container).toMatchSnapshot());
});

test("it should display change in Identifications", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedIdentifications],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Identitifications/);
  await waitFor(() => expect(container).toMatchSnapshot());
});

test("it should display a row for created phone number (contactType is number)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPhoneNumber],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

  await waitFor(() => expect(container).toMatchSnapshot());
  await screen.findByText(/Added/);
  await screen.findByText(/07123123123/);
});

test("it should display a row for created email (contactType is number)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedEmail],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

  await waitFor(() => expect(container).toMatchSnapshot());
  await screen.findByText(/Added/);
  await screen.findByText(/email@address.com/);
});

test("it should display a row for removed phone number (contactType is number)", async () => {
  get("/api/activityhistory", {
    results: [mockRemovedPhoneNumber],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

  await waitFor(() => expect(container).toMatchSnapshot());

  await screen.findByText(/Removed/);
  await screen.findByText(/07123123123/);
});

test("it should display a row for removed email (contactType is number)", async () => {
  get("/api/activityhistory", {
    results: [mockRemovedEmail],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

  await waitFor(() => expect(container).toMatchSnapshot());

  await screen.findByText(/Removed/);
  await screen.findByText(/email@address.com/);
});

test("it should display a row for change in date of birth", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedDateOfBirth],
    paginationDetails: {
      nextToken: null,
    },
  });
  const [{ container }] = routeRender(<ActivityHistoryList targetId="123" />);

  await waitFor(() => expect(container).toMatchSnapshot());

  await screen.findByText(/Date of birth/);
  await screen.findByText("23/04/62");
});

test("it should display a row for change in place of birth", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedPlaceOfBirth],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Place of birth/);
  await screen.findByText(/London/);
});

test("it should display a row for created phone number (contactType is string)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedPhoneNumberWithContactTypeAsString],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Added/);

  await screen.findByText(/Phone/);

  await screen.findByText(/07123123123/);
});

test("it should display a row for created email (contactType is string)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedEmailWithContactTypeAsString],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Added/);

  await screen.findByText(/Email/);
  await screen.findByText(/email@address.com/);
});

test("it should display a row for created address (contactType is string)", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedAddressWithContactTypeAsString],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Added/);

  await screen.findByText(/Address/);
  await screen.findByText(/An address with postcode/);
});

test("it should display a row for migrated tenure", async () => {
  get("/api/activityhistory", {
    results: [mockMigratedTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Tenure migrated/);
});

test("it should display a row with parameter name if the param is not part of the updatable entity", async () => {
  get("/api/activityhistory", {
    results: [mockEdittedTenureWithInValidParam],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/invalidParam/);
});

test("it should display a row for created tenure", async () => {
  get("/api/activityhistory", {
    results: [mockCreatedTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await waitFor(() => expect(screen.queryAllByText(/Tenure created/).length).toBe(2));
});

test("it should display a row for updated tenure status (Activity) details", async () => {
  get("/api/activityhistory", {
    results: [mockUpdatedTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Active/);

  await screen.findByText(/Inactive/);
});

test("it should display a row for an added person to tenure", async () => {
  get("/api/activityhistory", {
    results: [mockAddedPersonToTenure],
    paginationDetails: {
      nextToken: null,
    },
  });
  routeRender(<ActivityHistoryList targetId="123" />);

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
  routeRender(<ActivityHistoryList targetId="123" />);

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
  routeRender(<ActivityHistoryList targetId="123" />);

  await screen.findByText(/Equality information migrated/);
});
