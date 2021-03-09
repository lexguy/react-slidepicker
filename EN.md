> React Native - > <a href="https://github.com/lexguy/react-native-slidepicker">react-native-slidepicker</a>

## react-slidepicker

###

A react picker conponent, achived by typescript , used in address picker and other picker scenes.

- custom height,backgroundColor,fontSize,fontColor,or even picker header.
- support parallel data and cascade data.
- can be used in modal or absolute position.

## Usage

install:

```
npm install react-slidepicker
```

or with yarn :

```
yarn add react-slidepicker
```

import:

```js
//Cascade data
import { CascadePicker } from "react-slidepicker";

//Parallel data
import { ParallelPicker } from "react-slidepicker";
```

if you want to use it with `Modal`， you need `withModal`：

```js
import { withModal, parallelPicker } from "react-slidepicker";
const ModalParPicker = withModal(ParallelPicker);
```

## Example

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

## props

- [`show`](#show)
- [`dataSource`](#dataSource)
- [`pickerDeep`](#deep)
- [`confirm`](#confirm)
- [`cancel`](#cancel)
- [`pickerStyle`](#pickerStyle)
- [`headOptions`](#options)
- [`customHead`](#customHead)

<hr id='show' />

### `show : boolean`

if you use `withModal`hoc，this prop is **required**.

<hr id='dataSource' />

### `dataSource : array`

**required**. data source of the picker。

`name` and `list` are keywords , `name` will be shown in the picker, `list` should be a array.

[Data format to follow](#dataformat)

<hr id='pickerDeep' />

### `pickerDeep : number`

only used in CascadePicker, the num of sub pickers, **required**.

<hr id='confirm' />

### `confirm : (dataArray) => { }`

if you won't use the customeHead, this function is required. called by confirm button, send the picker data back.

<hr id='cancel' />

### `cancel : () => { }`

if you won't use the customeHead, this function is required. called by cancel button, you should close the picker in this function.

<hr id='pickerStyle' />

### `pickerStyle : object`

a custom style for the picker content , receives these props:

| Key             | Type            | Default Value | Description                            |
| --------------- | --------------- | ------------- | -------------------------------------- |
| itemHeight      | number          | 40            | item's height                          |
| visibleNum      | number          | 5             | Number of rows                         |
| activeBgColor   | string (color)  | "#FFF"        | Background color of selected item      |
| activeBgOpacity | number          | 1             | Background opacity of selected items   |
| activeFontSize  | Number          | 18            | Font size of selected item             |
| activeFontColor | string (color)  | "#F00"        | Font color of selected item            |
| normalBgColor   | string (color)  | "#FFF"        | Unselected item background color       |
| normalBgOpacity | number (0-1)    | 0.4           | Background opacity of unselected items |
| normalFontSize  | number          | 16            | Unselected item font color             |
| normalFontColor | string：(color) | "#333"        | Unselected item font color             |

<hr id='headOptions' />

### `headOptions : object`

a custom style for the picker header , receives these props:

| key             | Type           | Default Value     | Description                 |
| --------------- | -------------- | ----------------- | --------------------------- |
| confirmText     | string         | Confirm           | confirm button text         |
| cancelText      | string         | Cancel            | cancel button text          |
| headHeight      | number         | 50                | height of header            |
| borderTopRadius | number         | 0                 | borderTop(Left&Right)Radius |
| backgroundColor | string(color)  | #FFF              | backgroundcolor             |
| confirmStyle    | object (style) | {padding: '10px'} | confirm text style          |
| cancelStyle     | object (style) | {padding: '10px'} | cancel text style           |

<hr id='customHead' />

### `customHead : view`

a rendered view, will replace the view that contains the [confirm]、[cancel] buttons.

you should provide the ref , and call `getResult` method to get the result of the picker. [`getResult method`](https://github.com/lexguy/react-native-slidepicker#getresult)

## Method

if you custom the head, then you have to call `getResult` method by ref to get result.

<hr id='getResult' />

### `getResult()`

unless you use customed header，or you should use `confirm` method. you can get the result by this function , just like the following:

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

## Experimental

### `onceChange : (dataArray) => { }`

once change the picker, it will be called and send current result back.

### `defaultValueIndexes`

only available in ParallelPicker for now...

<hr id="dataformat" />
## Others

format of dataSource prop:

**for cascade data:**

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

**for parallel data ( a two-dimensional array ):**

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
