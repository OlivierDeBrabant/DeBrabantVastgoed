import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);
    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map((available) => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMessage: string = "";

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: [
        "",
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability),
      ],
      passwordGroup: this.fb.group(
        {
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(8),
              patternValidator(/\d/, { hasNumber: true }),
              patternValidator(/[A-Z]/, { hasUpperCase: true }),
              patternValidator(/[a-z]/, { hasLowerCase: true }),
            ],
          ],
          confirmPassword: ["", Validators.required],
        },
        { validator: comparePasswords }
      ),
    });
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return "Verplicht veld";
    } else if (errors.minlength) {
      return `Minstend ${errors.minlength.requiredLength} karakters nodig, (momenteel ${errors.minlength.actualLength})`;
    } else if (errors.hasNumber) {
      return `Op zijn minst 1 nummer`;
    } else if (errors.hasUpperCase) {
      return `Op zijn minst 1 grote letter`;
    } else if (errors.hasNumber) {
      return `Op zijn minst 1 kleine letter`;
    } else if (errors.userAlreadyExists) {
      return `De gebruiker bestaat reeds`;
    } else if (errors.email) {
      return `Geen geldig emailadres`;
    } else if (errors.passwordsDiffer) {
      return `De wachtwoorden zijn niet hetzelfde`;
    }
  }

  onSubmit() {
    this.authService
      .register(
        this.user.value.firstname,
        this.user.value.lastname,
        this.user.value.email,
        this.user.value.passwordGroup.password
      )
      .subscribe(
        (val) => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.router.navigate(['']);
            }
          } else {
            this.errorMessage = `Kan niet inloggen`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `Het inloggen met ${this.user.value.email} veroorzaakt een error: ${err.error.message}`;
          } else {
            this.errorMessage = `Error ${err.status} wanneer we ${this.user.value.email},willen inloggen: ${err.error}`;
          }
        }
      );
  }
}
