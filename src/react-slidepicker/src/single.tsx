/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:24
 * @LastEditTime: 2021-01-14 18:22:03
 * @LastEditors: xuwei
 * @Description:
 */
import React, { useRef, useState } from "react";

interface IProps {
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

interface ICurrent {
  initOff: number;
  wrapOffset: number;
}

export function SingleSlide(props: IProps) {
  const [offsetY, setOffSetY] = useState(0);
  // 保存实例变量的 useRef 的（TS）类型是自定义interface,
  // 绑定到 DOM div 上的时候是 HTMLDivElement
  let comRef = useRef<ICurrent>({ initOff: 0, wrapOffset: 0 }).current;

  /** ----------------------------------- Touch ----------------------------------------- */
  const onStart = (event: React.TouchEvent) => {
    const touchY = event.touches[0].pageY;
    comRef.initOff = touchY;
  };
  const onMoving = (event: React.TouchEvent) => {
    const touchY = event.touches[0].pageY;
    const transY = touchY - comRef.initOff + comRef.wrapOffset;
    setOffSetY(transY);
  };
  const onMoveEnd = (event: React.TouchEvent) => {
    const touchY = event.changedTouches[0].pageY;
    comRef.wrapOffset = comRef.wrapOffset + (touchY - comRef.initOff);
  };

  /** ----------------------------------- Render ----------------------------------------- */

  const {
    list,
    itemHeight,
    visibleNum,
    activeBgColor,
    normalBgColor,
    normalBgOpacity,
  } = props;
  return (
    <div
      onTouchMove={onMoving}
      onTouchStart={onStart}
      onTouchEnd={onMoveEnd}
      style={{
        transform: `translateY(${offsetY}px)`,
        width: `33.3vw`,
        display: "inline-block",
      }}
    >
      {[1, 1, 1, 11, 1].map((item, index) => (
        <div
          key={index}
          style={{
            width: `100%`,
            height: itemHeight,
            marginTop: 1,
            backgroundColor: "#a00",
          }}
        >
          <span>{index}</span>
        </div>
      ))}
    </div>
  );
}

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
