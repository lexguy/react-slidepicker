import React from "react";
import { SingleSlide } from "./single";
class RePicker extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          // backgroundColor: "#00c",
          // width: `33vw`,
          height: 150,
          flexDirection: "row",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <SingleSlide
          list={[]}
          itemHeight={50}
          inparindex={1}
          visibleNum={3}
          done={() => {}}
        />
        <SingleSlide
          list={[{}, {}]}
          itemHeight={50}
          inparindex={1}
          visibleNum={5}
          done={() => {}}
        />
        <SingleSlide
          list={[{}, {}]}
          itemHeight={50}
          inparindex={1}
          visibleNum={5}
          done={() => {}}
        />

        <div />
      </div>
    );
  }
}

export default { RePicker };
