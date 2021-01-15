import React from "react";
import { defaultSingleProps, ISingleProps, SingleSlide } from "./single";

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

class RePicker extends React.PureComponent<IPickerProps> {
  static defaultProps = defaultProps;
  constructor(props: any) {
    super(props);
  }
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
          <SingleSlide
            key={index}
            {...SingleProps}
            // list={this.props.dataSource}
            list={[{}, {}, {}, {}]}
            inparindex={1}
            done={() => {}}
            activeFontColor={"#000"}
            normalFontColor={"#000"}
            activeFontSize={20}
          />
        ))}

        <div />
      </div>
    );
  }
}

export default { RePicker };
