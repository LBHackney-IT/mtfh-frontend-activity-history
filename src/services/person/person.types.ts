export type Person = {
    id: string;
    title: string;
    firstName: string;
    middleName: string;
    surname: string;
    preferredTitle: string;
    preferredFirstName: string;
    preferredMiddleName: string;
    preferredSurname: string;
    gender: string;
    languages: Language[];
    identifications: Identification[];
    // ethnicity: string;
    // nationality: string;
    // placeOfBirth: string;
    // dateOfBirth: string;
    // communicationRequirements: string[];
    // personTypes: string[];
    // links: Link[];
    [key: string]: any;
};

export type Identification = {
    identificationType: string;
    value: string;
    isOriginalDocumentSeen: boolean;
    linkToDocument: string;
};

export type Language = {
    language: string;
    isPrimary: boolean;
};

type Link = {
    href: string;
    rel: string;
    endpointType: string;
};

export enum ContactType {
    phone = 0,
    email = 1,
    address = 2,
}
