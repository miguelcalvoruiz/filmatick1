import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function firstCapitalLetter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;
        if (!valor) {
            return null;
        }
        const firstLetter = valor.charAt(0);
        if (firstLetter !== firstLetter.toUpperCase()) {
            return {
                firstCapitalLetter: {
                    message: 'La primera letra debe ser mayuscula'
                }
            };
        }
        return null;
    };
}
