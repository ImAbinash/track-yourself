import * as moment from "moment";

export class DateHelper {
    constructor() {
    }
    //get todays date and time in utc format
    getCurrentDateAndTimeInUTCFormat() {
        return moment.utc().format();
    }

    convertLocalDateTimeToUTC(date: string) {
        const dateObj = new Date(date);
        return moment.utc(dateObj).format();
    }

    convertUTCToLocalDateAndTime(date: string) {
        const localDateTime = moment.utc(date).local().format()
        return localDateTime;
    }

    convertUTCToLocalDateAndFormat(date: string,format?:string) {
        const localDateTime = moment.utc(date).local().format(format);
        return localDateTime;
    }

    getTimeInMilisecond(date:string){
        return new Date(date).getTime();
    }

}
