import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from 'src/app/_services/shared/alert.service';
import { ContactService } from 'src/app/_services/shared/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactButtonText: String = 'Send';
  loading: Boolean = false;
  contactFormErrors = {
    required: 'Field is required',
    email: 'Enter a valid email'
  }
  contactFormSubmitted: boolean;
  contactForm: FormGroup;


  constructor(private fb: FormBuilder, private alert: AlertService, private contactService: ContactService) { }

  ngOnInit() {
    this.initForms();
  }


  initForms() {
    this.contactForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      mobile: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required]
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.contactFormSubmitted = true;
    if(this.contactForm.invalid) return;
    this.contactButtonText = 'Sending';
    this.contactService.contactUs(this.contactForm.value).subscribe(data => {
      this.contactButtonText = 'Send'
      this.alert.fire('Success!', 'Your message was successfully sent. We will respond shortly', 'success');
    }, error => {
      this.contactButtonText = 'Send'
      this.alert.fire('Error!', 'Message could not be sent. Please try again!', 'error');
    });
    this.contactForm.reset()
    this.contactFormSubmitted = false;
  }

}
