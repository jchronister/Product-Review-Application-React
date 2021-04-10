import Form from 'react-bootstrap/Form';
import {ToggleButtonGroupControlled, Textbox, XButton} from "./zComponents"

import {Component} from "react"

export class UpsertReview extends Component {

  render () {

    return (

      <div>
        <h2>Create Product Review</h2>

        <Form inline>
  
          <Form.Group>
            <Textbox
              labelCaption="Title"
              name="reviewTitle1"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Comments</Form.Label>
            <Form.Control as="textarea" rows={5} />
          </Form.Group>
          
          <ToggleButtonGroupControlled/>
        
          <XButton
            title = "Cancel"
          />

           <XButton
            title = "Save Review"
          />      

        </Form>




      </div>
    )
  }




}