import React, { Component } from "react";
import { ISingleProps } from "./single";
/** ----------------------------------- Type ----------------------------------------- */
export interface IHeadProps {
    confirmText: string;
    cancelText: string;
    headHeight: number;
    backgroundColor: string;
    confirmStyle: object;
    cancelStyle: object;
    borderTopRadius: number;
}
export declare type IndeData = {
    name: string;
}[];
export interface IPickerProps {
    dataSource: IListObj[] | IndeData[];
    pickerDeep: number;
    defaultValueIndexes?: number[];
    value?: string[];
    confirm: (arr: object[]) => void;
    onceChange: (arr: object[]) => void;
    cancel: () => void;
    pickerStyle: ISingleProps;
    headOptions: IHeadProps;
    customHead: {};
    setResult: (index: number, item: {
        name?: string;
    }) => {};
}
export interface IListObj {
    list?: [];
    name?: string;
}
/** ----------------------------------- Deafult ----------------------------------------- */
export declare const defaultHeadOptions: {
    confirmText: string;
    cancelText: string;
    headHeight: number;
    backgroundColor: string;
    confirmStyle: {};
    cancelStyle: {};
    borderTopRadius: number;
};
export declare const defaultSingleProps: {
    list: never[];
    index: number;
    itemHeight: number;
    visibleNum: number;
    activeBgColor: string;
    activeBgOpacity: number;
    activeFontSize: number;
    activeFontColor: string;
    normalBgColor: string;
    normalBgOpacity: number;
    normalFontSize: number;
    normalFontColor: string;
    inparindex: number;
    done: () => void;
    pickerDeep: number;
};
export declare const defaultPickerProps: {
    dataSource: never[];
    pickerDeep: number;
    onceChange: (arr: []) => void;
    confirm: (arr: []) => void;
    cancel: () => void;
    customHead: null;
    pickerStyle: {
        list: never[];
        index: number;
        itemHeight: number;
        visibleNum: number;
        activeBgColor: string;
        activeBgOpacity: number;
        activeFontSize: number;
        activeFontColor: string;
        normalBgColor: string;
        normalBgOpacity: number;
        normalFontSize: number;
        normalFontColor: string;
        inparindex: number;
        done: () => void;
        pickerDeep: number;
    };
    headOptions: {
        confirmText: string;
        cancelText: string;
        headHeight: number;
        backgroundColor: string;
        confirmStyle: {};
        cancelStyle: {};
        borderTopRadius: number;
    };
};
/** ----------------------------------- Hoc ----------------------------------------- */
export declare function WithHeadAndMethod<T extends IPickerProps>(WrapComponent: typeof Component): React.ForwardRefExoticComponent<React.PropsWithoutRef<T> & React.RefAttributes<unknown>>;
//# sourceMappingURL=pickerhoc.d.ts.map