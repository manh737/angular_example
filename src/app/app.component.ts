import { Component } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { User } from './shared/interfaces/user.interface';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  user$: Observable<User | null> = merge(
    // Init on startup
    this.authService.getProfile(),
    // Update after login/register/logout
    this.authService.getUser()
  );
  
  constructor(
    private authService: AuthService
  ) {}
  title = 'market';
}
