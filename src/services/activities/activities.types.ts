import { Person } from '../';
export type ActivityType = 'create' | 'update' | 'delete';
export type ActivityTargetType = 'person' | 'asset' | 'tenure';

interface ModifiedData {
    id: string;
    title: string;
    firstName: string;
    middleName: string;
    surname: string;
}

interface AuthorDetails {
    id: string;
    fullName: string;
    email: string;
}

export interface Activity {
    id: string;
    type: ActivityType;
    targetType: ActivityTargetType;
    targetId: string;
    createdAt: any;
    timeToLiveForRecordInDays: number;
    oldData: Partial<Person>;
    newData: Partial<Person>;
    authorDetails: AuthorDetails;
}
