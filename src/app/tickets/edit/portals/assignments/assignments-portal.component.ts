import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/users/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'assignments-portal',
    templateUrl: 'assignments-portal.component.html'
})
export class AssignmentsPortalComponent {
    @Input()
    get assignments(): User[] {
        return this._assignments;
    }
    set assignments(val: User[]) {
        this._assignments = val;
        this.assignmentsChange.emit(this._assignments);
    }

    @Output() assignmentsChange: EventEmitter<User[]> = new EventEmitter<User[]>();

    @Output() open: EventEmitter<User> = new EventEmitter<User>();

    public searchText: string;
    public searchAssignments: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    private _assignments: User[];

    private subscriber: Subscription = new Subscription();

    constructor(
        private userService: UserService
    ) { }


    public change(): void {
        if(this.searchText && this.searchText.length > 0){
            this.subscriber.unsubscribe();
            this.subscriber = this.userService.userQuickSearch(this.searchText).subscribe(
                (users: User[]) => {
                    users = users.filter(u => this.assignments.findIndex(a => a._id == u._id) == -1);
                    this.searchAssignments.next(users);
            }, (error) => {
                console.log(error);
                this.searchAssignments.next([]);
            });
        } else {
            this.searchAssignments.next([]);
        }
    }

    public selection(event: MatAutocompleteSelectedEvent): void {
        let user = <User>event.option.value;
        this.assignments.push(user);
        this.assignments = this.assignments.slice();
        this.searchText = "";
        this.searchAssignments.next([]);
    }

    public delete(user: User): void {
        let ix = this.assignments.findIndex(u => u._id == user._id);
        if(ix > -1){
            this.assignments.splice(ix, 1);
            this.assignments = this.assignments.slice();
        }
    }

    public edit(user?: User): void {
        if(user){
            this.open.emit(user);
        }
    }
}