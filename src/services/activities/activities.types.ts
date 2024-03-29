import { EqualityData } from "@mtfh/common/lib/api/equality-information/v1";
import { Person } from "@mtfh/common/lib/api/person/v1";
import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import { HouseholdMember } from "@mtfh/common/lib/api/tenure/v1";

export type ActivityType = "create" | "update" | "delete" | "migrate" | "end";
export type ActivityTargetType =
  | "process"
  | "person"
  | "asset"
  | "tenure"
  | "contactDetails"
  | "tenurePerson"
  | "personEqualityInformation"
  | "cautionaryAlert"
  | "patchesAndAreas";

export type EntityType = "person" | "tenure" | "process" | "property";
export type ActivityProcessName = "soletojoint";

interface AuthorDetails {
  id: string;
  fullName: string;
  email: string;
}
type Nullable<T> = { [K in keyof T]: T[K] | null };

export type PersonEqualityDataActivityData = Partial<Nullable<EqualityData>>;
export type PersonActivityData = Partial<Nullable<Person>>;
export type TenurePersonActivityData = {
  householdMembers: HouseholdMember[];
};
export type ProcessActivityData = {
  processData: any;
};

export type ActivityData = (
  | PersonEqualityDataActivityData
  | PersonActivityData
  | TenurePersonActivityData
  | ProcessActivityData
) & {
  [key: string]: any;
};

export interface Activity {
  id: string;
  type: ActivityType;
  targetType: ActivityTargetType;
  targetId: string;
  sourceDomain?: string;
  createdAt: any;
  timeToLiveForRecordInDays: number;
  oldData: ActivityData | null;
  newData: ActivityData | null;
  authorDetails: AuthorDetails;
}

export interface ActivityChangeRecord {
  targetType: ActivityTargetType;
  oldData: ActivityData;
  newData: ActivityData;
  referenceData?: Record<string, ReferenceData[]>;
}
