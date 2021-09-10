import { DateHelper } from './../../shared/utils/date.util';
import { Utility } from 'src/app/shared/utils/other.util';
export interface ISubCategory{
    id:string;
    subCategoryName:string;
    isActive:boolean;
    isEnable:boolean;
    createdDate:string;
    updatedDate:string;
}

export interface ICategoryWithSubCategoryModel{
    id:string,
    userId:string,
    categoryName:string;
    isActive:boolean;
    isEnable:boolean;
    createdDate:string;
    updatedDate:string;
    subCategory:Array<ISubCategory>;
}

export function categoryInitialization(category:Partial<ICategoryWithSubCategoryModel>){
    const userId = "b879b956-f1be-4ccb-8ac4-0b2ecea81c2e";
    const categoryObj:Partial<ICategoryWithSubCategoryModel>={
        categoryName:category.categoryName,
        id:new Utility().generateId(),
        userId:userId,
        isActive : true,
        isEnable: true,
        createdDate : new DateHelper().getCurrentDateAndTimeInUTCFormat(),
        updatedDate : new DateHelper().getCurrentDateAndTimeInUTCFormat()
    }
    return categoryObj;
}

export function convertDataToCategoryObject(data: any) {
    type Types = "string" | "number" | "boolean"|"Array<ISubCategory>";
    const keyValidators: Record<keyof ICategoryWithSubCategoryModel, Types> = {
        id:'string',
        userId:'string',
        categoryName:'string',
        isActive:'boolean',
        isEnable:'boolean',
        createdDate:'string',
        updatedDate:'string',
        subCategory:'Array<ISubCategory>'
    }

    if (typeof data === 'object' && data !== null) {
        let userData = data as ICategoryWithSubCategoryModel
        // for (const key of Object.keys(keyValidators) as Array<keyof User>) {
        //     if (typeof userData[key] !== keyValidators[key]) {
        //         throw new Error('not an user data');
        //     }
        // }
        return userData;
    }
    throw new Error('Not an userData');


}



