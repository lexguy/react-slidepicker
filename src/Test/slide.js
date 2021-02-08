/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
<<<<<<< HEAD
 * @LastEditTime: 2021-01-25 18:24:32
=======
 * @LastEditTime: 2021-01-28 23:13:34
>>>>>>> 838fab28dea8c4f2612039d13949843706f19c26
 * @LastEditors: xuwei
 * @Description:
 */

import { useState } from "react";
import { CascadePicker, withModal } from "../react-slidepicker/index.ts";
import Data from "./json/slidethree.json";

const ModalCasPicker = withModal(CascadePicker);

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
        confirm={(arr) => console.info("confirm", arr)}
        cancel={() => console.info("cancel")}
        pickerStyle={{
          visibleNum: 5,
          itemHeight: 40,
          normalFontColor: "#00a",
          normalFontSize: 10,
          normalBgColor: "#666",
          normalBgOpacity: 0.5,
          activeFontSize: 18,
          activeBgColor: "#fff",
          activeBgOpacity: 1,
          activeFontColor: "#F00",
        }}
<<<<<<< HEAD
      >
        <span onClick={() => setIsShow(true)}>xw</span>
      </ModalCasPicker>
=======
        headOptions={{ borderTopRadius: 10, backgroundColor: "#fff" }}
      />
>>>>>>> 838fab28dea8c4f2612039d13949843706f19c26
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
