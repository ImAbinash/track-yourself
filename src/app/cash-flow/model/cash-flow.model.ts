import { DateHelper } from './../../shared/utils/date.util';
import { Utility } from './../../shared/utils/other.util';
export interface ICashFlow {
    id: string;
    amount: number;
    description: string;
    cateoryId: string;
    categoryName: string;
    subCategoryId: string;
    subCategoryName: string;
    operatedAgainst: string;
    operatedOnInstance: string;
    createdDate: string;
    updatedDate: string;
    isActive: boolean;
    isEnable: boolean;
    userId: string;
}
export function cashFlowInitialization(cashFlowObj: Partial<ICashFlow>) {
    cashFlowObj.operatedOnInstance = new DateHelper().convertLocalDateTimeToUTC(cashFlowObj.operatedOnInstance || new Date().toString());
    const cashFlowInitObj: Partial<ICashFlow> = {
        id: new Utility().generateId(),
        ...cashFlowObj,
        isActive: true,
        isEnable: true,
        createdDate: new DateHelper().getCurrentDateAndTimeInUTCFormat(),
        updatedDate: new DateHelper().getCurrentDateAndTimeInUTCFormat()
    }
    return cashFlowInitObj;
}

export function convertDataToCashFlowModel(data: any) {
    type Types = "string" | "number" | "boolean";
    const keyValidators: Record<keyof ICashFlow, Types> = {
        id:'string',
        userId:'string',
        amount:'number',
        description:'string',
        cateoryId:'string',
        categoryName:'string',
        subCategoryId:'string',
        subCategoryName:'string',
        operatedAgainst:'string',
        operatedOnInstance:'string',
        createdDate:'string',
        updatedDate:'string',
        isActive:'boolean',
        isEnable:'boolean'
    }
    console.log(typeof data);
    if ((typeof data) === 'object' && data !== null) {
        let cashFlowModelData = data as ICashFlow;
        return cashFlowModelData;
    }
    throw new Error('Not cashFlowModel Data ');
}