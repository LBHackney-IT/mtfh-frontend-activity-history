import { Person } from "@mtfh/common/lib/api/person/v1";
import { HouseholdMember } from "@mtfh/common/lib/api/tenure/v1";

export type ActivityType = "create" | "update" | "delete" | "migrate";
export type ActivityTargetType =
  | "person"
  | "asset"
  | "tenure"
  | "contactDetails"
  | "tenurePerson"
  | "personEqualityInformation";

interface AuthorDetails {
  id: string;
  fullName: string;
  email: string;
}
type Nullable<T> = { [K in keyof T]: T[K] | null };

export type PersonActivityData = Partial<Nullable<Person>>;
export type TenurePersonActivityData = {
  householdMembers: HouseholdMember[];
};

type ActivityData = (PersonActivityData | TenurePersonActivityData) & {
  [key: string]: any;
};

export interface Activity {
  id: string;
  type: ActivityType;
  targetType: ActivityTargetType;
  targetId: string;
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
}
