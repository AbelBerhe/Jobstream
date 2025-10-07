import { AddressInfo } from "./ApplicationPayLoad";


export interface UserWithAddress {
    firstName: string;
    lastName: string;
    email: string;
    addressInfo: AddressInfo;
}