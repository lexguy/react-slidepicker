/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:34
 * @LastEditTime: 2021-03-08 14:11:06
 * @LastEditors: xuwei
 * @Description:
 */
import React from "react";
import { Slide } from "./single";
import { defaultPickerProps, IListObj, IPickerProps } from "./pickerhoc";

export default class CascadePicker extends React.PureComponent<IPickerProps> {
  static defaultProps = defaultPickerProps;
  state: { lists: IListObj[][] };
  resultArray: IListObj[];
  constructor(props: IPickerProps | Readonly<IPickerProps>) {
    super(props);
    this.state = { lists: this.initState() };
    this.resultArray = [];
  }

  initState = () => {
    const lists = new Array(this.props.pickerDeep).fill([]);
    lists[0] = this.props.dataSource;
    return lists;
  };

  /** ----------------------------------- Data ----------------------------------------- */
  // 当前操作的数组，当前数组第几个被选中，当前数组是第几轮
  // 递归
  dismantleBebindData = (array: IListObj[], index: number, inparIndex: number) => {
    const { pickerDeep, onceChange } = this.props;
    const lists = this.state.lists.slice();
    const curObj = array[index];
    curObj && this._setParResult(inparIndex, curObj);

    if (array && array.length > 0) {
      lists[inparIndex] = array;
      this.setState({ lists }, () => {
        inparIndex++;
        this.dismantleBebindData(curObj.list || [], 0, inparIndex);
      });
    } else {
      for (let i = inparIndex; i < pickerDeep; i++) {
        lists[i] = [];
        this._setParResult(i, {});
      }
      this.setState({ lists });
      onceChange && onceChange(this.resultArray);
    }
  };

  setData = (checkedIndex: number, inparindex: number) => {
    this.dismantleBebindData(this.state.lists[inparindex], checkedIndex, inparindex);
  };

  _setParResult = (index: number, obj: IListObj) => {
    const { list, ...item } = obj;
    this.props.setResult(index, item);
  };

  /** ----------------------------------- Render ----------------------------------------- */
  render() {
    const TProps = this.props;
    const singleStyle = TProps.pickerStyle;

    return (
      <React.Fragment>
        {this.state.lists.map((ele, index) => (
          <Slide
            key={index}
            {...singleStyle}
            pickerDeep={TProps.pickerDeep}
            list={ele}
            index={index}
            inparindex={index}
            done={this.setData}
          />
        ))}
      </React.Fragment>
    );
  }
}
