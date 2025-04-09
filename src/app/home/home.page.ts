import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(public noteService: NoteService, private router: Router) {}

  addNote() {
    this.router.navigateByUrl('/note/new');
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
  }
  getTotal(note: Note): number {
    return note.items.reduce((sum, item) => sum + item.price, 0);
  }
  onDeleteClick(id: number, event: Event) {
    event.stopPropagation(); // 👈 Detiene el clic para que no dispare editNote
    this.deleteNote(id);
  }
  
}
