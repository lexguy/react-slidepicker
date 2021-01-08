/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:24
 * @LastEditTime: 2021-01-08 11:17:00
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
      <div>
        {[1, 1, 1, 11, 1].map((item, index) => (
          <div style={{ height: itemHeight, backgroundColor: "#a00" }}></div>
        ))}
      </div>
    </div>
  );
}
