import { Audit } from './audit';

export class Tenant extends Audit{
    site: string;
    companyName: string;
    description: string;
    address1: string;
    address2: string;
    state: string;
    zipcode: string;
    country: string;
    accountOwnerFirstname: string;
    accountOwnerLastname: string;
    accountOwnerEmail: string;
    accountActive: boolean;
    dbName: string;
    server: string;
    port: number;
}