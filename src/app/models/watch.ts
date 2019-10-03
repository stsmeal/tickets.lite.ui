import { Audit } from './audit';
import { User } from './user';

export class Watch extends Audit{
    user: User;
    type: number;
}