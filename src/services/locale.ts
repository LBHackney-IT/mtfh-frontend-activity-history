import { format, parseISO } from "date-fns";

import { ActivityData, ActivityProcessName, ActivityTargetType } from "./activities";
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
    tableBy: "By",
    tableDate: "date",
    tableCaseDetails: "Case details",
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
      process: "Process",
      person: "Person",
      contactDetails: "Contact detail",
      tenure: "Tenure",
      asset: "Asset",
      tenurePerson: "Person",
      personEqualityInformation: "Equality information",
    },
    entityCreated: (type: ActivityTargetType, sourceDomain: string): string => {
      return sourceDomain === "Processes"
        ? sourceDomain
        : `${locale.activities.targetType[type]} created`;
    },
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
    tenurePaymentRef: "Tenure payment ref",
  },
  process: {
    name: {
      soletojoint: "sole to joint",
    },
    title: {
      soletojoint: "Sole tenant requests a joint tenure",
      changeofname: "Change of name",
    },
    category: {
      started: (type: ActivityTargetType): string =>
        `${locale.activities.targetType[type]} started`,
      automaticEligibilityChecks: "Automated eligibility checks",
      manualEligibilityChecks: "Manual eligibility checks",
      breachOfTenancyChecks: "Breach of Tenancy checks",
      supportingDocuments: "Supporting Documents",
      tenureInvestigation: "Tenure Investigation",
      housingOfficerReview: "Housing Officer Review",
      applicationOutcome: "Application outcome",
      signingOfNewTenancy: "Signing of new Tenancy",
      processCompleted: "Process completed",
      processCancelled: "Process cancelled",
      processClosed: "Process closed",
      caseReassigned: "Case Reassigned",
      commentAdded: "Comment Added",
      nameSubmitted: "Name submitted",
    },
    details: {
      started: (processName: string): string => {
        return `New ${processName} request started`;
      },
      automaticEligibilityChecks: (processName: string, state: string): string => {
        if (state === "AutomatedChecksPassed") {
          return `${processName}: Automatic Eligibility Checks passed`;
        }
        return `${processName}: closed: Automatic Eligibility Checks failed`;
      },
      manualEligibilityChecks: (processName: string, state: string): string => {
        if (state === "ManualChecksPassed") {
          return `${processName}: Manual Eligibility Checks passed`;
        }
        return `${processName}: closed: Manual Eligibility Checks failed`;
      },
      breachOfTenancyChecks: (processName: string, state: string): string => {
        if (state === "BreachChecksPassed") {
          return `${processName}: Breach of Tenancy Checks passed`;
        }
        return `${processName}: closed: Breach of Tenancy Checks failed`;
      },
      supportingDocuments: (
        processName: string,
        newData: ActivityData,
        oldData: ActivityData,
      ): string => {
        if (newData.state === "DocumentsRequestedDes") {
          return `${processName}: Supporting Documents requested through the Document Evidence Store`;
        }
        if (newData.state === "DocumentsRequestedAppointment") {
          const { date, time } = formatDate(newData.stateData.appointmentDateTime);
          return `${processName}: Supporting Documents requested via an office appointment on ${date} at ${time}`;
        }
        if (newData.state === "DocumentsAppointmentRescheduled") {
          const { date, time } = formatDate(newData.stateData.appointmentDateTime);
          return `${processName}: Supporting Documents office appointment missed and rescheduled to ${date} at ${time}`;
        }
        if (newData.state === "DocumentChecksPassed") {
          if (
            ["DocumentsRequestedAppointment", "DocumentsAppointmentRescheduled"].includes(
              oldData.state,
            )
          ) {
            return `${processName}: Supporting Documents Approved and uploaded to the Document Evidence Store`;
          }
          return `${processName}: Supporting Documents Approved on the Document Evidence Store`;
        }
        return `${processName}: closed: Supporting Document Checks failed`;
      },
      supportingDocumentsUpdate: (
        processName: string,
        appointmentDateTime: string,
      ): string => {
        const { date, time } = formatDate(appointmentDateTime);
        return `${processName}: Supporting Documents office appointment changed to ${date} at ${time}`;
      },
      tenureInvestigation: (processName: string, state: string): string => {
        if (
          [
            "TenureInvestigationPassed",
            "TenureInvestigationFailed",
            "TenureInvestigationPassedWithInt",
          ].includes(state)
        ) {
          return `${processName}: Tenure Investigation Completed`;
        }
        return `${processName}: Submitted for Tenure Investigation`;
      },
      housingOfficerReview: (
        processName: string,
        newData: ActivityData,
        oldData: ActivityData,
      ): string => {
        if (newData.state === "InterviewScheduled") {
          const { date, time } = formatDate(newData.stateData.appointmentDateTime);
          return `${processName}: Follow-up Interview date scheduled for ${date} at ${time}`;
        }
        if (newData.state === "InterviewRescheduled") {
          const { date, time } = formatDate(newData.stateData.appointmentDateTime);
          if (oldData.state === "InterviewRescheduled") {
            return `${processName}: Follow-up interview date changed to ${date} at ${time}`;
          }
          if (oldData.state === "InterviewScheduled") {
            return `${processName}: Follow-up Interview missed and rescheduled to ${date} at ${time}`;
          }
        }
        if (newData.state === "") {
          return `${processName}: closed: Follow-up interview missed.`;
        }
        return `${processName}: closed: Rescheduled follow-up interview missed.`;
      },
      applicationOutcome: (processName: string, state: string): string => {
        if (state === "HOApprovalPassed") {
          return `${processName}: Application approved`;
        }
        return `${processName}: closed: Application declined`;
      },
      signingOfNewTenancy: (
        processName: string,
        newData: ActivityData,
        oldData: ActivityData,
      ): string => {
        const { date, time } = formatDate(newData.stateData.appointmentDateTime);
        if (
          newData.state === "TenureAppointmentScheduled" &&
          oldData.state !== "TenureAppointmentRescheduled"
        ) {
          if (oldData.state === "TenureAppointmentScheduled") {
            return `${processName}: Tenancy signing appointment changed to ${date} at ${time}`;
          }
          return `${processName}: Tenancy signing appointment scheduled for ${date} at ${time}`;
        }

        if (oldData.state === "TenureAppointmentRescheduled") {
          return `${processName}: closed: Tenancy signing appointment missed more than once.`;
        }
        return `${processName}: Tenancy signing appointment missed and rescheduled to ${date} at ${time}`;
      },
      processCompleted: (processName: string, newData: ActivityData): string => {
        if (newData.state === "TenureUpdated") {
          return `${processName} completed: New tenure created`;
        }
        return `${processName} completed: Tenant's name updated`;
      },
      processCancelled: (processName: string, newData: ActivityData): string => {
        const comment = newData.stateData?.comment;
        return `${processName} cancelled${comment ? `:\n${comment}` : ""}`;
      },
      processClosed: (processName: string, newData: ActivityData): string => {
        const reason = newData.stateData?.Reason;
        return `${processName} closed${reason ? `:\n${reason}` : ""}`;
      },
      caseReassigned: (processName: string): string => {
        return `${processName}: Case reassigned from [officer] to [officer]`;
      },
      nameSubmitted: (processName: string): string => {
        return `${processName}: Request submitted`;
      },
    },
    mapDetails: (
      processName: ActivityProcessName,
      targetType: ActivityTargetType,
      type: string,
      newData: ActivityData,
      oldData: ActivityData,
    ): { category: string; details: string } => {
      const mappedProcessName = {
        soletojoint: "Sole to Joint",
        changeofname: "Change of Name",
      }[processName];
      let category = type;
      let details = newData.state;
      if (type === "create") {
        category = locale.process.category.started(targetType);
        details = locale.process.details.started(mappedProcessName);
      }
      if (type === "update" && !newData.state) {
        if (newData.processData?.formData.appointmentDateTime) {
          category = locale.process.category.supportingDocuments;
          details = locale.process.details.supportingDocumentsUpdate(
            mappedProcessName,
            newData.processData.formData.appointmentDateTime,
          );
        }
      }
      if (["AutomatedChecksPassed", "AutomatedChecksFailed"].includes(newData.state)) {
        category = locale.process.category.automaticEligibilityChecks;
        details = locale.process.details.automaticEligibilityChecks(
          mappedProcessName,
          newData.state,
        );
      }
      if (["ManualChecksPassed", "ManualChecksFailed"].includes(newData.state)) {
        category = locale.process.category.manualEligibilityChecks;
        details = locale.process.details.manualEligibilityChecks(
          mappedProcessName,
          newData.state,
        );
      }
      if (["BreachChecksPassed", "BreachChecksFailed"].includes(newData.state)) {
        category = locale.process.category.breachOfTenancyChecks;
        details = locale.process.details.breachOfTenancyChecks(
          mappedProcessName,
          newData.state,
        );
      }
      if (
        [
          "DocumentsRequestedDes",
          "DocumentsRequestedAppointment",
          "DocumentsAppointmentRescheduled",
          "DocumentChecksPassed",
        ].includes(newData.state)
      ) {
        category = locale.process.category.supportingDocuments;
        details = locale.process.details.supportingDocuments(
          mappedProcessName,
          newData,
          oldData,
        );
      }
      if (
        [
          "TenureInvestigationPassed",
          "TenureInvestigationFailed",
          "TenureInvestigationPassedWithInt",
          "ApplicationSubmitted",
        ].includes(newData.state)
      ) {
        category = locale.process.category.tenureInvestigation;
        details = locale.process.details.tenureInvestigation(
          mappedProcessName,
          newData.state,
        );
      }
      if (["InterviewScheduled", "InterviewRescheduled"].includes(newData.state)) {
        category = locale.process.category.housingOfficerReview;
        details = locale.process.details.housingOfficerReview(
          mappedProcessName,
          newData,
          oldData,
        );
      }
      if (["HOApprovalPassed", "HOApprovalFailed"].includes(newData.state)) {
        category = locale.process.category.applicationOutcome;
        details = locale.process.details.applicationOutcome(
          mappedProcessName,
          newData.state,
        );
      }
      if (
        ["TenureAppointmentScheduled", "TenureAppointmentRescheduled"].includes(
          newData.state,
        )
      ) {
        category = locale.process.category.signingOfNewTenancy;
        details = locale.process.details.signingOfNewTenancy(
          mappedProcessName,
          newData,
          oldData,
        );
      }
      if (newData.state === "ProcessClosed") {
        category = locale.process.category.processClosed;
        details = locale.process.details.processClosed(mappedProcessName, newData);
      }
      if (newData.state === "ProcessCancelled") {
        category = locale.process.category.processCancelled;
        details = locale.process.details.processCancelled(mappedProcessName, newData);
      }
      if (["TenureUpdated", "NameUpdated"].includes(newData.state)) {
        category = locale.process.category.processCompleted;
        details = locale.process.details.processCompleted(mappedProcessName, newData);
      }
      if (newData.state === "NameSubmitted") {
        category = locale.process.category.nameSubmitted;
        details = locale.process.details.nameSubmitted(mappedProcessName);
      }
      return { category, details };
    },
  },
  errors: {
    unexpectedResponse: "There was a problem with completing the action",
    unexpectedResponseDescription:
      "Please try again. If the issue persists, please contact support.",
    unableToFetchRecord: "There was a problem retrieving the record",
    unableToFetchRecordDescription:
      "Please try again. If the issue persists, please contact support.",
  },
};

const formatDate = (dateString: string): { date: string; time: string } => {
  const date = new Date(dateString);
  const dateFormatted = format(date, "dd/MM/yyyy");
  const timeFormatted = format(date, "hh:mm");
  return { date: dateFormatted, time: timeFormatted };
};

export default locale;
