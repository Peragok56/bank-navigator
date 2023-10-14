import { IBottomSheet } from "../BottomSheet/BottomSheet.type";

export interface IBottomBankNavigation extends IBottomSheet{
    bank?: any,
    workload?: any
    changeRoute?: (type: string) => void
}