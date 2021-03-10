import React from "react";
import { IListObj } from "./pickerhoc";
export interface ISingleProps {
    itemHeight: number;
    visibleNum: number;
    activeBgColor?: string;
    activeBgOpacity?: number;
    activeFontSize?: number;
    activeFontColor?: string;
    normalBgColor?: string;
    normalBgOpacity?: number;
    normalFontSize?: number;
    normalFontColor?: string;
    defaultIndex?: number;
    value?: string;
    inparindex: number;
    done: (a: number, b: number) => void;
    list: IListObj[];
    pickerDeep: number;
}
interface singleRef {
    resetData: () => void;
}
export declare const Slide: React.MemoExoticComponent<React.ForwardRefExoticComponent<ISingleProps & React.RefAttributes<singleRef>>>;
export {};
//# sourceMappingURL=single.d.ts.map