export type ActivityType = 'create' | 'update' | 'delete';
export type ActivityTargetType = 'person' | 'asset' | 'tenure';

interface PersonName {
    id: string;
    title: string;
    forename: string;
    middleName: string;
    surename: string;
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
    oldData: PersonName;
    newData: PersonName;
    authorDetails: AuthorDetails;
}
