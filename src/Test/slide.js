/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
 * @LastEditTime: 2021-01-15 19:23:25
 * @LastEditors: xuwei
 * @Description:
 */

import { CascadePicker } from "../react-slidepicker/index.ts";

export default function App() {
  return (
    <div>
      <CascadePicker
        pickerStyle={{
          visibleNum: 5,
          // TODO  itemHeight 不设置读不到默认值
          itemHeight: 50,
        }}
      />
    </div>
  );
}
