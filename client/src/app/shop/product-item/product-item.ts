import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, FontAwesomeModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  faShoppingCart = faShoppingCart;
  @Input() product?: Product;
}
