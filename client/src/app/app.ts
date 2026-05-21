import { Component, inject, Injectable, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './core/nav-bar/nav-bar';
import { Shop } from "./shop/shop";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Shop],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
@Injectable({ providedIn: 'root' })
export class App implements OnInit {
  protected readonly title = signal('skinet');
  ngOnInit(): void {}
}
