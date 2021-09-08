import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export function createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordStreangth = {
            hasUpperCase: false,
            hasLowerCase: false,
            hasNumeric: false,
            hasMoreThanSpecifiedLengthPassword: false,
        }

        const value = control.value;
        if (!value) {
            return null;
        }
        console.log("Password strength:", value.length);
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        // const passwordLength = (value.length >= length);
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        passwordStreangth.hasLowerCase = hasLowerCase;
        passwordStreangth.hasUpperCase = hasUpperCase;
        passwordStreangth.hasNumeric = hasNumeric;
       // passwordStreangth.hasMoreThanSpecifiedLengthPassword = passwordLength;

        return !passwordValid ? {error: passwordStreangth} : null;
    }
}


export function confirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get("password")?.value;
        const confrimPassword = control.get("confirmPassword")?.value;
        const result = (password === confrimPassword) ? null : { "error": "Password and confirm password are not matching" };
        // if (result)
        //     formGroup.controls['confirmPassword'].setErrors({ message: "Password and confirm password are not matching" });
        return result;
    }
}

export function validatePhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        const result =  phoneRegex.test(control.value);
        return result?null:{"error":"Invalid phone number"};
    }
}