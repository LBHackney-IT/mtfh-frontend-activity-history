export type ActivityType = 'create' | 'update' | 'delete';
export type ActivityTargetType = 'person' | 'asset' | 'tenure';

export interface GetActivityHistoryRequestData {
    targetId: string;
    options?: RequestInit;
}

interface Data {
    id: string,
    title: string,
    forename: string,
    middleName: string,
    surename: string,
}

interface AuthorDetails { 
    id: string,
    fullName: string,
    email: string,
}

export interface Activity {
    id: string,
    type: ActivityType,
    targetType: ActivityTargetType,
    targetId: string,
    createdAt: any,
    timeToLiveForRecordInDays: number,
    oldData: Data,
    newData: Data,
    authorDetails: AuthorDetails
}