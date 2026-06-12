import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Book } from './book';

@Injectable({ providedIn: 'root' })
export class BookService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:3000/books';

    // GET all the books
    booksResource() {
        return httpResource<Book[]>(() => this.baseUrl, { defaultValue: [] });
    }

    // GET a single book
    bookResource(id: () => number | undefined) {
        return httpResource<Book>(() => {
            const value = id();
            return value == null ? undefined : `${this.baseUrl}/${value}`;
        });
    }

    // PUT (update) a book
    updateBook(book: Book): Promise<Book> {
        return firstValueFrom(this.http.put<Book>(`${this.baseUrl}/${book.id}`, book));
    }
}
