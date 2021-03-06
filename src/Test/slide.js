/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
 * @LastEditTime: 2021-03-06 16:18:26
 * @LastEditors: xuwei
 * @Description:
 */

import { useState } from "react";
import { CascadePicker, withModal } from "../react-slidepicker/index.ts";
import Data from "./json/slidethree.json";

// const ModalCasPicker = withModal(CascadePicker);
const ModalCasPicker = CascadePicker;

export default function App() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      {/* <div style={{ height: 100, backgroundColor: "#a00" }}></div> */}
      <ModalCasPicker
        confirm={() => setIsShow(false)}
        cancel={() => setIsShow(false)}
        show={isShow}
        dataSource={Data}
        pickerDeep={3}
        onceChange={(arr) => console.info("oncechange", arr)}
        // confirm={(arr) => console.info("confirm", arr)}
        // cancel={() => console.info("cancel")}
        pickerStyle={{
          visibleNum: 3,
          itemHeight: 40,
          normalFontColor: "#00a",
          normalFontSize: 12,
          normalBgColor: "#666",
          normalBgOpacity: 0.5,
          activeFontSize: 18,
          activeBgColor: "#fff",
          activeBgOpacity: 1,
          activeFontColor: "#F00",
        }}
        headOptions={{ borderTopRadius: 10, backgroundColor: "#fff" }}
      >
        <span onClick={() => setIsShow(true)}>xw</span>
      </ModalCasPicker>
    </div>
  );

  // <div
  //   style={{
  //     backgroundColor: "#333333dd",
  //     height: `100vh`,
  //     display: "flex",
  //     flexDirection: "column",
  //     flex: 1,
  //     justifyContent: "flex-end",
  //   }}
  // >
  //   <CascadePicker
  //     dataSource={Data}
  //     pickerDeep={3}
  //     onceChange={(arr) => console.info("arr", arr)}
  //     pickerStyle={{
  //       visibleNum: 5,
  //       itemHeight: 40,
  //       normalFontColor: "#00a",
  //       normalFontSize: 10,
  //       activeFontSize: 18,
  //       activeBgColor: "#fff",
  //       activeBgOpacity: 1,
  //       activeFontColor: "#F00",
  //       normalBgColor: "#666",
  //       normalBgOpacity: 0.5,
  //     }}
  //   />
  // </div>
}
