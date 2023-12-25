import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactUsService } from '../services/contact-us/contact-us.service';

@Component({
  selector: 'shared-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  providers:[ContactUsService],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  constructor(private formBuilder: FormBuilder, private contactUsService:ContactUsService) {}
  contactUs = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    message: ['', Validators.required],
    sendMeCopy : [false]
  });

  sendQuery() {
    this.contactUsService.sendMail(this.contactUs.getRawValue()).subscribe((resp:any)=>{
      console.log('resp ', resp);
    });
  }

  isFullNameValid(): boolean {
    return (
      this.contactUs.controls['fullName'].invalid &&
      (this.contactUs.controls['fullName'].dirty ||
        this.contactUs.controls['fullName'].touched)
    );
  }
  isEmailValid(): boolean {
    return (
      this.contactUs.controls['email'].invalid &&
      (this.contactUs.controls['email'].dirty ||
        this.contactUs.controls['email'].touched)
    );
  }
  isPhoneNumberValid(): boolean {
    return (
      this.contactUs.controls['phoneNumber'].invalid &&
      (this.contactUs.controls['phoneNumber'].dirty ||
        this.contactUs.controls['phoneNumber'].touched)
    );
  }
  isMessageValid(): boolean {
    return (
      this.contactUs.controls['message'].invalid &&
      (this.contactUs.controls['message'].dirty ||
        this.contactUs.controls['message'].touched)
    );
  }
}
