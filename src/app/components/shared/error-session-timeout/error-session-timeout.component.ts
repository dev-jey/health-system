import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-error-session-timeout',
  templateUrl: './error-session-timeout.component.html',
  styleUrls: ['./error-session-timeout.component.scss']
})
export class ErrorSessionTimeoutComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
