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

// export interface HouseholdMember {
//     id: string;
//     type: string;
//     fullName: string;
//     isResponsible: boolean;
//     dateOfBirth: string;
//     personTenureType: string;
// }

// export interface AccountType {
//     code: string;
//     description: string;
// }

// export interface Charges {
//     rent: number;
//     currentBalance: number;
//     billingFrequency: string;
//     paymentReference: string;
//     rentGroupCode: string;
//     rentGroupDescription: string;
//     serviceCharge: number;
//     otherCharges: number;
//     combinedServiceCharges: number;
//     combinedRentCharges: number;
//     tenancyInsuranceCharge: number;
//     originalRentCharge: number;
//     originalServiceCharge: number;
// }

// export interface AgreementType {
//     code: string;
//     description: string;
// }

// export interface NoticeType {
//     type: string;
//     servedDate: string;
//     expiryDate: string;
//     endDate: string;
//     effectiveDate: string;
// }

// export interface LegacyReferences {
//     name: string;
//     value: string;
// }

// export interface Tenure extends TenureSectionProps {
//     accountType: AccountType;
//     paymentReference: string;
//     householdMembers: HouseholdMember[];
//     charges: Charges;
//     tenureType: TenureType;
//     isTenanted: boolean;
//     terminated: {
//         isTerminated: boolean;
//         reasonForTermination: string;
//     };
//     successionDate: string;
//     agreementType: AgreementType;
//     subsidiaryAccountsReferences: string[];
//     masterAccountTenureReference: string;
//     evictionDate: string;
//     potentialEndDate: string;
//     notices: NoticeType[];
//     legacyReferences: LegacyReferences[];
//     rentCostCentre: string;
//     isMutualExchange: boolean;
//     informHousingBenefitsForChanges: boolean;
//     isSublet: boolean;
//     subletEndDate: string;
// }
