import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GuidService {
    get emptyGuid(): string { return "00000000-0000-0000-0000-000000000000"; }

    public generate(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}