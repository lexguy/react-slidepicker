/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:40:59
 * @LastEditTime: 2021-03-06 17:55:15
 * @LastEditors: xuwei
 * @Description:
 */
import Picker from "./src/index";
import modal from "./src/modal";
import { WithHeadAndMethod } from "./src/pickerhoc";

export const withModal = modal;

export const CascadePicker = WithHeadAndMethod(Picker.CascadePicker);

export const ParallelPicker = Picker.CascadePicker;
