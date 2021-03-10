import { Component } from "react";
import { IPickerProps } from "./pickerhoc";
export default class IndePicker extends Component<IPickerProps> {
    constructor(props: IPickerProps | Readonly<IPickerProps>);
    _initData: () => void;
    _done: (dataindex: number, parindex: number) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=independent.d.ts.map