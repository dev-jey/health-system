import { Item } from "./Item";

export interface AuthUser {
  username: string;
  token: string;
  name: string;
  userId: number;
  userRole: Item;
  stakeholder: Item;
  hospital?: Item;
  bls_serviceprovider?: Item
}
