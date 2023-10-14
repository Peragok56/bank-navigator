import { NavigationProp } from "@react-navigation/native";
import { ReactNode } from "react";

export interface IBottomSheet { 
    opened: boolean,
    children?: ReactNode,
    closeModal: () => void
}