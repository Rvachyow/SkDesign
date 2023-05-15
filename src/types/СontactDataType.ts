export interface СontactProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  description: string;
}

export interface Address {
  streetAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
}
