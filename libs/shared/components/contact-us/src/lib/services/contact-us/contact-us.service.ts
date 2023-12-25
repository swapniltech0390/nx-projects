import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  constructor(private httpClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMail(userDetails: any) {
    const url = `${process.env['APP_HOSTURL']}/sendEmail`;
    return this.httpClient.post(url, userDetails);
  }
}
