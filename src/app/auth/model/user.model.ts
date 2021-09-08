import { DateHelper } from './../../shared/utils/date.util';
import { Utility } from './../../shared/utils/other.util';



// export interface User {
//     id: string,
//     firstName: string,
//     lastName: string,
//     emailId: string,
//     phoneNumber: string,
//     gender: "Male" | "Female" | "Other",
//     dob: string,
//     isAcceptedTerms: boolean,
//     createdDate: string,
//     updatedDate: string,
//     isActive: boolean,
//     isEnable: boolean

// }
export class UsreModel {
    id: string;
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: string;
    gender: "Male" | "Female" | "Other";
    dob: string;
    isAcceptedTerms: boolean;
    createdDate: string;
    updatedDate: string;
    isActive: boolean;
    isEnable: boolean;

    constructor( fn: string, ln: string, email: string,
         phNo: string, gender: any, dob:string, 
         termCondition: boolean) {
             const utility = new Utility();
             const dateHelper = new DateHelper()
            this.id = utility.generateId();
            this.firstName = fn;
            this.lastName = ln;
            this.emailId = email;
            this.phoneNumber = phNo;
            this.gender =gender;
            this.dob = dateHelper.convertLocalDateTimeToUTC(dob);
            this.isAcceptedTerms = termCondition;
            this.createdDate = dateHelper.getCurrentDateAndTimeInUTCFormat();
            this.updatedDate = dateHelper.getCurrentDateAndTimeInUTCFormat();
            this.isActive = true;
            this.isEnable = true;
    }


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }



}

