import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from '../../services/api/authen.service';
import { AuthenGetRes } from '../../model/authen_get_res';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  findLogin!: AuthenGetRes;
  status: number = 0;
  type: number = 0;

  constructor(private router: Router, private authenService: AuthenService) { }

  ngOnInit() {
    this.load();
  }

  async load(){
    const id = localStorage.getItem('uid');
    if (id) {
      this.findLogin = await this.authenService.getUserID(parseInt(id));
      this.status = 1;

      if (this.findLogin.type === 1) this.type = this.findLogin.type;
      else this.type = this.findLogin.type;

    } else {
      this.status = 0;
    }
  }

  login() {
    this.router.navigate(['/Authen']);
  }

  logout() {
    localStorage.removeItem('uid');
    this.router.navigate(['/Authen']);
    Swal.fire({
      title: "Logout Succesful.",
      icon: "success",
      confirmButtonColor: "#434343",
    })
  }

  Home() {
    this.router.navigate(['']);
  }

  Admin() {
    this.router.navigate(['/Admin']);
  }

  Profile() {
    this.router.navigate(['/Profile']);
  }

  upload() {
    this.router.navigate(['/upload']);
  }

  rank() {
    this.router.navigate(['/Ranking']);
  }

}
