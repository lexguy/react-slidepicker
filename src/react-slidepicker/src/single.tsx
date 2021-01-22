/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:41:24
 * @LastEditTime: 2021-01-22 18:18:40
 * @LastEditors: xuwei
 * @Description:
 */
import React, {
  CSSProperties,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface ISingleProps {
  // list: object[];

  itemHeight: number; // per item height
  visibleNum: number; // visible lins
  // maskLines: 2, //
  activeBgColor?: string;
  activeBgOpacity?: number;
  activeFontSize?: number;
  activeFontColor?: string;

  normalBgColor?: string;
  normalBgOpacity?: number;
  normalFontSize?: number;
  normalFontColor?: string;

  inparindex: number; // 第几轮
  done: (a: number, b: number) => void;
}

export interface ISingleProps {
  list: any[];
  pickerDeep: number;
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
  pickerDeep: 3,
};

// SingleSlide.defaultProps = defaultSingleProps;

function SingleSlide(props: ISingleProps = defaultSingleProps, ref: any) {
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
    done,
    pickerDeep,
  } = props;

  const unuseNum = (visibleNum - 1) / 2;
  // max min 是  wrapOffset 取值的最大最小值
  const maxOffset = unuseNum * itemHeight; // 初始偏移,只能向上滑动   向上滑动的时候产生减小的offset
  const minOfffset = (unuseNum + 1 - list.length) * itemHeight; // 滑到最下面的偏移量

  const [offsetY, setOffSetY] = useState(maxOffset);
  const [checkedIndex, setCheckedIndex] = useState(0);

  const Width = (100 / pickerDeep).toFixed(1);
  // const Width = 33.3;

  // 保存实例变量的 useRef 的（TS）类型是自定义interface,
  // 绑定到 DOM div 上的时候是 HTMLDivElement
  // const eventRef = useRef<HTMLDivElement>(null);

  let comRef = useRef<ICurrent>({
    initOff: maxOffset,
    wrapOffset: maxOffset,
  }).current;

  useEffect(() => {
    done(0, inparindex);
  }, []);

  useEffect(() => {
    setOffSetY(maxOffset);
    setCheckedIndex(0);
    comRef.wrapOffset = maxOffset;
  }, [list]);

  useImperativeHandle(ref, () => ({
    resetData: () => {
      setOffSetY(maxOffset);
      setCheckedIndex(0);
      comRef.wrapOffset = maxOffset;
    },
  }));

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
      setOffSetAndDataBack(maxOffset, 0);
      return;
    }
    if (comRef.wrapOffset < minOfffset) {
      comRef.wrapOffset = minOfffset;
      setOffSetAndDataBack(minOfffset, list.length - 1);
      return;
    }
    correctPosition();
  };

  // 拖动结束的时候 计算修正
  const correctPosition = () => {
    const isPositive = comRef.wrapOffset > 0;
    let integer: number = Math.round(Math.abs(comRef.wrapOffset / itemHeight));
    const postion = isPositive
      ? integer * itemHeight
      : -1 * integer * itemHeight;
    const newIndex = Math.abs(postion / itemHeight - unuseNum);
    comRef.wrapOffset = postion;
    setOffSetAndDataBack(postion, newIndex);
  };

  // 设置选中索引，位置修正并返回选中值
  const setOffSetAndDataBack = (position: number, newIndex: number) => {
    setOffSetY(position);
    if (checkedIndex !== newIndex) {
      setCheckedIndex(newIndex);
      if (done) {
        done(newIndex, inparindex);
      }
    }
  };

  /** ----------------------------------- Render ----------------------------------------- */

  const maskstyle = {
    width: `${Width}vw`,
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
      style={{ width: `${Width}vw`, position: "relative", ...notouch }}
    >
      <div
        style={{
          position: "absolute",
          transform: `translateY(${offsetY}px)`,
          width: `${Width}vw`,
          display: "inline-block",
          overflow: "hidden",
        }}
      >
        {list.map((item, index) => (
          <span
            key={index}
            style={{
              color: index === checkedIndex ? activeFontColor : normalFontColor,
              fontSize:
                index === checkedIndex ? activeFontSize : normalFontSize,
              lineHeight: `${itemHeight}px`,
              height: itemHeight,
              display: "inline-block",
              textAlign: "center",
              width: "100%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              verticalAlign: "bottom",
              overflow: "hidden",
            }}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div style={maskstyle} />
      <div
        style={{
          width: `${Width}vw`,
          height: itemHeight,
          opacity: activeBgOpacity,
          backgroundColor: activeBgColor,
        }}
      />
      <div style={maskstyle} />
    </div>
  );
}

export const Slide = React.forwardRef(SingleSlide);

const notouch: CSSProperties = {
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  KhtmlUserSelect: "none",
  msUserSelect: "none",
  WebkitTouchCallout: "none",
};
