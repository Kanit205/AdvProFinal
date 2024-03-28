import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthenService } from '../../services/api/authen.service';
import { AuthenGetRes } from '../../model/authen_get_res';
import * as bcrypt from 'bcryptjs';
import { HeaderComponent } from '../../components/header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authen',
  standalone: true,
  imports: [RouterLink, RouterModule, HeaderComponent],
  templateUrl: './authen.component.html',
  styleUrl: './authen.component.scss'
})
export class AuthenComponent implements OnInit {
  findLogin: AuthenGetRes | undefined;

  constructor(private authService: AuthenService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid')) {
      this.router.navigate(['']);
    }
  }

  async Login(email: string, pass: string) {
    if (email || pass) {
      if (email && !pass) {
        Swal.fire({
          icon: "error",
          title: "Password not found",
          text: "Please enter password!",
          confirmButtonColor: "#434343",
        });
      } else if (pass && !email) {
        Swal.fire({
          icon: "error",
          title: "Email not found",
          text: "Please enter email!",
          confirmButtonColor: "#434343",
        });
      } else {
        this.findLogin = await this.authService.getUser(email);
        if (this.findLogin) {
          const passMatch = await bcrypt.compare(pass, this.findLogin.password);
          if (passMatch) {
            localStorage.setItem('uid', `${this.findLogin.uid}`);
            Swal.fire({
              title: "Login Successful!",
              icon: "success",
              confirmButtonColor: "#434343",
            });
            if (this.findLogin.type === 1) {
              this.router.navigate(['/Admin']);
            } else {
              this.router.navigate(['']);
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "The password is incorrect.",
              confirmButtonColor: "#434343",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Email not found",
            confirmButtonColor: "#434343",
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Email not found",
        text: "Please enter email!",
        confirmButtonColor: "#434343",
      });
      console.log("This email doesn't exist.");
    }
  }

  Home() {
    this.router.navigate([""]);
  }
}
