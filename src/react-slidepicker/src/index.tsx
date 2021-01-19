/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:34
 * @LastEditTime: 2021-01-19 19:11:59
 * @LastEditors: xuwei
 * @Description:
 */
import React, { createRef, MutableRefObject, useRef } from "react";
import { defaultSingleProps, ISingleProps, Slide } from "./single";

interface IPickerProps {
  itemHeight: number;
  // list: [];
  dataSource: object[];
  pickerStyle: ISingleProps;
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
  singleRef: React.RefObject<IRef>;
  constructor(props: any) {
    super(props);
    this.state = {
      result: [],
    };
    this.singleRef = createRef();
  }

  /** ----------------------------------- Data ----------------------------------------- */

  setData = (checkedIndex: number, inparindex: number) => {
    // const result = this.state.result.slice();
    // result[inparindex]=
    if (this.singleRef.current) {
      this.singleRef.current.show();
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
        {[1, 2, 3].map((ele, index) => (
          <Slide
            ref={this.singleRef}
            key={index}
            {...SingleProps}
            // list={this.props.dataSource}
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

interface IRef {
  show: () => void;
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
