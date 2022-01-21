import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() user: User | null = null;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/login');
  }

}
