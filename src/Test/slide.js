/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
 * @LastEditTime: 2021-01-20 16:13:45
 * @LastEditors: xuwei
 * @Description:
 */

import { CascadePicker } from "../react-slidepicker/index.ts";
import Data from "./json/slidethree.json";

export default function App() {
  return (
    <div>
      <CascadePicker
        dataSource={Data}
        pickerStyle={{
          visibleNum: 5,
          // TODO  itemHeight 不设置读不到默认值
          itemHeight: 50,
          normalFontColor: "#00a",
          normalFontSize: 15,
          activeFontSize: 25,
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
