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

  const {id, name, labelCaption, className, ...attributes} = props

  return [
  <label htmlFor={id || name} key = {name + 0}>{labelCaption}</label>,
  <input
    type="text"
    key = {name + 1}
    className= {className || "mx-sm-3"}
    id={id || name}
    name={name}
    {...attributes}
     
  />
  ]

}


// Returns Bootstrap Button
// title
export const XButton = React.memo(function ({title, ...attributes}) {

  return (<Button {...attributes}>{title || "Click"}</Button>)

})




// Textbox or Text Area with Label
export function FormTextbox (props) {

  const {textArea, title, name, id={name}, ...attributes} = props

  return (
    <div className="form-group">
    <label className="control-label col-sm-2" htmlFor={id}>{title}:</label>
    <div className="col-sm-10">
      {textArea
        ?
        <textarea required className="form-control" id={id} rows="3" name={name} {...attributes}></textarea>  
        :
        <input required type="text" className="form-control" id={id} name={name} {...attributes}/>
      }
      
    </div>
    </div>
  )

}


// Render Radio Buttons
export function FormRadio (props) {

  const {title, name, id={name}, ...attributes} = props

  return (

    <div className="form-check">
      <input required type="radio" className="form-check-input" id={id} name={name} {...attributes}/>
      <label className="form-check-label" htmlFor={id}>{title}</label>
    </div>

  )

}