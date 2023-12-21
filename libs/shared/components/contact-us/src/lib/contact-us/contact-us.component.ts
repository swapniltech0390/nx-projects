import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'shared-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  constructor(private formBuilder: FormBuilder) {}
  contactUs = this.formBuilder.group({
    fullName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    message: ['', Validators.required],
    sendMeCopy : [false]
  });

  sendQuery() {
    console.log(this.contactUs.getRawValue());
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
      this.contactUs.controls['Email'].invalid &&
      (this.contactUs.controls['Email'].dirty ||
        this.contactUs.controls['Email'].touched)
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
