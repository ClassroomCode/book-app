import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './book-detail.html',
})
export class BookDetail {
  /** Bound from the `:id` route parameter via component input binding. */
  readonly id = input.required<string>();

  private readonly bookService = inject(BookService);

  protected readonly bookResource = this.bookService.bookResource(() =>
    Number(this.id()),
  );

  protected readonly book = computed(() => this.bookResource.value());
}