/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
 * @LastEditTime: 2021-03-08 11:48:34
 * @LastEditors: xuwei
 * @Description:
 */

import { useState } from "react";
import { CascadePicker, withModal, ParallelPicker } from "../react-slidepicker/index.ts";
import Data from "./json/slidethree.json";
import Spec from "./json/spec.json";

// const ModalCasPicker = withModal(CascadePicker);
const ModalCasPicker = CascadePicker;
// const
const ModalParPicker = withModal(ParallelPicker);

export default function App() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      {/* <div style={{ height: 100, backgroundColor: "#a00" }}></div> */}
      {/* <ModalCasPicker
        confirm={(arr) => {
          console.info("arr", arr);
          setIsShow(false);
        }}
        cancel={() => setIsShow(false)}
        show={isShow}
        dataSource={Data}
        pickerDeep={3}
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
      </ModalCasPicker> */}

      <ModalParPicker
        confirm={(arr) => {
          console.info("arr", arr);
          setIsShow(false);
        }}
        cancel={() => setIsShow(false)}
        show={isShow}
        dataSource={Spec}
        pickerDeep={2}
        // onceChange={(arr) => console.info("oncechange", arr)}
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
      </ModalParPicker>
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
