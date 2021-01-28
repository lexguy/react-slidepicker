/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
 * @LastEditTime: 2021-01-28 23:13:34
 * @LastEditors: xuwei
 * @Description:
 */

import { CascadePicker } from "../react-slidepicker/index.ts";
import Data from "./json/slidethree.json";

export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#333333dd",
        height: `100vh`,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <CascadePicker
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
        headOptions={{ borderTopRadius: 10, backgroundColor: "#fff" }}
      />
    </div>
  );
}
