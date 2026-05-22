import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { ProductItem } from './product-item/product-item';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { Pagination } from '../shared/pagination/pagination';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  imports: [ProductItem, Pagination],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  shopService = inject(ShopService);
  products = signal<Product[]>([]);
  brands = signal<Brand[]>([]);
  types = signal<Type[]>([]);
  shopParams = new ShopParams();
  totalCount = signal<number>(0);
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(page: number) {
    if (this.shopParams.pageIndex !== page) {
      this.shopParams.pageIndex = page;
      this.getProducts();
    }
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.shopParams.pageIndex = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount.set(response.count);
      },
      error: (error) => console.error(error),
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => this.brands.set([{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.error(error),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => this.types.set([{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.error(error),
    });
  }
}
