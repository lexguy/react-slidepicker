> React Native 版本- > <a href="https://github.com/lexguy/react-native-slidepicker">react-native-slidepicker</a>

## react-slidepicker

### <a href="https://github.com/lexguy/react-slidepicker/blob/main/EN.md">Document</a>

用于移动端的`React`选择器组件，使用`TypeScript`完成

- 自定义条目高度，背景色，文字样式，自定义选择器头部
- 支持使用级联选择和平行选择两种方式
- 自定义显示方式，可在 Modal 或绝对定位中使用

## 使用

安装:

```
npm install react-slidepicker
```

使用`yarn` :

```
yarn add react-slidepicker
```

引入:

```js
//Cascade data
import { CascadePicker } from "react-slidepicker";

//Parallel data
import { ParallelPicker } from "react-slidepicker";
```

如果需要带有弹出层，使用`withModal`:

```js
import { withModal, parallelPicker } from "react-slidepicker";
const ModalParPicker = withModal(ParallelPicker);
```

## 例子

```jsx
import { CascadePicker, withModal } from "../react-slidepicker/index.ts";
import Data from "./json/slidethree.json";

const ModalCasPicker = withModal(CascadePicker);

export default function App() {
  const [showName, setShowName] = useState(0);
  return (
    <div>
      <ModalCasPicker
        confirm={(arr) => {...}}
        cancel={() => setShowName(0)}
        show={showName === 1}
        dataSource={Data}
        pickerDeep={3}
        pickerStyle={{...}}
        headOptions={{ borderTopRadius: 10, backgroundColor: "#fff" }}
      >
        <span onClick={() => setShowName(1)}>选择地区</span>
      </ModalCasPicker>
....
```

---

## 属性 (props)

- [`show`](#show)

- [`dataSource`](#dataSource)
- [`pickerDeep`](#deep)
- [`confirm`](#confirm)
- [`cancel`](#cancel)
- [`pickerStyle`](#pickerStyle)
- [`headOptions`](#options)
- [`customHead`](#head)

<hr id='show'/ >

### `show : boolean`

表示是否显示`Modal`，如果使用了`widthModal`，就需要指定这个属性。

---

### `dataSource : array`

**必须**，选择器的数据源。

`name` 和`list` 是数据源的关键字 , `name` 会显示在组件中, `list` 是子列表数据。

[数据源的格式](https://github.com/lexguy/react-native-slidepicker#dataformat)

---

### `pickerDeep : number`

用于嵌套级联的选择器中，表示选择器的层级，**在级联选择器中必须**。

---

### `confirm : (dataArray) => { }`

如果没有使用`customHead`，那么就应该指定这个函数用作 `确认` 按钮的点击事件，用于接收确认选择的结果，返回一个结果数组。

---

### `cancel : () => { }`

如果没有使用`customHead`，那么就应该指定这个函数，用于 `取消` 按钮的点击事件。

---

### `pickerStyle : object`

选择器的样式属性，可以指定如下属性：

| Key             | Type            | Default Value | Description          |
| --------------- | --------------- | ------------- | -------------------- |
| itemHeight      | number          | 40            | 每一项的高度         |
| visibleNum      | number          | 5             | 显示的行数           |
| activeBgColor   | string (color)  | "#FFF"        | 选中项的背景色       |
| activeBgOpacity | number          | 1             | 选中项的背景透明度   |
| activeFontSize  | Number          | 18            | 选中项的字体大小     |
| activeFontColor | string (color)  | "#F00"        | 选中项的字体颜色     |
| normalBgColor   | string (color)  | "#FFF"        | 未选中项的背景色     |
| normalBgOpacity | number (0-1)    | 0.4           | 未选中项的背景透明度 |
| normalFontSize  | number          | 16            | 未选中项的字体大小   |
| normalFontColor | string：(color) | "#333"        | 未选中项的字体颜色   |

---

### `headOptions : object`

头部配置，文字和样式。接收如下属性

| key             | Type           | Default Value     | Description      |
| --------------- | -------------- | ----------------- | ---------------- |
| confirmText     | string         | Confirm           | 确认按钮文本     |
| cancelText      | string         | Cancel            | 取消按钮文本     |
| headHeight      | number         | 50                | 头部高度         |
| borderTopRadius | number         | 0                 | 头部的顶部圆角   |
| backgroundColor | string(color)  | #fff              | 背景色           |
| confirmStyle    | object (style) | {padding: '10px'} | 确认按钮文本样式 |
| cancelStyle     | object (style) | {padding: '10px'} | 取消按钮文本样式 |

------

### `customHead : view`

自定义头部，即滑动选择块上面的一部分内容，非必要参数。自定义头部会替换掉默认的包含「确认」，「取消」按钮的 View。

如果你需要在自定义的头部 View 中通过点击事件获取到结果，即达到「确认」按钮的效果，那就需要给当前`picker`组件指定一个 Ref，再通过`getResult`方法得到结果，详情参考下面的[`getResult方法`](#getresult)

## 方法

如果你使用了自定义头部，且包含了「确认」「取消」按钮，那么就需要为 picker 组件设置 ref。然后将 ref 上的方法绑定到你的确事件上才能获取到选择结果。

---

### `getResult()`

除非你使用自定义头部，否则都应该使用 [confirm 方法](#confirm) 表示选定， 而不是使用这个方法。

通过设置`ref`，可以实时获取到已选择的数据，如下：

```jsx
export default function App() {
  const [showName, setShowName] = useState(0);
  const pickerRef = useRef();
  return(
    <ModalParPicker
        ref={pickerRef}
        show={showName === 2}
        dataSource={Spec})
        ...
         customHead={
          <MyHead
            confirm={() => {
              const data = pickerRef.current.getResult();
              console.info("data2", data);
              setShowName(0);
            }}
          />
        }
    </ModalCasPicker>
```

## 实验性功能

### `onceChange : (dataArray) => { }`

每次选择改变发生都会执行，返回当前的实时结果。

### `defaultValueIndexes`

默认选中值，待完善

## 其他

数据源格式

**级联数据:**

```
[
  {
    "name": "Asia",
    "id": 1,
    "list": [
      {
        "name": "China",
        "id": 100,
        "list": [
          {
            "name": "Beijing",
            "id": 1101
          }
        ]
      },
      {
        "name": "South Korea",
        "id": 200,
        "list": []
      }
    ]
  }
]
```

**平行数据 ( 一个二维数组 ):**

```
[
  [
    {
      "name": "2015",
      "id": 11
    }
  ],
  [
    {
      "name": "july",
      "id": 201
    },
    {
      "name": "August",
      "id": 202
    }
  ],
  [
    {
      "name": "1st",
      "id": 2101
    }
  ]
]
```
