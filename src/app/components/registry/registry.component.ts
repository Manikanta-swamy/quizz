import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  standalone: false,

  templateUrl: './registry.component.html',
  styleUrl: './registry.component.css',
})
export class RegistryComponent {
  user = {
    name: '',
    phone: '',
  };

  constructor(private router: Router) {}

  saveUser() {
    // Store user data in localStorage or a shared service

    const data = {
      name: this.user.name,
      phone: this.user.phone,
    };
    localStorage.setItem('user', JSON.stringify(data));
    this.user.name = data.name || 'Guest';
    // Navigate to the quiz page
    this.router.navigate(['/quiz']);
  }
}
