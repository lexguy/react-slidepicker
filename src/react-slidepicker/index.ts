/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:40:59
 * @LastEditTime: 2021-03-08 11:10:01
 * @LastEditors: xuwei
 * @Description:
 */
import RelaPicker from "./src/relatived";
import IndePicker from "./src/independent";
import modal from "./src/modal";
import { WithHeadAndMethod } from "./src/pickerhoc";

export const withModal = modal;

export const CascadePicker = WithHeadAndMethod(RelaPicker);
export const ParallelPicker = WithHeadAndMethod(IndePicker);

// export const ParallelPicker = Picker.CascadePicker;
