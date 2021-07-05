import { Activity, Person } from '../services';

export const mockActivities: Activity[] = [
    {
        id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
        type: 'create',
        targetType: 'person',
        targetId: 'TWVoZGlLaW1ha2hlCg==',
        createdAt: {},
        timeToLiveForRecordInDays: 365,
        oldData: {
            id: 'TWVoZGlLaW1ha2hlCg==',
            title: 'Mr',
            forename: 'T',
            middleName: '',
            surename: 'B',
        },
        newData: {
            id: 'TWVoZGlLaW1ha2hlCg==',
            title: 'Mr',
            forename: 'Tom',
            middleName: '',
            surename: 'Browne',
        },
        authorDetails: {
            id: 'TWVoZGlLaW1ha2hlCg==',
            fullName: 'Mary Smith',
            email: 'Mary.Smith@hackney.gov.uk',
        },
    },
];

export const mockPerson: Person = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    title: 'Mrs',
    preferredFirstname: '',
    preferredSurname: 'Fisher',
    firstName: 'Joan',
    surname: 'Evans',
    middleName: 'M.',
    ethnicity: 'Christian',
    nationality: 'Canadian',
    placeOfBirth: 'Toronto',
    dateOfBirth: '04/03/1988',
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
    communicationRequirements: ['Sign Language'],
    personTypes: ['Housing Officer', 'Tenants'],
    links: [
        {
            href: 'https://notesapi.hackney.gov.uk/propertynotes/[propertyId]',
            rel: 'notes',
            endpointType: 'GET',
        },
    ],
};
