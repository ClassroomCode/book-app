import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },
  {
    path: 'books',
    loadComponent: () =>
      import('./book-list/book-list').then((m) => m.BookList),
  },
  /*
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./book-detail/book-detail').then((m) => m.BookDetail),
  },
  {
    path: 'books/:id/edit',
    loadComponent: () =>
      import('./book-edit/book-edit').then((m) => m.BookEdit),
  },
  */
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.About),
  },
  { path: '**', redirectTo: 'books' },
];