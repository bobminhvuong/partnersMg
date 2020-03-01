import { LoginService } from './../service/auth/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  validateFormRegister: FormGroup;
  isLoading = false;
  is_register = false;
  constructor(private fb: FormBuilder, private router: Router, private loginSV: LoginService, private message: NzMessageService) { }

  ngOnInit() {
    if (localStorage.getItem('x-key-x-u-log')) {
      this.router.navigate(['/manager']);
    }

    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });

    this.validateFormRegister = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      // confirmPassword: [null, [Validators.required]],
      fullname: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });

  }

  login(data) {
    this.isLoading = true;
    this.loginSV.login(data).subscribe(r => {
      if (r && r.status == 1) {
        localStorage.setItem('x-key-x-u-log', r.token);
        this.router.navigate(['/manager']);
      } else {
        this.message.create('error', r.message);
      }
      this.isLoading = false;
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.login(this.validateForm.value);
    }
  }

  // confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  //   if (!control.value) {
  //     return { required: true };
  //   } else if (control.value !== this.validateForm.controls.password.value) {
  //     return { confirm: true, error: false };
  //   }
  //   return {};
  // };

  registerForm(val) {
    this.is_register = val;
  }

  register() {
    for (const i in this.validateFormRegister.controls) {
      this.validateFormRegister.controls[i].markAsDirty();
      this.validateFormRegister.controls[i].updateValueAndValidity();
    }

    if (this.validateFormRegister.valid) {
      this.loginSV.register(this.validateFormRegister.value).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', 'Đăng kí tài khoản thành công!');
          this.is_register = false;;
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!')
        }
      })
    }
  }
}
