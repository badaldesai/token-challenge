export type Table = {
    First_Name: string;
    Last_Name: string;
    Country: string;
    email: string;
    dob: string;
    mfa: string;
    amt: number;
    createdDate: string;
    ReferredBy: string | null;
};

export type Result = {
    table: Table[],
    uniqueCountry: string[],
    uniqueMFA: string[],
    count: number
};
