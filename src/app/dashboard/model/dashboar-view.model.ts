export interface ICategoryWithCashFlowModel {
    categoryId: String;
    categoryName: string;
    cashFlow: Array<ICashFlowModel>;
    totalAmount:number;
}

export interface ICashFlowModel {
    cashFlowId: string;
    date:string
    amount: number;
    comment:string;
    type:string;
    for:string;
}