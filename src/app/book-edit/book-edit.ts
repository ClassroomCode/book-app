import {
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  form,
  FormField,
  min,
  pattern,
  required,
  submit,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  imports: [RouterLink, FormField],
  templateUrl: './book-edit.html',
})
export class BookEdit {
  /** Bound from the `:id` route parameter via component input binding. */
  readonly id = input.required<string>();

  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  protected readonly bookResource = this.bookService.bookResource(() =>
    Number(this.id()),
  );

  /** Writable model backing the signal form. */
  protected readonly model = signal<Book>({
    id: 0,
    isbn: '',
    title: '',
    price: 0,
  });

  /** Signal-based form with field validation rules. */
  protected readonly bookForm = form(this.model, (book) => {
    required(book.title, { message: 'Title is required' });
    required(book.isbn, { message: 'ISBN is required' });
    pattern(book.isbn, /^[0-9-]{10,17}$/, {
      message: 'ISBN may only contain digits and dashes (10–17 chars)',
    });
    min(book.price, 0, { message: 'Price must be 0 or greater' });
  });

  protected readonly saveError = signal<string | null>(null);

  constructor() {
    // Seed the form model once the book has been fetched.
    effect(() => {
      const book = this.bookResource.value();
      if (book) {
        this.model.set({ ...book });
      }
    });
  }

  protected async save(): Promise<void> {
    this.saveError.set(null);
    await submit(this.bookForm, async (field) => {
      try {
        await this.bookService.updateBook(field().value());
        await this.router.navigate(['/books', this.id()]);
        return undefined;
      } catch {
        this.saveError.set('Could not save the book. Please try again.');
        return undefined;
      }
    });
  }
}
