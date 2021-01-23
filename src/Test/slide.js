/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
 * @LastEditTime: 2021-01-23 17:19:56
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
        onceChange={(arr) => console.info("arr", arr)}
        pickerStyle={{
          visibleNum: 5,
          itemHeight: 40,
          normalFontColor: "#00a",
          normalFontSize: 10,
          activeFontSize: 18,
          activeBgColor: "#fff",
          activeBgOpacity: 1,
          activeFontColor: "#F00",
          normalBgColor: "#666",
          normalBgOpacity: 0.5,
        }}
      />
    </div>
  );
}
