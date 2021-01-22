/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:34
 * @LastEditTime: 2021-01-22 18:36:27
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
  confirm: () => void;
  onceChange: () => void;
  cancel: () => void;
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
    const { dataSource } = this.props;
    const lv1List = [];
    for (let i = 0; i < dataSource.length; i++) {
      const element = dataSource[i];
      const { list, ...lv1Item } = element;
      lv1List[i] = lv1Item;
    }
    this.setState({ lv1List });
    this.dismantleL2Data();
  };

  dismantleL2Data = () => {
    // const
    this.result[1] = 0;
    const lv1obj = this.props.dataSource[this.result[0] || 0];
    if (lv1obj && lv1obj.list && lv1obj.list.length > 0) {
      this.setState({ lv2List: lv1obj.list }, () => {
        this.dismantleL3Data(lv1obj.list);
      });
    } else {
      this.setState({ lv2List: [], lv3List: [] });
    }
  };

  dismantleL3Data = (plv2List?: { list: [] }[]) => {
    this.result[2] = 0;
    const lv2List = plv2List || this.state.lv2List;
    const lv2Index = this.result[1];
    const lv2obj: { list: {}[] } = lv2List[lv2Index];
    if (lv2obj && lv2obj.list && lv2obj.list.length > 0) {
      this.setState({ lv3List: lv2obj.list });
    } else {
      this.setState({ lv3List: [] });
    }
  };

  /** ----------------------------------- Data ----------------------------------------- */

  setData = (checkedIndex: number, inparindex: number) => {
    this.result[inparindex] = checkedIndex;
    if (inparindex === 0) {
      this.dismantleL2Data();
    } else if (inparindex === 1) {
      this.dismantleL3Data();
    }
    console.info("check", checkedIndex);
    console.info("inparindex", inparindex);
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
