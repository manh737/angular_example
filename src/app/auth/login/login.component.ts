import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD_PATTERN } from '../../constant/pattern.constant';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    // password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)])
  });

  constructor(private router: Router,private authService: AuthService) { 

  }

  ngOnInit(): void {
  }
  
  getUsernameErrorMessage() {
    if (this.loginForm.controls['username'].hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
  
  getPasswordErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['password'].hasError('pattern') ? 'Not a valid password' : '';
  }
  
  onSubmit() {
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe((res) => {
      this.router.navigateByUrl('');
    });
  }

}
