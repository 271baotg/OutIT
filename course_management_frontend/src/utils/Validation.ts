export const isEmalValid = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}


interface IUsernameValidate {

}

export class UsernameValidator implements IUsernameValidate {
    isValid = (u: string) => {
        if (u && u.length && u.length >= 8) {
            return true;
        }
        return false;
    }

}

interface IPasswordValidate {
    isLongEnough: Function
    isContaineSpecialCharacter: Function
    isContainerNumber: Function;
    isValid: Function
}

export class PasswordValidator implements IPasswordValidate {
    isLongEnough = (p: string) => {
        if (p && p.length && p.length >= 8) {
            return true;
        }
        return false;
    }
    isContainerNumber = (p: string) => {
        if (p) {
            const regex = /\d+/;
            if (regex.test(p)) {
                return true;
            }
        }
        return false;

    };
    isContaineSpecialCharacter = (p: string) => {
        if (p) {
            const regex = /[^a-zA-Z0-9]/;
            if (regex.test(p)) {
                return true;
            }
        }
        return false;
    };

    isValid = (p:string) => {
        if(this.isLongEnough(p) && this.isContaineSpecialCharacter(p) && this.isContainerNumber(p)){
            return true;
        }
        return false;
    }




}