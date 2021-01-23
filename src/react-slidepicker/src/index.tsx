/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:34
 * @LastEditTime: 2021-01-23 17:24:28
 * @LastEditors: xuwei
 * @Description:
 */
import React, { CSSProperties } from "react";
import { defaultSingleProps, ISingleProps, Slide } from "./single";

interface IPickerProps {
  dataSource: any[];
  pickerDeep: number;
  confirm: ({}) => void;
  onceChange: (args: any) => void;
  cancel: ({}) => void;
  pickerStyle: ISingleProps;
  headOptions: {};
  customHead: {};
}

const defaultProps = {
  dataSource: [], //data
  pickerDeep: 3,
  onceChange: (arr: []) => {}, // once change callback
  confirm: (arr: []) => {}, //confirm  send data back
  cancel: () => {},
  customHead: null,
  pickerStyle: defaultSingleProps,
  headOptions: {},
};

class CascadePicker extends React.PureComponent<IPickerProps> {
  static defaultProps = defaultProps;
  state: {
    lists: any[];
  };
  resultIndexs: any[]; //保存已选择的结果,只存 Index
  resultArray: any[];
  constructor(props: any) {
    super(props);
    this.state = {
      lists: this.initState(),
    };
    this.resultIndexs = [];
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
  dismantleBebindData = (array: any[], index: number, inparIndex: number) => {
    const { pickerDeep, onceChange } = this.props;
    const lists = this.state.lists.slice();
    const curObj = array[index];
    curObj && (this.resultArray[inparIndex] = curObj);
    if (array && array.length > 0) {
      lists[inparIndex] = array;
      this.setState({ lists }, () => {
        inparIndex++;
        this.dismantleBebindData(curObj.list || [], 0, inparIndex);
      });
    } else {
      for (let i = inparIndex; i < pickerDeep; i++) {
        lists[i] = [];
        this.resultArray[i] = {};
      }
      this.setState({ lists });
      onceChange && onceChange(this.resultArray);
    }
  };

  setData = (checkedIndex: number, inparindex: number) => {
    this.setResult(checkedIndex, inparindex);
    this.dismantleBebindData(
      this.state.lists[inparindex],
      checkedIndex,
      inparindex
    );
  };

  setResult = (checkedIndex: number, inparindex: number) => {
    this.resultIndexs[inparindex] = checkedIndex;
    for (let i = inparindex + 1; i < this.props.pickerDeep; i++) {
      this.resultIndexs[i] = 0;
    }
  };

  /** ----------------------------------- Render ----------------------------------------- */
  render() {
    const TProps = this.props;
    const SingleProps = TProps.pickerStyle;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={lbtnstyle}>取消</span>
          <span style={rbtnstyle}>确认</span>
        </div>
        <div
          style={{
            height: SingleProps.visibleNum * SingleProps.itemHeight,
            flexDirection: "row",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {this.state.lists.map((ele, index) => (
            <Slide
              key={index}
              {...SingleProps}
              pickerDeep={TProps.pickerDeep}
              list={ele}
              index={index}
              inparindex={index}
              done={this.setData}
            />
          ))}
          <div />
        </div>
      </div>
    );
  }
}

const lbtnstyle: CSSProperties = {
  display: "inline-block",
  padding: `10px`,
  borderTopLeftRadius: 5,
};
const rbtnstyle: CSSProperties = {
  display: "inline-block",
  padding: `10px`,
};

export default { CascadePicker };
