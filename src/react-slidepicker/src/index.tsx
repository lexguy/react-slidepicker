import React from "react";
import { SingleSlide } from "./single";
class RePicker extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <SingleSlide
        list={[]}
        itemHeight={50}
        inparindex={1}
        visibleNum={5}
        done={() => {}}
      />
    );
  }
}

export default { RePicker };
