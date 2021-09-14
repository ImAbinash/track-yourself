import { DateHelper } from './date.util';
import { v4 as uuidv4 } from 'uuid';

export class Utility {
    constructor() { }
    generateId() {
        return uuidv4();
    }

    sortListBasedOnDate(order:'ASC'|'DESC',array:any,property:string){
        array.sort((item1:any,item2:any)=>{
            const dateTime1 = new DateHelper().getTimeInMilisecond(item1[property]);
            const dateTime2 = new DateHelper().getTimeInMilisecond(item2[property]);
           
            if(order == 'ASC'){
                return dateTime1 - dateTime2;
            }
            return dateTime2 - dateTime1;
        });
    }
}
