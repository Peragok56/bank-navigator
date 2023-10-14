import { IBottomSheet } from "../BottomSheet/BottomSheet.type";

export interface IBottomSheetBankFilter extends IBottomSheet{
    saveFilter?: (ids: number[]) => void
}