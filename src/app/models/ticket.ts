import { Audit } from './audit';
import { Note } from './note';
import { LaborCharge } from './labor-charge';
import { User } from './user';
import { Asset } from './asset';

export class Ticket extends Audit {
    number: number;
    description: string;
    status: number;
    category: number;
    dateCompleted: Date;
    notes: Note[] = [];
    laborCharges: LaborCharge[] = [];
    assignments: User[] = [];
    assets: Asset[] = [];
}