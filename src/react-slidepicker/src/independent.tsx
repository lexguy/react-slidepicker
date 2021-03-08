/*
 * @Author: xuwei
 * @Date: 2021-03-08 10:34:36
 * @LastEditTime: 2021-03-08 11:48:06
 * @LastEditors: xuwei
 * @Description:
 */
import React, { Component } from "react";
import { IndeData, IPickerProps } from "./pickerhoc";
import { Slide } from "./single";
export default class IndePicker extends Component<IPickerProps> {
  constructor(props: IPickerProps | Readonly<IPickerProps>) {
    super(props);
    this._initData();
  }

  _initData = () => {
    const dataSource = this.props.dataSource as IndeData[];
    dataSource.forEach((element: IndeData, index) => {
      this.props.setResult(index, element[0]);
    });
  };

  _done = (dataindex: number, parindex: number) => {
    const { dataSource, onceChange } = this.props;
    const list = dataSource[parindex] as IndeData;
    this.props.setResult(parindex, list[dataindex]);
    // onceChange && onceChange();
  };

  render() {
    const { pickerStyle, defaultValueIndexes, pickerDeep } = this.props;
    const dataSource = this.props.dataSource as IndeData[];
    return (
      <React.Fragment>
        {dataSource.map((list, index) => (
          <Slide
            key={index}
            {...pickerStyle}
            list={list}
            pickerDeep={pickerDeep}
            index={index}
            inparindex={index}
            done={this._done}
            defaultIndex={defaultValueIndexes ? defaultValueIndexes[index] : 0}
          />
        ))}
      </React.Fragment>
    );
  }
}
