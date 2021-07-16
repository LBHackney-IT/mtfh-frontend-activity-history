import { GetActivityHistoryByTargetIdResponse } from 'services/activities/activities';
import { Activity, Person } from '../services';

export const mockMigratedPerson: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'migrate',
    targetType: 'person',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: null,
    newData: null,
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockCreatedPerson: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'create',
    targetType: 'person',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: null,
    newData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        firstName: 'Susanna',
        lastName: 'Surname',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockUpdatedFirstName: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'update',
    targetType: 'person',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        firstName: 'Susan',
    },
    newData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        firstName: 'Susanna',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockRemovedLastName: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'update',
    targetType: 'person',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        surname: 'Baker',
    },
    newData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        surname: null,
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockUpdatedIdentifications: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'update',
    targetType: 'person',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        identifications: [
            {
                identificationType: 'Passport',
                value: 'GB03654488992',
                isOriginalDocumentSeen: true,
                linkToDocument: 'string',
            },
        ],
    },
    newData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        identifications: [
            {
                identificationType: 'Passport',
                value: 'GB03654488992',
                isOriginalDocumentSeen: true,
                linkToDocument: 'string',
            },
        ],
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockUpdatedLanguages: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'update',
    targetType: 'person',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        languages: [{ language: 'English', isPrimary: true }],
    },
    newData: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e7',
        languages: [
            { language: 'English', isPrimary: true },
            { language: 'Abkhaz', isPrimary: false },
        ],
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockActivities: GetActivityHistoryByTargetIdResponse = {
    results: [mockUpdatedFirstName, mockCreatedPerson],
    paginationDetails: {
        nextToken: 'string',
    },
};

export const mockPerson: Person = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    title: 'Mrs',
    firstName: 'Joan',
    surname: 'Evans',
    middleName: 'M.',
    preferredTitle: 'Mrs',
    preferredFirstName: '',
    preferredMiddleName: '',
    preferredSurname: 'Fisher',
    gender: 'F',
    identifications: [
        {
            identificationType: 'NI',
            value: '1234A',
            isOriginalDocumentSeen: true,
            linkToDocument: 'string',
        },
    ],
    languages: [
        {
            language: 'English',
            isPrimary: true,
        },
    ],
    // ethnicity: 'Christian',
    // nationality: 'Canadian',
    // placeOfBirth: 'Toronto',
    // dateOfBirth: '04/03/1988',
    // communicationRequirements: ['Sign Language'],
    // personTypes: ['Housing Officer', 'Tenants'],
    // links: [
    //     {
    //         href: 'https://notesapi.hackney.gov.uk/propertynotes/[propertyId]',
    //         rel: 'notes',
    //         endpointType: 'GET',
    //     },
    // ],
};
