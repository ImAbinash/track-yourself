import { Utility } from './../../shared/utils/other.util';
import { DateHelper } from './../../shared/utils/date.util';
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
    
    const categoryObj:Partial<ICategoryWithSubCategoryModel>={
        categoryName:category.categoryName,
        id:new Utility().generateId(),
        userId:category.userId,
        isActive : true,
        isEnable: true,
        createdDate : new DateHelper().getCurrentDateAndTimeInUTCFormat(),
        updatedDate : new DateHelper().getCurrentDateAndTimeInUTCFormat()
    }
    return categoryObj;
}

export function subCategoryInitialization(subCategory:ISubCategory){
    const subCategoryObj:ISubCategory =  {
        id:new Utility().generateId(),
        subCategoryName: subCategory.subCategoryName,
        isActive:true,
        isEnable:true,
        createdDate:new DateHelper().getCurrentDateAndTimeInUTCFormat(),
        updatedDate:new DateHelper().getCurrentDateAndTimeInUTCFormat()
    }
    return subCategoryObj;
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



