import { Router } from '@angular/router';
import { AuthenGetRes } from './../../model/authen_get_res';
import { AuthenService } from './../../services/api/authen.service';
import { Component, OnInit } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  constructor(private authenService: AuthenService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid')) {
      this.router.navigate(['']);
    }
  }

  async regis(user: string, email: string, pass: string, conpass: string) {
    if (user && email && pass && conpass) {
      const checkeamil = await this.authenService.getUser(email);
      if (!checkeamil) {
          if (pass === conpass) {
          const saltRounds = 10;
          pass = await bcrypt.hash(pass, saltRounds);
          const body = {
            type: 2,
            name: user,
            email: email,
            password: pass,
            img_limit: 0,
          };
          this.authenService.InsertUser(body);
          this.router.navigate(['Authen']);
        } else {
          console.log("pass != conpass");
        }
      } else {
        console.log("Have Email");
        Swal.fire({
          icon: 'error',
          title: 'This email address is already used.',
          confirmButtonColor: "#434343"
        })
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in complete information.',
        confirmButtonColor: "#434343",
      });
    }
  }

  login() {
    this.router.navigate(["/Authen"]);
  }
}
