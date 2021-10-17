import { format, parseISO } from "date-fns";

import { ContactType } from "./person";

import { ActivityTargetType, Identification, Language, TenureType } from "@services";

const locale = {
  activities: {
    pageTitle: "Activity history",
    tableDate: "date",
    tableCategory: "category",
    tableEditDetails: "edit details",
    tableEdittedBy: "edited by",
    previouslyLabel: "Previously:",
    changedToLabel: "Changed to:",
    noEntryLabel: "[No entry]",
    editToLabel: "Edit to",
    removedLabel: "Removed",
    addedLabel: "Added",
    noActivityHistory: "No activity history",
    closeButton: "Close activity history",
    targetType: {
      person: "Person",
      contactDetails: "Contact detail",
      tenure: "Tenure",
      asset: "Asset",
      tenurePerson: "Person",
    },
    entityCreated: (type: ActivityTargetType): string =>
      `${locale.activities.targetType[type]} created`,
    entityMigrated: (type: ActivityTargetType): string =>
      `${locale.activities.targetType[type]} migrated`,
    entityEdited: (type: ActivityTargetType): string =>
      `Edit to ${locale.activities.targetType[type].toLowerCase()}`,
    personAddedToTenure: "Person added to tenure",
    personRemovedFromTenure: "Person removed from tenure",
    personAddedDetailsTitle: "New person created with the following details:",
    personRemovedDetailsTitle: "The following person was removed:",
    tenurePerson: {
      personTenureType: {
        field: "Type",
        output: (value: string): string => {
          switch (value) {
            case "HouseholdMember":
              return "Household member";
            default:
              return value || locale.activities.noEntryLabel;
          }
        },
      },
      fullName: {
        field: "Name",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      dateOfBirth: {
        field: "Date of birth",
        output: (value: string): string =>
          value ? format(parseISO(value), "dd/MM/yy") : locale.activities.noEntryLabel,
      },
    },
    person: {
      title: {
        field: "Title",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      firstName: {
        field: "First name",
        output: (value: string): string => value ?? "[No entry]",
      },
      middleName: {
        field: "Middle name",
        output: (value: string): string => value ?? "[No entry]",
      },
      surname: {
        field: "Last name",
        output: (value: string): string => value ?? "[No entry]",
      },
      preferredTitle: {
        field: "Preferred title",
        output: (value: string): string => value ?? "[No entry]",
      },
      preferredFirstName: {
        field: "Preferred first name",
        output: (value: string): string => value ?? "[No entry]",
      },
      preferredMiddleName: {
        field: "Preferred middle name",
        output: (value: string): string => value ?? "[No entry]",
      },
      preferredSurname: {
        field: "Preferred last name",
        output: (value: string): string => value ?? "[No entry]",
      },
      placeOfBirth: {
        field: "Place of birth",
        output: (value: string): string => value ?? "[No entry]",
      },
      dateOfBirth: {
        field: "Date of birth",
        output: (value: string): string => format(parseISO(value), "dd/MM/yy"),
      },
      gender: {
        field: "Gender",
        output: (value: string): string => value ?? "[No entry]",
      },
      languages: {
        field: "Languages",
        output: (value: Language[]): string =>
          value.map((v) => `${v.language}${v.isPrimary ? " (primary)" : ""}`).join(", "),
      },
      identifications: {
        field: "Identitifications",
        output: (identifications: Identification[]): string =>
          identifications
            .map(
              (id) =>
                `${id.identificationType}, ${id.value} ${
                  id.isOriginalDocumentSeen ? "seen" : "not seen"
                }`,
            )
            .join(", "),
      },
    },
    contactDetails: {
      contactType: (contactTypeId: ContactType): string => {
        const contactType =
          typeof contactTypeId === "string"
            ? contactTypeId
            : `${ContactType[contactTypeId]}`;

        const caps = contactType.charAt(0).toUpperCase() + contactType.slice(1);

        return caps;
      },
      value: {
        output: (value: string): string => value,
      },
    },
    tenure: {
      tenureType: {
        field: "Tenure Type",
        output: (value: TenureType): string => {
          return value?.description ?? "[No entry]";
        },
      },
      isActive: {
        field: "Tenure status",
        output: (value: boolean): string => (value ? "Active" : "Inactive"),
      },
      startOfTenureDate: {
        field: "Start date",
        output: (value: string): string => {
          if (!value) return "[No entry]";
          return format(parseISO(value), "dd/MM/yy");
        },
      },
      endOfTenureDate: {
        field: "End date",
        output: (value: string): string => {
          if (!value) return "[No entry]";
          return format(parseISO(value), "dd/MM/yy");
        },
      },
    },
  },
};

export default locale;
