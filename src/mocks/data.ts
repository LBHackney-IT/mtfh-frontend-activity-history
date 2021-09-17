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

export const mockCreatedPhoneNumber: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'create',
    targetType: 'contactDetails',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        contactType: 0,
        description: null,
        id: '00000000-0000-0000-0000-000000000000',
        value: null,
    },
    newData: {
        contactType: 0,
        description: 'phone number',
        id: 'bc337b11-6f53-4081-ad6f-cfca7a8d3c2a',
        value: '07123123123',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockCreatedEmail: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'create',
    targetType: 'contactDetails',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        contactType: 0,
        description: null,
        id: '00000000-0000-0000-0000-000000000000',
        value: null,
    },
    newData: {
        contactType: 1,
        description: 'person email 1',
        id: 'bc337b11-6f53-4081-ad6f-cfca7a8d3c2a',
        value: 'email@address.com',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockRemovedPhoneNumber: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'delete',
    targetType: 'contactDetails',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        contactType: 0,
        description: 'phone number',
        id: 'bc337b11-6f53-4081-ad6f-cfca7a8d3c2a',
        value: '07123123123',
    },
    newData: {
        contactType: 0,
        description: null,
        id: '00000000-0000-0000-0000-000000000000',
        value: null,
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockRemovedEmail: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'delete',
    targetType: 'contactDetails',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        contactType: 1,
        description: 'person email 1',
        id: 'bc337b11-6f53-4081-ad6f-cfca7a8d3c2a',
        value: 'email@address.com',
    },
    newData: {
        contactType: 0,
        description: null,
        id: '00000000-0000-0000-0000-000000000000',
        value: null,
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockUpdatedDateOfBirth: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'update',
    targetType: 'person',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        dateOfBirth: '1962-04-22T00:00:00Z',
    },
    newData: {
        dateOfBirth: '1962-04-23T00:00:00',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockUpdatedPlaceOfBirth: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'update',
    targetType: 'person',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        placeOfBirth: null,
    },
    newData: {
        placeOfBirth: 'London',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockCreatedPhoneNumberWithContactTypeAsString: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'create',
    targetType: 'contactDetails',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        contactType: 'phone',
        description: null,
        id: '00000000-0000-0000-0000-000000000000',
        value: null,
    },
    newData: {
        contactType: 'phone',
        description: 'phone number',
        id: 'bc337b11-6f53-4081-ad6f-cfca7a8d3c2a',
        value: '07123123123',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockCreatedEmailWithContactTypeAsString: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'create',
    targetType: 'contactDetails',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        contactType: 'email',
        description: null,
        id: '00000000-0000-0000-0000-000000000000',
        value: null,
    },
    newData: {
        contactType: 'email',
        description: 'person email 1',
        id: 'bc337b11-6f53-4081-ad6f-cfca7a8d3c2a',
        value: 'email@address.com',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockCreatedAddressWithContactTypeAsString: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'create',
    targetType: 'contactDetails',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        contactType: 'address',
        description: null,
        id: '00000000-0000-0000-0000-000000000000',
        value: null,
    },
    newData: {
        contactType: 'address',
        description: 'person email 1',
        id: 'bc337b11-6f53-4081-ad6f-cfca7a8d3c2a',
        value: 'An address with postcode',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockMigratedTenure: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'migrate',
    targetType: 'tenure',
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

export const mockCreatedTenure: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'create',
    targetType: 'tenure',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: null,
    newData: {
        tenureType: { code: 'A', description: 'Alpha' },
        isActive: false,
        startOfTenureDate: '2021-09-19 15:12:00',
        endOfTenureDate: '2022-09-19 15:12:00',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockUpdatedTenure: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'update',
    targetType: 'tenure',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        isActive: false,
    },
    newData: {
        isActive: true,
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};

export const mockEdittedTenureWithInValidParam: Activity = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    type: 'update',
    targetType: 'tenure',
    targetId: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    createdAt: '2019-09-19 15:12:00',
    timeToLiveForRecordInDays: 365,
    oldData: {
        invalidParam: 'oldValue',
    },
    newData: {
        invalidParam: 'newValue',
    },
    authorDetails: {
        id: '6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6',
        fullName: 'Paul Fox',
        email: 'Paul.Fox@hackney.gov.uk',
    },
};
