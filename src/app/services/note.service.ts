import { Injectable } from '@angular/core';
import { Item, Note } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private notes: Note[] = [];
  private nextId = 1;

  getNotes(): Note[] {
    return this.notes;
  }

  getNote(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  addNote(title: string) {
    this.notes.push({
      id: this.nextId++,
      title,
      items: []
    });
  }

  updateNote(id: number, title: string, items: Item[]) {
    const note = this.getNote(id);
    if (note) {
      note.title = title;
      note.items = items;
    }
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}
