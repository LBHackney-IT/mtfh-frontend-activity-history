import { Person } from '../';
export type ActivityType = 'create' | 'update' | 'delete' | 'migrate';
export type ActivityTargetType = 'person' | 'asset' | 'tenure';

interface AuthorDetails {
    id: string;
    fullName: string;
    email: string;
}
type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface Activity {
    id: string;
    type: ActivityType;
    targetType: ActivityTargetType;
    targetId: string;
    createdAt: any;
    timeToLiveForRecordInDays: number;
    oldData: Partial<Nullable<Person>> | null;
    newData: Partial<Nullable<Person>> | null;
    authorDetails: AuthorDetails;
}
