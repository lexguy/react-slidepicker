/*
 * @Author: xuwei
 * @Date: 2021-03-06 16:29:06
 * @LastEditTime: 2021-03-09 11:26:47
 * @LastEditors: xuwei
 * @Description:
 */

import React, { Component, CSSProperties, useImperativeHandle, useRef } from "react";
import { ISingleProps } from "./single";

/** ----------------------------------- Type ----------------------------------------- */
// Head
export interface IHeadProps {
  confirmText: string;
  cancelText: string;
  headHeight: number;
  backgroundColor: string;
  confirmStyle: object;
  cancelStyle: object;
  borderTopRadius: number;
}

export type IndeData = { name: string }[];
// Picker
export interface IPickerProps {
  dataSource: IListObj[] | IndeData[];
  pickerDeep: number;
  defaultValueIndexes?: number[];
  confirm: (arr: object[]) => void;
  onceChange: (arr: object[]) => void;
  cancel: () => void;
  pickerStyle: ISingleProps;
  headOptions: IHeadProps;
  customHead: {};
  setResult: (index: number, item: { name?: string }) => {};
}

export interface IListObj {
  list?: [];
  name?: string;
}

/** ----------------------------------- Deafult ----------------------------------------- */

export const defaultHeadOptions = {
  confirmText: "确认",
  cancelText: "取消",
  headHeight: 46,
  backgroundColor: "#fff",
  confirmStyle: {},
  cancelStyle: {},
  borderTopRadius: 0,
};

export const defaultSingleProps = {
  list: [],
  index: 0,
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

export const defaultPickerProps = {
  dataSource: [], //data
  pickerDeep: 3,
  onceChange: (arr: []) => {}, // once change callback
  confirm: (arr: []) => {}, //confirm  send data back
  cancel: () => {},
  customHead: null,
  pickerStyle: defaultSingleProps,
  headOptions: defaultHeadOptions,
};

/** ----------------------------------- Hoc ----------------------------------------- */

export function WithHeadAndMethod<T extends IPickerProps>(WrapComponent: typeof Component) {
  return React.forwardRef((props: T, ref) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const local = useRef<{ resultArray: object[]; headOptions: IHeadProps }>({
      resultArray: [],
      headOptions: { ...defaultHeadOptions, ...props.headOptions },
    }).current;

    function _setResult(index: number, value: {}) {
      local.resultArray[index] = value;
    }

    useImperativeHandle(ref, () => ({
      getResult: () => local.resultArray, // ref
    }));

    function confirm() {
      if (props.confirm) {
        props.confirm(local.resultArray);
      } else {
        console.warn(`[slidepicker] should provide 'confirm' method`);
      }
    }
    function cancel() {
      if (props.cancel) {
        props.cancel();
      } else {
        console.warn(`[slidepicker] should provide 'cancel' method`);
      }
    }

    function onceChange() {
      props.onceChange && props.onceChange(local.resultArray);
    }

    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: local.headOptions.borderTopRadius,
          borderTopRightRadius: local.headOptions.borderTopRadius,
          overflow: "hidden",
        }}
      >
        {props.customHead ? (
          props.customHead
        ) : (
          <Head headOptions={local.headOptions} cancel={cancel} confirm={confirm} />
        )}
        <div
          style={{
            height: props.pickerStyle.visibleNum * props.pickerStyle.itemHeight,
            flexDirection: "row",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <WrapComponent
            {...props}
            setResult={_setResult}
            confirm={confirm}
            cancel={cancel}
            onceChange={onceChange}
          />
        </div>
      </div>
    );
  });
}

function Head({
  headOptions,
  cancel,
  confirm,
}: {
  headOptions: IHeadProps;
  cancel: () => void;
  confirm: () => void;
}) {
  return (
    <div
      style={{
        backgroundColor: headOptions.backgroundColor,
        height: headOptions.headHeight,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={lbtnstyle} onClick={cancel}>
        取消
      </span>
      <span style={rbtnstyle} onClick={confirm}>
        确认
      </span>
    </div>
  );
}

const rbtnstyle: CSSProperties = {
  display: "inline-block",
  padding: `10px`,
};
const lbtnstyle: CSSProperties = {
  ...rbtnstyle,
  borderTopLeftRadius: 5,
};
