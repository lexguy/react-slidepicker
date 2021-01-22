/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:34
 * @LastEditTime: 2021-01-22 23:12:04
 * @LastEditors: xuwei
 * @Description:
 */
import React, { createRef, MutableRefObject, useRef } from "react";
import { defaultSingleProps, ISingleProps, Slide } from "./single";

interface IRef {
  resetData: () => void;
}
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
    lv1List: [];
    lv2List: [];
    lv3List: [];
  };
  result: any[]; //保存已选择的结果,只存 Index
  constructor(props: any) {
    super(props);
    this.state = {
      lv1List: [],
      lv2List: [],
      lv3List: [],
    };
    this.result = [];
  }

  componentDidMount() {
    this.dismantleL1Data();
  }

  /** ----------------------------------- State ----------------------------------------- */
  dismantleL1Data = () => {
    const { dataSource, pickerDeep, onceChange } = this.props;
    const lv1List = [];
    for (let i = 0; i < dataSource.length; i++) {
      const element = dataSource[i];
      const { list, ...lv1Item } = element;
      lv1List[i] = lv1Item;
    }
    this.setState({ lv1List });
    if (pickerDeep === 1 && onceChange) {
      onceChange(lv1List[0]);
    } else {
      this.dismantleL2Data();
    }
  };

  dismantleL2Data = () => {
    const { dataSource, pickerDeep, onceChange } = this.props;

    this.result[1] = 0;
    const lv1obj = dataSource[this.result[0] || 0];
    const lv2List = lv1obj.list;
    if (lv2List && lv2List.length > 0) {
      this.setState({ lv2List: lv1obj.list }, () => {
        this.dismantleL3Data(lv1obj.list);
      });
    } else {
      this.setState({ lv2List: [], lv3List: [] });
    }

    if (pickerDeep === 2 && onceChange) {
      // onceChange(lv1obj, lv2List[0]);
    }
  };

  dismantleL3Data = (plv2List?: { list: [] }[]) => {
    const { pickerDeep, onceChange } = this.props;

    this.result[2] = 0;
    const lv2List = plv2List || this.state.lv2List;
    const lv2Index = this.result[1];
    const lv2obj: { list: {}[] } = lv2List[lv2Index];
    const lv3List = lv2obj?.list || [];
    if (lv2obj && lv2obj.list && lv2obj.list.length > 0) {
      this.setState({ lv3List: lv2obj.list });
    } else {
      this.setState({ lv3List: [] });
    }
    if (pickerDeep === 3 && onceChange) {
      onceChange(lv3List[0]);
    }
  };

  /** ----------------------------------- Data ----------------------------------------- */

  setData = (checkedIndex: number, inparindex: number) => {
    this.result[inparindex] = checkedIndex;
    const { pickerDeep } = this.props;
    if (inparindex === 0 && pickerDeep > 1) {
      this.dismantleL2Data();
    } else if (inparindex === 1) {
      this.dismantleL3Data();
    }
    // console.info("check", checkedIndex);
    // console.info("inparindex", inparindex);
    // console.info("[]", this.result);
    // this.props.onceChange && this.props.onceChange();
    // console.info("", this.bundleData());
  };

  bundleData = () => {
    const { pickerDeep } = this.props;
    const { lv1List, lv2List, lv3List } = this.state;
    const [r1, r2, r3] = this.result;
    if (pickerDeep === 1) {
      return lv1List[r1];
    } else if (pickerDeep === 2) {
      return [lv1List[r1], lv2List[r2]];
    } else {
      return [lv1List[r1], lv2List[r2], lv3List[r3]];
    }
  };

  /** ----------------------------------- Render ----------------------------------------- */
  render() {
    const TProps = this.props;
    const SingleProps = TProps.pickerStyle;
    const { lv1List, lv2List, lv3List } = this.state;
    const listArray = [lv1List, lv2List, lv3List];
    return (
      <div
        style={{
          height: SingleProps.visibleNum * SingleProps.itemHeight,
          flexDirection: "row",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {new Array(TProps.pickerDeep).fill(1).map((ele, index) => {
          return (
            <Slide
              key={index}
              {...SingleProps}
              pickerDeep={TProps.pickerDeep}
              list={listArray[index]}
              index={index}
              inparindex={index}
              done={this.setData}
            />
          );
        })}

        <div />
      </div>
    );
  }
}

export default { CascadePicker };
