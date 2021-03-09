/*
 * @Author: xuwei
 * @Date: 2021-01-08 11:20:53
 * @LastEditTime: 2021-03-09 21:18:32
 * @LastEditors: xuwei
 * @Description:
 */

import { useRef, useState } from "react";
import { CascadePicker, ParallelPicker, withModal } from "../react-slidepicker/index.ts";
import Data from "./json/slidethree.json";
import Spec from "./json/spec.json";
import ICON_DOG from "./imgs/dog.png";

const ModalCasPicker = withModal(CascadePicker);
const ModalParPicker = withModal(ParallelPicker);

export default function App() {
  const [showName, setShowName] = useState(0);
  const pickerRef = useRef();

  return (
    <div>
      <ModalCasPicker
        confirm={(arr) => {
          console.info("data1", arr);
          setShowName("");
        }}
        cancel={() => setShowName(0)}
        show={showName === 1}
        dataSource={Data}
        pickerDeep={3}
        value={["North America", "Canada", "Edmonton"]}
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
        headOptions={{
          borderTopRadius: 10,
          backgroundColor: "#fff",
          confirmStyle: { fontSize: 20, color: "#a00" },
        }}
      >
        <span onClick={() => setShowName(1)}>选择地区</span>
      </ModalCasPicker>

      <ModalParPicker
        ref={pickerRef}
        // 提供 customHead 的时候 confirm和cancel失效，应该在customHead中手动实现
        // confirm={(arr) => {
        //   console.info("data", arr);
        //   setShowName(0);
        // }}
        // cancel={() => setShowName(0)}
        show={showName === 2}
        dataSource={Spec}
        // pickerDeep={2}
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
        customHead={
          <MyHead
            confirm={() => {
              const data = pickerRef.current.getResult();
              console.info("data2", data);
              setShowName(0);
            }}
          />
        }
      >
        <div onClick={() => setShowName(2)}>选择规格</div>
      </ModalParPicker>
    </div>
  );
}

function MyHead({ confirm }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#333" }}>
      <img src={ICON_DOG} alt="dog" style={{ width: 30, height: 30, margin: `8px 0 0 10px` }}></img>
      <span style={{ fontSize: 18, color: "#fff", padding: 10 }} onClick={confirm}>
        确认
      </span>
    </div>
  );
}
