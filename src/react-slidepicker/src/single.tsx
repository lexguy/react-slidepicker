/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:24
 * @LastEditTime: 2021-01-16 00:38:51
 * @LastEditors: xuwei
 * @Description:
 */
import React, { CSSProperties, useRef, useState } from "react";

export interface ISingleProps {
  // list: object[];

  itemHeight: number; // per item height
  visibleNum: number; // visible lins
  // maskLines: 2, //
  activeBgColor?: string;
  activeBgOpacity?: number;
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

export interface ISingleProps {
  list: object[];
}

interface ICurrent {
  initOff: number;
  wrapOffset: number;
}

export const defaultSingleProps = {
  list: [],
  itemHeight: 50,
  visibleNum: 3,
  activeBgColor: "#fff",
  activeBgOpacity: 1,
  activeFontSize: 18,
  activeFontColor: "#00a",
  normalBgColor: "#000",
  normalBgOpacity: 0.5,
  normalFontSize: 18,
  normalFontColor: "#0a0",
  inparindex: 1,
  done: () => {},
};

SingleSlide.defaultProps = defaultSingleProps;

export function SingleSlide(props: ISingleProps = defaultSingleProps) {
  const {
    list,
    itemHeight,
    visibleNum,
    activeFontSize,
    activeFontColor,
    activeBgColor,
    activeBgOpacity,
    normalBgColor,
    normalBgOpacity,
    normalFontSize,
    normalFontColor,
    inparindex,
  } = props;

  const unuseNum = (visibleNum - 1) / 2;
  // max min 是  wrapOffset 取值的最大最小值
  const maxOffset = unuseNum * itemHeight; // 初始偏移,只能向上滑动   向上滑动的时候产生减小的offset
  const minOfffset = (unuseNum + 1 - list.length) * itemHeight; // 滑到最下面的偏移量

  const [offsetY, setOffSetY] = useState(maxOffset);

  // 保存实例变量的 useRef 的（TS）类型是自定义interface,
  // 绑定到 DOM div 上的时候是 HTMLDivElement
  // const eventRef = useRef<HTMLDivElement>(null);

  let comRef = useRef<ICurrent>({
    initOff: maxOffset,
    wrapOffset: maxOffset,
  }).current;

  /** ----------------------------------- Touch ----------------------------------------- */
  const onStart = (event: React.TouchEvent) => {
    const touchY = event.touches[0].pageY;
    comRef.initOff = touchY;
  };
  const onMoving = (event: React.TouchEvent) => {
    const touchY = event.touches[0].pageY;
    const transY = touchY - comRef.initOff + comRef.wrapOffset;
    if (transY > maxOffset || transY < minOfffset) {
      return;
    }
    setOffSetY(transY);
  };
  const onMoveEnd = (event: React.TouchEvent) => {
    const touchY = event.changedTouches[0].pageY;
    comRef.wrapOffset = comRef.wrapOffset + (touchY - comRef.initOff);
    if (comRef.wrapOffset > maxOffset) {
      comRef.wrapOffset = maxOffset;
      return;
    }
    if (comRef.wrapOffset < minOfffset) {
      comRef.wrapOffset = minOfffset;
      return;
    }
    correctPosition();
  };

  // 拖动结束的时候 位置修正
  const correctPosition = () => {
    const isPositive = comRef.wrapOffset > 0;
    let integer: number = Math.round(Math.abs(comRef.wrapOffset / itemHeight));
    const postion = isPositive
      ? integer * itemHeight
      : -1 * integer * itemHeight;
    comRef.wrapOffset = postion;
    setOffSetY(postion);
  };

  /** ----------------------------------- Render ----------------------------------------- */

  const maskstyle = {
    width: "33.3vw",
    height: unuseNum * itemHeight,
    opacity: normalBgOpacity,
    backgroundColor: normalBgColor,
  };

  return (
    <div
      // ref={eventRef}
      onTouchMove={onMoving}
      onTouchStart={onStart}
      onTouchEnd={onMoveEnd}
      style={{ width: "33.3vw", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          transform: `translateY(${offsetY}px)`,
          width: `33.3vw`,
          display: "inline-block",
        }}
      >
        {list.map((item, index) => (
          <span
            key={index}
            style={{
              ...itemstyle,
              height: itemHeight,
              color: activeFontColor || normalFontColor,
              fontSize: activeFontSize || normalFontSize, //TODO  区分选中状态设定大小和颜色
            }}
          >
            {index}
          </span>
        ))}
      </div>
      <div style={maskstyle} />
      <div
        style={{
          width: "33.3vw",
          height: itemHeight,
          opacity: activeBgOpacity,
          backgroundColor: activeBgColor,
        }}
      />
      <div style={maskstyle} />
    </div>
  );
}

const itemstyle: CSSProperties = {
  // width: `100%`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// interface State {
//   offsetY: number;
// }
// export class SingleSlide extends React.Component<IProps> {
//   initOff: number;
//   wrapOffset: number;
//   state: State;
//   constructor(props: IProps) {
//     super(props);
//     this.initOff = 0;
//     this.wrapOffset = 0; //每次手势结束后计算 div 基于初始位置的偏移
//     this.state = { offsetY: 0 };
//   }

//   /** ----------------------------------- Touch ----------------------------------------- */
//   onStart = (event: React.TouchEvent) => {
//     const touchY = event.touches[0].pageY;
//     this.initOff = touchY;
//     console.info("Init", this.initOff);
//   };
//   onMoving = (event: React.TouchEvent) => {
//     const touchY = event.touches[0].pageY;
//     const transY = touchY - this.initOff + this.wrapOffset;
//     this.setState({ offsetY: transY });
//     console.info("-------------------------------");
//     console.info("ING--touchY", touchY);
//     console.info("ING--initOff", this.initOff);
//     console.info("ING--transY", transY);
//   };
//   onMoveEnd = (event: React.TouchEvent) => {
//     const touchY = event.changedTouches[0].pageY;
//     this.wrapOffset = this.wrapOffset + (touchY - this.initOff);
//     console.info("END", event);
//     console.info("wrapOffset", this.wrapOffset);
//   };

//   /** ----------------------------------- Render ----------------------------------------- */
//   render() {
//     const {
//       list,
//       itemHeight,
//       visibleNum,
//       activeBgColor,
//       normalBgColor,
//       normalBgOpacity,
//     } = this.props;
//     return (
//       <div
//         onTouchMove={this.onMoving}
//         onTouchStart={this.onStart}
//         onTouchEnd={this.onMoveEnd}
//         style={{
//           transform: `translateY(${this.state.offsetY}px)`,
//           width: `33.3vw`,
//           display: "inline-block",
//         }}
//       >
//         {[1, 1, 1, 11, 1].map((item, index) => (
//           <div
//             key={index}
//             style={{
//               width: `100%`,
//               height: itemHeight,
//               marginTop: 1,
//               backgroundColor: "#a00",
//             }}
//           >
//             <span>{index}</span>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }
