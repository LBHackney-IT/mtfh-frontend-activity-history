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
    // languages: Language[];
    // ethnicity: string;
    // nationality: string;
    // placeOfBirth: string;
    // dateOfBirth: string;
    // identifications: Identification[];
    // communicationRequirements: string[];
    // personTypes: string[];
    // links: Link[];
    [key: string]: any;
};

type Identification = {
    identificationType: string;
    value: string;
    isOriginalDocumentSeen: boolean;
    linkToDocument: string;
};

type Language = {
    language: string;
    isPrimary: boolean;
};

type Link = {
    href: string;
    rel: string;
    endpointType: string;
};
