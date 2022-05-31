import React, { ComponentPropsWithoutRef, useMemo } from "react";
import { useParams } from "react-router-dom";

import { ActivityRecordItem } from "../activity-record-item";
import { formattedDate } from "../utils";

import { Activity, ActivityProcessName, locale } from "@services";

const { process }: any = locale;

interface ProcessActivityRecordProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  processRecord: Activity;
}

export const ProcessActivityRecord = ({
  processRecord,
  ...props
}: ProcessActivityRecordProps): JSX.Element | null => {
  const { processName } = useParams<{ processName: ActivityProcessName }>();
  const {
    oldData: oldDataActivity,
    newData: newDataActivty,
    type,
    targetType,
    createdAt,
    authorDetails,
  } = processRecord;

  const oldData = useMemo(() => oldDataActivity || {}, [oldDataActivity]);
  const newData = useMemo(() => newDataActivty || {}, [newDataActivty]);

  const date = formattedDate(createdAt);
  const { category, details } = process.mapDetails(
    processName,
    targetType,
    type,
    newData,
    oldData,
  );
  const editedBy = authorDetails.fullName;

  const activityRecord = useMemo(() => {
    return <ProcessRecord details={details} />;
  }, [details]);
  return (
    <ActivityRecordItem
      {...props}
      date={date}
      category={category}
      editDetails={activityRecord}
      editedBy={editedBy}
    />
  );
};

const ProcessRecord = ({ details }: { details: string }): JSX.Element => (
  <p>
    <b>{details}</b>
  </p>
);
