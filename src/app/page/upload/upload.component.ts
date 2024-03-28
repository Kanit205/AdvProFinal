import { AuthenService } from './../../services/api/authen.service';
import { Router } from '@angular/router';
import { CharacterService } from './../../services/api/character.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { URLGetRes } from '../../model/url_get_res';
import Swal from 'sweetalert2';
import { AuthenGetRes } from '../../model/authen_get_res';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
  fileSelect: File | null = null;
  fileCon: any;
  fileUrl: string = '';
  user: AuthenGetRes | undefined;

  constructor(private characterService: CharacterService, private router: Router, private authenService: AuthenService) { }

  ngOnInit() {
    if (!localStorage.getItem('uid')) {
      this.router.navigate(['']);
    } else {
      this.getUser();
    }
  }

  async getUser() {
    this.user = await this.authenService.getUserID(parseInt(localStorage.getItem('uid')!));
  }

  async onFileSelected(event: any) {
    this.fileSelect = event.target.files![0];
    console.log(this.fileSelect);
    const reader = new FileReader();

    reader.onload = () => {
      this.fileUrl = reader.result as string;
    }

    reader.readAsDataURL(this.fileSelect!);
  }

  async upload(chaname: string) {
    if (this.fileSelect && chaname) {
      if (this.user?.img_limit! < 5) {
        Swal.fire({
          icon: 'question',
          title: 'Are you sure to upload?',
          showCancelButton: true, // แสดงปุ่ม "Cancel"
          confirmButtonText: 'Yes', // ปุ่ม "Yes"
          cancelButtonText: 'No', // ปุ่ม "No"
          confirmButtonColor: "#434343",
        }).then( async (result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('img', this.fileSelect!);
            formData.append('name', chaname);
            formData.append('uid', localStorage.getItem('uid')!)
            this.characterService.GetUrl(formData);
            this.router.navigate(['/Profile']);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Max Limit Image",
          text: "Sorry can't Upload Image.",
          icon: "info",
          confirmButtonColor: "#434343"
        }).then(() => {
          this.router.navigate(['/Profile']);
        });
      }

    }
  }
}
