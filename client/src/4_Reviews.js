import {XButton, FormTextbox, FormRadio} from "./zComponents"
import React, {Component, useState} from "react"
import {connect} from "react-redux"
import {axiosRequest, message} from "./zFx"
import {axios} from "./index"


export const UpsertReview = connect (

  // MapStateToProps
  null,

  // MapDispatchToProps
  null

)(

  // Upsert Review Component
  class extends Component {

      state = ({ 
                // title: "",
                comment: "",
                rating: "",
                oldRating: 0
              })

    formChange = ({target}) => this.setState({[target.name]: target.value})

    // Form Submit (No onClick Fx for Submit Button)
    submit = (e) => {
      e.preventDefault()

      // Review Id for Update
      const reviewId = this.props.match.params.ReviewId
debugger
      axiosRequest(axios.post("./reviews/" + reviewId || this.props.match.params.id, {...this.state, rating: convertRating(this.state.rating)}),
        data => {
          message(data, reviewId ? "Review Updated" : "Review Added" )
          
          // Clear Textboxes on Successful Add
          if (data.nModified && !reviewId) this.setState({comment: "", rating: ""})
        }
      )

    }

    // Cancel Button
    cancel = () => this.props.history.goBack()

    // Get Current Review Data
    updateInfo = () => {
      axiosRequest(axios.get("./reviews"), 
        ({comment, rating}) => {this.replaceState({comment, rating: convertRating(rating), oldRating: rating})}
      )
    }


    render () {

      // Add or Edit Mode
      const add = this.props.match.path === "/products/:id/create-review"

      return (

          <div className="container">
            <br/>

            <h2>{add ? "Create Product Review" : "Update Product Review"}</h2>
            
            <form className="form-horizontal" onSubmit={this.submit}>

              {/* Title */}
              {/* <FormTextbox
                title = "Title"
                name = "title"
                value = {this.state.title}
                onChange = {this.formChange}
              /> */}

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
                    title = {add ? "Add Review" : "Update Review"}
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

// Get Rating
function convertRating (rating) { 

  const ratings = [ "Excellent", "2", "Excellent", 
                    "Good", "0", "Good", 
                    "Bad", "-1", "Bad"]      

  const rate = ratings[ratings.indexOf("" + rating) + 1]

  return isNaN(+rate) ? rate : +rate

}