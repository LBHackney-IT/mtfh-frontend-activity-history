import { Activity } from "../services";

import { GetActivityHistoryByTargetIdResponse } from "services/activities/activities";

export const mockMigratedPerson: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "migrate",
  targetType: "person",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: null,
  newData: null,
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockCreatedPerson: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "create",
  targetType: "person",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: null,
  newData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    firstName: "Susanna",
    lastName: "Surname",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockUpdatedFirstName: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "update",
  targetType: "person",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    firstName: "Susan",
  },
  newData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    firstName: "Susanna",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockRemovedLastName: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "update",
  targetType: "person",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    surname: "Baker",
  },
  newData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    surname: null,
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockUpdatedIdentifications: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "update",
  targetType: "person",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    identifications: [
      {
        identificationType: "Passport",
        value: "GB03654488992",
        isOriginalDocumentSeen: true,
        linkToDocument: "string",
      },
    ],
  },
  newData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    identifications: [
      {
        identificationType: "Passport",
        value: "GB03654488992",
        isOriginalDocumentSeen: true,
        linkToDocument: "string",
      },
    ],
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockUpdatedLanguages: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "update",
  targetType: "person",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    languages: [{ language: "English", isPrimary: true }],
  },
  newData: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7",
    languages: [
      { language: "English", isPrimary: true },
      { language: "Abkhaz", isPrimary: false },
    ],
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockActivities: GetActivityHistoryByTargetIdResponse = {
  results: [mockUpdatedFirstName, mockCreatedPerson],
  paginationDetails: {
    nextToken: "string",
  },
};

export const mockCreatedPhoneNumber: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "create",
  targetType: "contactDetails",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    contactType: 0,
    description: null,
    id: "00000000-0000-0000-0000-000000000000",
    value: null,
  },
  newData: {
    contactType: 0,
    description: "phone number",
    id: "bc337b11-6f53-4081-ad6f-cfca7a8d3c2a",
    value: "07123123123",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockCreatedEmail: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "create",
  targetType: "contactDetails",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    contactType: 0,
    description: null,
    id: "00000000-0000-0000-0000-000000000000",
    value: null,
  },
  newData: {
    contactType: 1,
    description: "person email 1",
    id: "bc337b11-6f53-4081-ad6f-cfca7a8d3c2a",
    value: "email@address.com",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockRemovedPhoneNumber: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "delete",
  targetType: "contactDetails",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    contactType: 0,
    description: "phone number",
    id: "bc337b11-6f53-4081-ad6f-cfca7a8d3c2a",
    value: "07123123123",
  },
  newData: {
    contactType: 0,
    description: null,
    id: "00000000-0000-0000-0000-000000000000",
    value: null,
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockRemovedEmail: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "delete",
  targetType: "contactDetails",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    contactType: 1,
    description: "person email 1",
    id: "bc337b11-6f53-4081-ad6f-cfca7a8d3c2a",
    value: "email@address.com",
  },
  newData: {
    contactType: 0,
    description: null,
    id: "00000000-0000-0000-0000-000000000000",
    value: null,
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockUpdatedDateOfBirth: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "update",
  targetType: "person",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    dateOfBirth: "1962-04-22T00:00:00Z",
  },
  newData: {
    dateOfBirth: "1962-04-23T00:00:00",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockUpdatedPlaceOfBirth: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "update",
  targetType: "person",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    placeOfBirth: null,
  },
  newData: {
    placeOfBirth: "London",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockCreatedPhoneNumberWithContactTypeAsString: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "create",
  targetType: "contactDetails",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    contactType: "phone",
    description: null,
    id: "00000000-0000-0000-0000-000000000000",
    value: null,
  },
  newData: {
    contactType: "phone",
    description: "phone number",
    id: "bc337b11-6f53-4081-ad6f-cfca7a8d3c2a",
    value: "07123123123",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockCreatedEmailWithContactTypeAsString: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "create",
  targetType: "contactDetails",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    contactType: "email",
    description: null,
    id: "00000000-0000-0000-0000-000000000000",
    value: null,
  },
  newData: {
    contactType: "email",
    description: "person email 1",
    id: "bc337b11-6f53-4081-ad6f-cfca7a8d3c2a",
    value: "email@address.com",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockCreatedAddressWithContactTypeAsString: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "create",
  targetType: "contactDetails",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    contactType: "address",
    description: null,
    id: "00000000-0000-0000-0000-000000000000",
    value: null,
  },
  newData: {
    contactType: "address",
    description: "person email 1",
    id: "bc337b11-6f53-4081-ad6f-cfca7a8d3c2a",
    value: "An address with postcode",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockMigratedTenure: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "migrate",
  targetType: "tenure",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: null,
  newData: null,
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockCreatedTenure: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "create",
  targetType: "tenure",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: null,
  newData: {
    tenureType: { code: "A", description: "Alpha" },
    isActive: false,
    startOfTenureDate: "2021-09-19 15:12:00",
    endOfTenureDate: "2022-09-19 15:12:00",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockUpdatedTenure: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "update",
  targetType: "tenure",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    isActive: false,
  },
  newData: {
    isActive: true,
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockEdittedTenureWithInValidParam: Activity = {
  id: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  type: "update",
  targetType: "tenure",
  targetId: "6f22e9ae3e8a4e0eaf46db02eb87f8e6",
  createdAt: "2019-09-19 15:12:00",
  timeToLiveForRecordInDays: 365,
  oldData: {
    invalidParam: "oldValue",
  },
  newData: {
    invalidParam: "newValue",
  },
  authorDetails: {
    id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    fullName: "Paul Fox",
    email: "Paul.Fox@hackney.gov.uk",
  },
};

export const mockAddedPersonToTenure: Activity = {
  id: "340d1891-8d4b-407b-a4c3-5bdfcdc6e35f",
  targetId: "a14ed7c2-24a4-4998-ab80-619e81f9b5a6",
  type: "create",
  targetType: "tenurePerson",
  createdAt: "2021-09-27T13:45:13.6505067Z",
  timeToLiveForRecordInDays: 1,
  oldData: {
    householdMembers: [],
  },
  newData: {
    householdMembers: [
      {
        fullName: "Paco",
        isResponsible: false,
        dateOfBirth: "0001-01-01T00:00:00",
        personTenureType: "HouseholdMember",
        id: "1d005aae-c6d6-c6c1-89fb-5abed8a4eee1",
        type: "Person",
      },
    ],
  },
  authorDetails: {
    id: "",
    fullName: "Unai Recio",
    email: "unai.recio@hackney.gov.uk",
  },
};

export const mockRemovedPersonFromTenure: Activity = {
  id: "340d1891-8d4b-407b-a4c3-5bdfcdc6e35f",
  targetId: "a14ed7c2-24a4-4998-ab80-619e81f9b5a6",
  type: "delete",
  targetType: "tenurePerson",
  createdAt: "2021-09-27T13:45:13.6505067Z",
  timeToLiveForRecordInDays: 1,
  oldData: {
    householdMembers: [
      {
        fullName: "Paco",
        isResponsible: false,
        dateOfBirth: "0001-01-01T00:00:00",
        personTenureType: "HouseholdMember",
        id: "1d005aae-c6d6-c6c1-89fb-5abed8a4eee1",
        type: "Person",
      },
    ],
  },
  newData: {
    householdMembers: [],
  },
  authorDetails: {
    id: "",
    fullName: "Unai Recio",
    email: "unai.recio@hackney.gov.uk",
  },
};

export const mockMigratedPersonEqualityInformation: Activity = {
  id: "cd2e0e18-d675-225b-7c48-4df00fbb7971",
  targetId: "81cbaf65-096a-fa76-cb40-6085b54b9033",
  type: "migrate",
  targetType: "personEqualityInformation",
  createdAt: "2021-10-29T07:15:11",
  timeToLiveForRecordInDays: 0,
  oldData: null,
  newData: null,
  authorDetails: { id: "", fullName: "Import", email: "email@email.com" },
};
