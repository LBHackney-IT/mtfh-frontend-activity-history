import React, { useMemo } from "react";

import { ContactDetailsActivityRecord } from "./contact-details-record";
import { PersonEqualityInformationActivityRecord } from "./person-equality-information-record";
import { PersonActivityRecord } from "./person-record";
import { TenurePersonActivityRecord } from "./tenure-person-record";
import { TenureActivityRecord } from "./tenure-record";

import { useReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import {
  Center,
  ErrorSummary,
  SimplePagination,
  SimplePaginationButton,
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@mtfh/common/lib/components";

import { locale, useActivityHistory } from "@services";

import "./activity-history-list.styles.scss";

const { tableDate, tableCategory, tableEditDetails, tableEdittedBy, noActivityHistory } =
  locale.activities;

function NoActivityHistory() {
  return <p className="lbh-label">{noActivityHistory}</p>;
}
export interface ActivityHistoryListProps {
  targetId: string;
}

export const ActivityHistoryList = ({
  targetId,
}: ActivityHistoryListProps): JSX.Element => {
  const { data, size, setSize, error } = useActivityHistory(targetId);

  const response = useMemo(() => {
    if (!data) return null;
    return data[size - 1];
  }, [data, size]);

  const { data: referenceData, error: errorReferenceData } = useReferenceData<
    | "answers"
    | "religion-belief"
    | "age-bracket"
    | "ethnic-group-a"
    | "gender"
    | "sexual-orientation"
  >({
    category: "equality-information",
  });

  if (errorReferenceData) {
    return (
      <ErrorSummary
        id="equality-information-error"
        title={locale.errors.unexpectedResponse}
        description={locale.errors.unexpectedResponseDescription}
      />
    );
  }

  if (error?.response?.status === 404) {
    return <NoActivityHistory />;
  }

  if (!response || !referenceData) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const {
    results: activityHistory,
    paginationDetails: { nextToken },
  } = response;

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>{tableDate}</Th>
            <Th>{tableCategory}</Th>
            <Th>{tableEditDetails}</Th>
            <Th>{tableEdittedBy}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {activityHistory.map((activity, index) => {
            const { targetType } = activity;
            if (targetType === "person") {
              return <PersonActivityRecord key={index} personRecord={activity} />;
            }
            if (targetType === "contactDetails") {
              return (
                <ContactDetailsActivityRecord
                  key={index}
                  contactDetailsRecord={activity}
                />
              );
            }
            if (targetType === "tenure") {
              return <TenureActivityRecord key={index} tenureRecord={activity} />;
            }
            if (targetType === "tenurePerson") {
              return (
                <TenurePersonActivityRecord key={index} tenurePersonRecord={activity} />
              );
            }
            if (targetType === "personEqualityInformation") {
              return (
                <PersonEqualityInformationActivityRecord
                  referenceData={referenceData}
                  key={index}
                  personEqualityInformationRecord={activity}
                />
              );
            }
            return null;
          })}
        </Tbody>
      </Table>
      <SimplePagination>
        {size !== 1 && (
          <SimplePaginationButton variant="previous" onClick={() => setSize(size - 1)}>
            Previous
          </SimplePaginationButton>
        )}
        {nextToken && (
          <SimplePaginationButton variant="next" onClick={() => setSize(size + 1)}>
            Next
          </SimplePaginationButton>
        )}
      </SimplePagination>
    </div>
  );
};
