import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:3000/books';

    //
}
