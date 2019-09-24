import { Audit } from './audit';

export class Asset extends Audit {
    number: string;
    description: string;
    status: number;
    category: number;
    lifeExpectancy: number;
    lifeExpectancyScale: number;
    installDate: Date;
    condition: number;
    retiredDate: Date;
}