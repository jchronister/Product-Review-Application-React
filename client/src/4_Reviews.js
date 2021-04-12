import {XButton, FormTextbox, FormRadio} from "./zComponents"
import React, {Component} from "react"
import {connect} from "react-redux"



export const UpsertReview = connect (

  // MapStateToProps
  null,

  // MapDispatchToProps
  null

)(

  // Upsert Review Component
  class extends Component {

    state = { 
              title: "",
              comment: "",
              rating: ""
            }

    formChange = ({target}) => this.setState({[target.name]: target.value})

    // Form Submit (No onClick Fx for Submit Button)
    submit = (e) => {
      e.preventDefault()

      // Fetch Here
      alert (JSON.stringify(this.state))

    }

    // Cancel Button
    cancel = () => this.props.history.goBack()

    render () {

      return (

          <div className="container">
            <br/>

            <h2>Create Product Review</h2>
            
            <form className="form-horizontal" onSubmit={this.submit}>

              {/* Title */}
              <FormTextbox
                title = "Title"
                name = "title"
                value = {this.state.title}
                onChange = {this.formChange}
              />

              {/* Comment */}
              <FormTextbox
                title = "Comment"
                name = "comment"
                textArea = "true"
                value = {this.state.comment}
                onChange = {this.formChange}
                placeholder = "What did you like about the product?"
              />

              {/* Rating */}
              <div className="form-group">       
                <label className="control-label col-sm-2">Rating:</label>  
                <div className="col-sm-offset-2 col-sm-10">

                  {/* Bad */}
                  <FormRadio 
                    title = "Bad"
                    name = "rating"
                    value = "Bad"
                    checked = {this.state.rating === "Bad"}
                    onChange = {this.formChange}
                  />

                  {/* Good */}
                  <FormRadio 
                    title = "Good"
                    name = "rating"
                    value = "Good"
                    checked = {this.state.rating === "Good"}
                    onChange = {this.formChange}
                  />

                  {/* Excellent */}
                  <FormRadio 
                    title = "Excellent"
                    name = "rating"
                    value = "Excellent"
                    checked = {this.state.rating === "Excellent"}
                    onChange = {this.formChange}
                  />

                </div>
              </div>


              <div className="form-group">        
                <div className="col-sm-offset-2 col-sm-10">
                  <XButton
                    title = "Cancel"
                    className = "btn btn-secondary"
                    onClick = {this.cancel}
                  />  

                  <XButton
                    title = "Add Review"
                    type = "Submit"
                  />  
                </div>
              </div>
            </form>
          </div>
      )
    }
  }
)