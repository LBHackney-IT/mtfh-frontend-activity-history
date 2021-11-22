import { format, parseISO } from "date-fns";

import { ActivityTargetType } from "./activities";
import { ContactType } from "./contact-details";

import {
  CaringResponsibilities,
  Ethnicity,
  Gender,
  PregnancyOrMaternity,
  ReligionOrBelief,
  SexualOrientation,
} from "@mtfh/common/lib/api/equality-information/v1";
import { Identification, Language } from "@mtfh/common/lib/api/person/v1";
import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import { TenureType } from "@mtfh/common/lib/api/tenure/v1";

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
      personEqualityInformation: "Equality information",
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
    genderDifferentToBirthSex: "gender different to birth sex",
    personEqualityInformation: {
      gender: {
        field: "Gender",
        output: (
          value: Gender,
          referenceData: Record<string, ReferenceData[]>,
        ): string => {
          const hasAnyDetails = value?.genderValue || value?.genderDifferentToBirthSex;

          if (!hasAnyDetails) return locale.activities.noEntryLabel;

          let label = "";

          if (value.genderValue === "o") {
            label += value.genderValueIfOther || "Other";
          }

          if (value.genderValue !== "o") {
            label +=
              referenceData["gender"].find((item) => item.code === value.genderValue)
                ?.value || value.genderValue;
          }

          if (value.genderDifferentToBirthSex) {
            label += ` (${locale.activities.genderDifferentToBirthSex}: ${
              referenceData["answers"].find(
                (item) => item.code === value.genderDifferentToBirthSex,
              )?.value || value.genderDifferentToBirthSex
            })`;
          }

          return label;
        },
      },
      religionOrBelief: {
        field: "Religion or Belief",
        output: (
          value: ReligionOrBelief,
          referenceData: Record<string, ReferenceData[]>,
        ): string => {
          if (!value?.religionOrBeliefValue) return locale.activities.noEntryLabel;

          if (value.religionOrBeliefValue === "other") {
            return value.religionOrBeliefValueIfOther || "Other";
          }

          const label = referenceData["religion-belief"].find(
            (item) => item.code === value.religionOrBeliefValue,
          )?.value;

          return label || value.religionOrBeliefValue;
        },
      },
      ethnicity: {
        field: "Ethnicity",
        output: (
          value: Ethnicity,
          referenceData: Record<string, ReferenceData[]>,
        ): string => {
          if (!value?.ethnicGroupValue) return locale.activities.noEntryLabel;

          if (value.ethnicGroupValue === "other") {
            return value.ethnicGroupValueIfOther || "Other";
          }

          const label = referenceData["ethnic-group-a"].find(
            (item) => item.code === value.ethnicGroupValue,
          )?.value;

          return label || value.ethnicGroupValue;
        },
      },
      sexualOrientation: {
        field: "Sexual Orientation",
        output: (
          value: SexualOrientation,
          referenceData: Record<string, ReferenceData[]>,
        ): string => {
          if (!value?.sexualOrientationValue) return locale.activities.noEntryLabel;

          if (value.sexualOrientationValue === "other") {
            return value.sexualOrientationValueIfOther || "Other";
          }

          const label = referenceData["sexual-orientation"].find(
            (item) => item.code === value.sexualOrientationValue,
          )?.value;

          return label || value.sexualOrientationValue;
        },
      },
      ageGroup: {
        field: "Age Group",
        output: (
          value: string,
          referenceData: Record<string, ReferenceData[]>,
        ): string => {
          if (!value) return locale.activities.noEntryLabel;
          const label = referenceData["age-bracket"].find(
            (item) => item.code === value,
          )?.value;
          return label || value;
        },
      },
      pregnancyOrMaternity: {
        field: "Pregnancy or Maternity",
        output: (value: PregnancyOrMaternity[]): string => {
          if (!value?.length || !value[0].pregnancyDate)
            return locale.activities.noEntryLabel;
          return format(parseISO(value[0].pregnancyDate), "dd/MM/yy");
        },
      },
      disabled: {
        field: "Disabled",
        output: (
          value: string,
          referenceData: Record<string, ReferenceData[]>,
        ): string => {
          if (!value) return locale.activities.noEntryLabel;
          const label = referenceData["answers"].find(
            (item) => item.code === value,
          )?.value;
          return label || value;
        },
      },
      caringResponsibilities: {
        field: "Caring Responsibilities",
        output: (
          value: CaringResponsibilities,
          referenceData: Record<string, ReferenceData[]>,
        ): string => {
          if (!value?.provideUnpaidCare) return locale.activities.noEntryLabel;
          const label = referenceData["answers"].find(
            (item) => item.code === value.provideUnpaidCare,
          )?.value;
          return label || value.provideUnpaidCare;
        },
      },
    },
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
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      middleName: {
        field: "Middle name",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      surname: {
        field: "Last name",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      preferredTitle: {
        field: "Preferred title",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      preferredFirstName: {
        field: "Preferred first name",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      preferredMiddleName: {
        field: "Preferred middle name",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      preferredSurname: {
        field: "Preferred last name",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      placeOfBirth: {
        field: "Place of birth",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
      },
      dateOfBirth: {
        field: "Date of birth",
        output: (value: string): string => format(parseISO(value), "dd/MM/yy"),
      },
      gender: {
        field: "Gender",
        output: (value: string): string => value ?? locale.activities.noEntryLabel,
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
          return value?.description ?? locale.activities.noEntryLabel;
        },
      },
      isActive: {
        field: "Tenure status",
        output: (value: boolean): string => (value ? "Active" : "Inactive"),
      },
      startOfTenureDate: {
        field: "Start date",
        output: (value: string): string => {
          if (!value) return locale.activities.noEntryLabel;
          return format(parseISO(value), "dd/MM/yy");
        },
      },
      endOfTenureDate: {
        field: "End date",
        output: (value: string): string => {
          if (!value) return locale.activities.noEntryLabel;
          return format(parseISO(value), "dd/MM/yy");
        },
      },
    },
  },
  errors: {
    unexpectedResponse: "There was a problem with completing the action",
    unexpectedResponseDescription:
      "Please try again. If the issue persists, please contact support.",
  },
};

export default locale;
