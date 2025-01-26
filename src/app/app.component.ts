import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'quiz';
  showNav = false;
  userName: string = '';

  constructor(private router: Router) {}
  ngOnInit() {
    if (this.isBrowser()) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user.name || 'Guest';
    }
    // Listen to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide navbar on the registry page
        this.showNav = event.url !== '/';
      }
    });
  }
  // Utility function to check if the code is running in a browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setUserName(name: string): void {
    this.userName = name;
    if (this.isBrowser()) {
      localStorage.setItem('user', JSON.stringify({ name: name }));
    }
  }
}
