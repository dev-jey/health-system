import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "src/app/_services/authentication.service";

import { ApiError } from "../../_models/ApiError";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthUser } from "src/app/_models/AuthUser";

@Component({
  selector: "app-authentication-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormSpinner: Boolean;
  loginFormApiError: ApiError;
  loginFormSubmitted: Boolean;
  authenticationErrors = {
    required: "Field is required"
  };
  userData: any;
  authUser: AuthUser;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    //prevent logged in user from accessing login page
    if (this.router.url === "/") {
      const userToken = localStorage.getItem("mediclaimUserToken");
      if (userToken) {
        this.router.navigate(["/sla/dashboard"]);
      }
    }

    //initialize login form
    this.initLoginForm();

    //initialize default values
    this.loginFormSpinner = false;
    this.loginFormSubmitted = false;
    this.loginFormApiError = { hasError: false, message: "" };
  }

  /**
   * Login form initialization
   */
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /**
   * Login api integration
   */
  login() {
    this.loginFormSubmitted = true;
    this.loginFormApiError = { hasError: false, message: "" };
    //validate form
    if (this.loginForm.invalid) {
      return;
    }
    //api integration
    this.loginFormSpinner = true;
    const sub = this.auth
      .authenticateUser(this.loginForm.value)
      .pipe(
        tap(
          resp => {
            //save token to local storage
            localStorage.setItem("mediclaimUserToken", resp["token"]);

            //reinitialize form items
            const promise = this.auth.getAuthenticatedUser().toPromise();
            promise
              .then(data => {
                this.loginFormSubmitted = false;
                this.loginFormSpinner = false;

                //formulate user object
                let user = data[0];
                this.authUser = {
                  username: user.username,
                  token: resp["token"],
                  name: user.first_name + " " + user.last_name,
                  userId: user.id,
                  bls_serviceprovider: user.bls_serviceprovider,
                  userRole: {
                    id: user.roles[0].role_id,
                    name: user.roles[0].role.name
                  },
                  stakeholder: {
                    id: user.roles[0].role_id,
                    name: user.roles[0].role.name
                  },
                  hospital: {
                    id: user.bls_serviceprovider.facility_id,
                    name: user.bls_serviceprovider.hospital.name
                  }
                };

                //save user to local storage
                localStorage.setItem(
                  "mediclaimUser",
                  JSON.stringify(this.authUser)
                );

                //redirect user
                if (this.authUser.userRole.id == 3) {
                  //load sla dashboard
                  this.router.navigate(["sla/dashboard"]);
                }

                //unsubscribe
                if (sub) {
                  sub.unsubscribe();
                }
              })
              .catch(error => {
                //reinitialize variables
                console.log("User roles error");
                console.log(error);
                this.loginFormSubmitted = false;
                this.loginFormSpinner = false;
                this.loginFormApiError = {
                  hasError: true,
                  message: "Invalid login credentials"
                };
              });
          },
          error => {
            //reinitialize variables
            console.log("User credentials error");
            console.log(error);
            this.loginFormSubmitted = false;
            this.loginFormSpinner = false;
            this.loginFormApiError = {
              hasError: true,
              message: "Invalid login credentials"
            };
          }
        )
      )
      .subscribe();
  }
}
