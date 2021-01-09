/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:24
 * @LastEditTime: 2021-01-09 17:24:27
 * @LastEditors: xuwei
 * @Description:
 */
import React, { useState } from "react";

interface Props {
  list: object[];
  itemHeight: number; // per item height
  visibleNum: number; // visible lins
  // maskLines: 2, //
  activeBgColor?: string;
  // activeBgColor: '#EEE8AA',
  activeFontSize?: number;
  activeFontColor?: string;

  normalBgColor?: string;
  normalBgOpacity?: number;
  normalFontSize?: number;
  normalFontColor?: string;
  inparindex?: number;
  done: (a: number, b: number) => void;
}

let initOff = 0;
let wrapOffset = 0; //每次手势结束后计算 div 基于初始位置的偏移

export function SingleSlide(props: Props) {
  const [offsetY, setOffsetY] = useState(0);
  function onStart(event: React.TouchEvent) {
    const touchY = event.touches[0].pageY;
    initOff = touchY;
    console.info("Init", initOff);
  }
  function onMoving(event: React.TouchEvent) {
    const touchY = event.touches[0].pageY;
    const transY = touchY - initOff + wrapOffset;
    setOffsetY(transY);
    console.info("-------------------------------");
    console.info("ING--touchY", touchY);
    console.info("ING--initOff", initOff);
    console.info("ING--transY", transY);
  }
  function onMoveEnd(event: React.TouchEvent) {
    const touchY = event.changedTouches[0].pageY;
    wrapOffset = wrapOffset + (touchY - initOff);
    console.info("END", event);
    console.info("wrapOffset", wrapOffset);
  }
  const {
    list,
    itemHeight,
    visibleNum,
    activeBgColor,
    normalBgColor,
    normalBgOpacity,
  } = props;
  return (
    <div>
      <div
        onTouchMove={onMoving}
        onTouchStart={onStart}
        onTouchEnd={onMoveEnd}
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        {[1, 1, 1, 11, 1].map((item, index) => (
          <div
            key={index}
            style={{
              width: 100,
              height: itemHeight,
              marginTop: 1,
              backgroundColor: "#a00",
            }}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
}
