import { ISubCategory } from "./category-subcategory.model";

export interface ISubCategoryDataModel {
    position: number;
    name: string;
    status: "Active"|"In-active"
}

export function prepareTable(subCategory: Array<ISubCategory>): Array<ISubCategoryDataModel> {
    const tableData: Array<ISubCategoryDataModel> = [];

    let idx = 0;
    subCategory.forEach(element => {
        tableData.push({
            position: (++idx),
            name: element.subCategoryName,
            status: element.isActive?"Active":"In-active"
        });
    })
    return tableData.slice();
}