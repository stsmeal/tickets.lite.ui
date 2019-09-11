import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Note } from 'src/app/models/note';

@Component({
    selector: 'ticket-notes-portal',
    templateUrl: 'ticket-notes.component.html'
})
export class TicketNotesPortalComponent implements OnInit{
    private readonly NoteTypes = [{
        id: 1,
        label: 'Request'
    },{
        id: 2,
        label: 'General'
    },{
        id: 3,
        label: 'Complete'
    }]
    @Input() 
    get notes() {
        return this.notesValue;
    }
    set notes(val: Note[]) {
        this.notesValue = val;
        this.notesChange.emit(val);
    }

    @Output() notesChange: EventEmitter<Note[]> = new EventEmitter<Note[]>();

    private notesValue: Note[];

    public ngOnInit(): void {
        if(!this.notes){
            this.notes = [];
        }
    }

    public edit(note?: Note): void {

    }

    public delete(note: Note): void {
        let ix = this.notes.findIndex(n => n == note);
        if(ix > -1){
            this.notes.slice(ix, 1);
        }
    }

    public getNoteType(id: number): string {
        let noteType = this.NoteTypes.find(nt => nt.id == id);
        return (noteType && noteType.label) ? noteType.label : '';
    }
}