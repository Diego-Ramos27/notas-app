import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { Note, Item } from '../models/note.model';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  note: Note | undefined;
  title = '';
  items: Item[] = [];

  newItem: Item = { name: '', price: 0 };

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);
      this.note = this.noteService.getNote(id);

      if (this.note) {
        this.title = this.note.title;
        this.items = [...this.note.items]; // Clonamos para edición segura
      }
    }
  }

  addItem() {
    if (this.newItem.name.trim()) {
      this.items.push({ ...this.newItem });
      this.newItem = { name: '', price: 0 };
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  save() {
    if (this.note) {
      this.noteService.updateNote(this.note.id, this.title, this.items);
    } else {
      this.noteService.addNote(this.title);
      const notes = this.noteService.getNotes();
      const newNote = notes[notes.length - 1];
      if (newNote) {
        newNote.items = this.items;
      }
    }

    this.router.navigateByUrl('/');
  }
}
