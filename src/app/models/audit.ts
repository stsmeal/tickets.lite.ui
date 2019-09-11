import { User } from './user';

export class Audit {
    _id: string;
    userCreated: User;
    dateCreated: Date;
    userUpdated: User;
    dateUpdated: Date;
}