/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:34
 * @LastEditTime: 2021-01-20 16:23:33
 * @LastEditors: xuwei
 * @Description:
 */
import React, { createRef, MutableRefObject, useRef } from "react";
import { defaultSingleProps, ISingleProps, Slide } from "./single";

interface IRef {
  resetData: () => void;
}
interface IPickerProps {
  itemHeight: number;
  // list: [];
  dataSource: any[];
  pickerStyle: ISingleProps;
  pickerDeep: number;
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
    result: [];
  };
  refArray: React.RefObject<IRef>[];
  result: any[]; //保存已选择的结果,只存 Index
  constructor(props: any) {
    super(props);
    this.state = {
      result: [],
    };
    this.refArray = [];
    this.initRefArray();
    this.result = [];
  }

  /** ----------------------------------- Data ----------------------------------------- */

  initRefArray = () => {
    const { pickerDeep } = this.props;
    for (let i = 0; i < pickerDeep; i++) {
      this.refArray[i] = React.createRef();
    }
  };

  setData = (checkedIndex: number, inparindex: number) => {
    this.result[inparindex] = checkedIndex;
    const { pickerDeep } = this.props;
    if (inparindex < pickerDeep) {
      for (let i = inparindex + 1; i < this.refArray.length; i++) {
        const element = this.refArray[i];
        this.result[i] = 0;
        if (element && element.current) {
          element.current.resetData();
        }
      }
    }
  };

  /** ----------------------------------- Render ----------------------------------------- */
  render() {
    const TProps = this.props;
    const SingleProps = TProps.pickerStyle;
    return (
      <div
        style={{
          height: SingleProps.visibleNum * SingleProps.itemHeight,
          flexDirection: "row",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {TProps.dataSource.map((ele, index) => (
          <Slide
            ref={this.refArray[index]}
            key={index}
            {...SingleProps}
            // list={ele.list}
            list={[{}, {}, {}, {}]}
            inparindex={index}
            done={this.setData}
            // activeFontColor={"#000"}
            // normalFontColor={"#000"}
            // activeFontSize={20}
          />
        ))}

        <div />
      </div>
    );
  }
}

// function CascadePicker(props: IPickerProps) {
//   const singleRef = useRef<IRef>(null);

//   const setData = (checkedIndex: number, inparindex: number) => {
//     // const result = this.state.result.slice();
//     // result[inparindex]=
//   };

//   /** ----------------------------------- Render ----------------------------------------- */

//   const TProps = props;
//   const SingleProps = TProps.pickerStyle;
//   return (
//     <div
//       style={{
//         height: SingleProps.visibleNum * SingleProps.itemHeight,
//         flexDirection: "row",
//         display: "flex",
//         overflow: "hidden",
//       }}
//     >
//       {[1, 2, 3].map((ele, index) => (
//         <Slide
//           ref={singleRef}
//           key={index}
//           {...SingleProps}
//           // list={this.props.dataSource}
//           list={[{}, {}, {}, {}]}
//           inparindex={index}
//           done={() => {
//             if (singleRef.current) {
//               singleRef.current.show();
//             }
//           }}
//           // done={this.setData}
//           // activeFontColor={"#000"}
//           // normalFontColor={"#000"}
//           // activeFontSize={20}
//         />
//       ))}

//       <div />
//     </div>
//   );
// }

export default { CascadePicker };
