import { AuthenGetRes } from './../../model/authen_get_res';
import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private constants: Constants, private http: HttpClient) { }

  public async getUser(email: string) {
    const url = `${this.constants.API_ENDPOINT}authen?email=${email}`;
    const res = await lastValueFrom(this.http.get(url));
    return res as AuthenGetRes;
  }

  public async getUserID(uid: number) {
    const url = `${this.constants.API_ENDPOINT}authen?uid=${uid}`;
    const res = await lastValueFrom(this.http.get(url));
    return res as AuthenGetRes;
  }

  public async InsertUser(body: any) {
    const url = `${this.constants.API_ENDPOINT}authen`;
    const res = await lastValueFrom(this.http.post(url, body));
    return res;
  }

  public async UpdateImg(formData: FormData) {
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}uploads/ImgProfile`, formData));
  }

  public async UpdateName(body: any) {
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}authen`, body));
  }

  public async deleteImgProfile(body: any) {
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}uploads`, body));
  }

  public async GetAllUser() {
    const res = await lastValueFrom(this.http.get(`${this.constants.API_ENDPOINT}authen/AllUser`));
    return res as AuthenGetRes[];
  }

  public async changePass(body: any) {
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}authen/changePass`, body));
  }
}
