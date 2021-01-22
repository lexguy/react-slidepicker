/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
 * @LastEditTime: 2021-01-22 16:58:15
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
