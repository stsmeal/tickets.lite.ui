import { Audit } from './audit';
import { User } from './user';

export class LaborCharge extends Audit {
    number: number;
    description: string;
    type: number;
    dateStarted: Date;
    dateEnded: Date;
    rate: number;
    assignment: User;
}