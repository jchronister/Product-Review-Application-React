import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import React, {useState} from "react"

// Props
// fieldList {key: "Name"} in Order
// header true/falseee
// data []

export function CreateTable (props) {

  const fields = Object.keys(props.fieldList);

  return (

    <table><tbody>

    {/* Add Header */}
    {props.header && <tr>{fields.map((n, i) => <th key={i}>{props.fieldList[n]}</th>)}</tr>}

    {/* Add Rows */}
    {props.data.map(product => (
      <tr key={product.id}>

        {/* Add Columns/Cells */}
        {fields.map((n, i)=><td key={product.id + i}>{product[n]}</td>)}

      </tr>
    ))}

    </tbody></table>
  )

}


// export function Button () {


// }


export function ToggleButtonGroupControlled() {

  const [value, setValue] = useState([1, 3]);

  /*
   * The second argument that will be passed to
   * `handleChange` from `ToggleButtonGroup`
   * is the SyntheticEvent object, but we are
   * not using it in this example so we will omit it.
   */
  const handleChange = (val) => setValue(val);

  return (
    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
      <label>Rating</label>
      <ToggleButton value={1}>Bad</ToggleButton>
      <ToggleButton value={2}>Good</ToggleButton>
      <ToggleButton value={3}>Excellent</ToggleButton>
    </ToggleButtonGroup>
  );
}


// TextBox with Label
// Props
// name - Required
// labelCaption - Required
// onChange
export function Textbox (props) {

  const {id, name, labelCaption, ...attributes} = props

  return [
  <label htmlFor={id || name}>{labelCaption}</label>,
  <input
    type="text"
    className= {props.className || "mx-sm-3"}
    id={id || name}
    {...attributes}
  />
  ]

}


// Returns Bootstrap Button
// title
export const XButton = React.memo(function ({title, ...attributes}) {

  return (<Button {...attributes}>{title || "Click"}</Button>)

})