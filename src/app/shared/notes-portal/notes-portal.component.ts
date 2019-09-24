import { Component, Input, Output, EventEmitter, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Note } from 'src/app/models/note';
import { ModalService } from 'src/app/services/modal.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'notes-portal',
    templateUrl: 'notes-portal.component.html'
})
export class NotesPortalComponent implements OnInit{
    public readonly NoteTypes = [{
        id: 1,
        label: 'Request'
    },{
        id: 2,
        label: 'General'
    },{
        id: 3,
        label: 'Complete'
    }];

    @Input() 
    get notes() {
        return this.notesValue;
    }
    set notes(val: Note[]) {
        this.notesValue = val;
        this.notesChange.emit(this.notesValue);
    }

    @Output() notesChange: EventEmitter<Note[]> = new EventEmitter<Note[]>();

    
    @ViewChild('noteModal', { static: true }) noteModal: TemplateRef<any>;

    public note: Note;
    public modalRef: MatDialogRef<any>;

    private notesValue: Note[] = [];

    private noteIndex: number;

    constructor(private modalService: ModalService){}

    public ngOnInit(): void {
        if(!this.notes){
            this.notes = [];
        }
    }

    public edit(note?: Note): void {
        if(!note){
            this.note = new Note();
            this.note.type = 2;
        } else {
            this.note = note;
        }

        this.noteIndex = this.notes.findIndex(n => n == note);

        this.modalRef = this.modalService.open(this.noteModal, { width: '1200px'});

        this.modalRef.afterOpened().subscribe(() => {
            setTimeout(() => {
                let messageInput: HTMLElement = document.getElementById('messageArea');
                if(messageInput){
                    messageInput.focus();
                }
            });
        })

        this.modalRef.afterClosed().subscribe(
            (_note: Note) => {
                if(_note){
                    _note.dateUpdated = new Date();

                    if(this.noteIndex >= 0){
                        this.notes[this.noteIndex] = _note;
                    } else {
                        _note.dateCreated = new Date();
                        this.notes.push(_note);
                    }

                    this.notes = this.notes.slice();
                }
        });
    }

    public delete(note: Note): void {
        let ix = this.notes.findIndex(n => n == note);
        if(ix > -1){
            this.notes.splice(ix, 1);
            this.notes = this.notes.slice();
        }
    }

    public getNoteType(id: number): string {
        let noteType = this.NoteTypes.find(nt => nt.id == id);
        return (noteType && noteType.label) ? noteType.label : '';
    }
}