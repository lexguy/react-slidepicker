import React from "react";
import { IListObj, IPickerProps } from "./pickerhoc";
export default class CascadePicker extends React.PureComponent<IPickerProps> {
    static defaultProps: {
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
    state: {
        lists: IListObj[][];
    };
    resultArray: IListObj[];
    constructor(props: IPickerProps | Readonly<IPickerProps>);
    initState: () => any[];
    /** ----------------------------------- Data ----------------------------------------- */
    dismantleBebindData: (array: IListObj[], index: number, inparIndex: number) => void;
    setData: (checkedIndex: number, inparindex: number) => void;
    _setParResult: (index: number, obj: IListObj) => void;
    /** ----------------------------------- Render ----------------------------------------- */
    render(): JSX.Element;
}
//# sourceMappingURL=relatived.d.ts.map