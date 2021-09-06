export interface TenureType {
    code: string;
    description: string;
}

export interface TenureAsset {
    id: string;
    type: string;
    fullAddress: string;
    uprn: string;
}

export interface Tenure {
    id: string;
    tenuredAsset: TenureAsset;
    startOfTenureDate: string;
    endOfTenureDate: string;
    tenureType: TenureType;
    isActive: boolean;
}
