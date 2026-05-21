import { Component, inject, Injectable, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './nav-bar/nav-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { Pagination } from './models/pagination';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
@Injectable({ providedIn: 'root' })
export class App implements OnInit {
  private http = inject(HttpClient);
  protected products: Product[] = [];
  protected readonly title = signal('skinet');

  ngOnInit(): void {
    this.http
      .get<Pagination<Product[]>>('https://localhost:5001/api/products?pageSize=50')
      .subscribe({
        next: (response) => (this.products = response.data),
        error: (error) => console.error(error),
        complete: () => {
          console.log(this.products);
          console.log('Request completed');
          console.log('Extra statements inside here');
        },
      });
  }
}
