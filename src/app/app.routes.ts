import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { NotePage } from './note/note.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'note/new',
    component: NotePage,
  },
  {
    path: 'note/:id',
    component: NotePage,
  },
];
