export interface Customer {
    id?: number;
    name: string;
    dateOfBirth: Date;
    estimatedBudget: number;
    isPremium: boolean;
    emailAddresses: string
    base64Photo: string;
}

export interface AddressCustomer {
    id?: number;
    address: string;
    location: LocationAddress;
}

export interface LocationAddress {
    type: string;
    coordinates: [number, number];
}


