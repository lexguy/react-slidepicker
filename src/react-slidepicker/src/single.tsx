/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:24
 * @LastEditTime: 2021-01-08 18:03:09
 * @LastEditors: xuwei
 * @Description:
 */
import React from "react";

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

export function SingleSlide(props: Props) {
  function onStart(event: React.TouchEvent) {
    console.info("START", event.touches[0].pageY);
  }
  function onMoving(event: React.TouchEvent) {
    console.info("e", event);
    console.info("START", event.touches[0].pageY);
  }
  function onMoveEnd() {}
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
        style={{ transform: "translateY(100px)" }}
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
