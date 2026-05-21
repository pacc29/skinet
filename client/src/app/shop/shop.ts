import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { ProductItem } from "./product-item/product-item";

@Component({
  selector: 'app-shop',
  imports: [ProductItem],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  products: Product[] = [];
  shopService = inject(ShopService);

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (response) => (this.products = response.data),
      error: (error) => console.error(error),
    });
  }
}
