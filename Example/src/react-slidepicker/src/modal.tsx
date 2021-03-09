/*
 * @Author: xuwei
 * @Date: 2021-01-25 11:40:06
 * @LastEditTime: 2021-03-09 14:20:34
 * @LastEditors: xuwei
 * @Description:
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  show: boolean;
  forwardedRef: React.ForwardedRef<any>;
}

export default function withModal(Picker: typeof Component) {
  class Real extends React.Component<ModalProps> {
    _divEle: HTMLDivElement | null;
    private _body: HTMLElement;
    constructor(props: ModalProps | Readonly<ModalProps>) {
      super(props);
      this._divEle = null;
      this.freshModal();
      this._body = document.body;
    }

    componentDidUpdate() {
      this.freshModal();
    }

    freshModal = () => {
      if (this.props.show) {
        this._divEle = document.createElement("div");
        this._divEle.id = "tempmodal";
        this._body.appendChild(this._divEle);
        ReactDOM.render(
          <Modal Picker={Picker} pickerRef={this.props.forwardedRef} {...this.props} />,
          document.querySelector("#tempmodal")
        );
      } else {
        if (this._divEle && this._body.contains(this._divEle)) {
          this._body.removeChild(this._divEle);
        }
      }
    };

    render() {
      return this.props.children;
    }
  }
  return React.forwardRef((props: ModalProps, ref) => <Real {...props} forwardedRef={ref} />);
}

interface MProps {
  Picker: typeof React.Component;
  pickerRef: React.ForwardedRef<any>;
}

function Modal(props: MProps) {
  const { Picker, ...otherProps } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: `100vw`,
        height: `100vh`,
        backgroundColor: "#000000aa",
      }}
    >
      <Picker {...otherProps} ref={props.pickerRef} />
    </div>
  );
}
