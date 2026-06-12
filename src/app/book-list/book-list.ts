import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './book-list.html',
})
export class BookList {
  private readonly bookService = inject(BookService);

  protected readonly booksResource = this.bookService.booksResource();
}