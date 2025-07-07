export interface UserAddress {
  id: string;
  street: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  status?: string;
  addresses: UserAddress[];
}
