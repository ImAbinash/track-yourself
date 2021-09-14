export interface ICategoryWithCashFlowModel {
    categoryId: String;
    categoryName: string;
    cashFlow: Array<ICashFlowModel>;
    totalAmount:number;
}

export interface ICashFlowModel {
    cashFlowId: string;
    amount: number;
}