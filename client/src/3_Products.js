import {Component} from "react"
import {connect} from "react-redux"
import {XButton, FormTextbox} from "./zComponents"

import {productTextboxChangeFx, productClearTextboxFx, updateProductFx, getDBDataFx, updateProductDetail} from "./9.1_Actions"

import "./3_Products.css"
import {axiosRequest, getDataAttribute, message} from "./zFx"
import {axios} from "./index"
import {convertRating} from "./4_Reviews"

// Display Products List Component
export const Products = connect (

  // MapStateToProps
  state => ({
    products: state.products.products,
      user: state.auth.currentUser.username,
      fieldList: state.products.setup.productFields
  }),

  // MapDischargeToProps

  dispatch => ({
  
        getProductData: (fx)=>{
          return dispatch(fx)
        }

  })


)(

  // Product List Component
  class extends Component { 

    state = {sort: ""}

    componentDidMount(){
      this.props.getProductData(this.getData)
    }

    getData = (dispatch)=>{

      axios.get('/products')
      .then(response =>{
        
        return dispatch(updateProductFx(response.data.data))
      })
    }

    // Add Review Button
    addReview = ({target}) => {
      this.props.history.push("/products/" + this.getId(target) + "/create-review")
    }

    // Edit Product Button
    editProduct = ({target}) => {
      this.props.history.push("/products/" + this.getId(target))
    }

    // Returns Product Id Stored in element.data.id or null
    getId (element) {
      let el = element
      while (el && !el.dataset.id) el = el.parentElement
      return el && el.dataset.id
    }
    sort = ({target}) => {

      // Sort Table
      const direction = this.state.sort === "asc" ? "desc" : "asc"
      
      // Adjust Classes
      target.classList.remove(direction === "desc" ? "asc" : "desc")
      target.classList.add(direction)
  
      // Set State
      this.setState({sort: direction})

      // Request Data

      this.props.getProductData (

      dispatch =>{axiosRequest(axios.get("/products?reputation=" + direction), 

        data => {
       
          // setState ???????????????
          return dispatch(updateProductFx(data.data))
        }
      )      
    }
  
      )
  }

    render () {

      const {products, user, fieldList} = this.props // Product Field List to Show {Field Key: Field Name}
      const fields = Object.keys(fieldList)
      const creator = "creator" // Product Creator Key
      const id = "_id" // Product Id Key

      return (

        <div>
        <h2>Products List</h2>

        <table className="table table-hover table-sortable" onClick={(e)=>{
          if (e.target.dataset.id)
          // alert(e.target.dataset.id)
          // debugger
          // View Product Detail Page
            this.props.history.push("/detail-product/" + e.target.dataset.id)
          }}>

          {/* Add Header */}
          <thead>
          {/* {header && <tr>{fields.map((n, i) => <th key={i} className="asc">{fieldList[n]}</th>)}</tr> */}
          <tr><th>Image</th><th>Title</th><th>Description</th><th className="sort desc" onClick={this.sort}>Rating</th><th></th><th></th></tr>
          </thead>

          {/* Add Rows */}
          <tbody>
          {products.map(product => (
          <tr key={product[id]} data-id={product[id]}>

            {/* Add Columns/Cells */}
            {fields.map((n, i)=><td key={product[id] + i} data-id={product[id]} className="details">{product[n]}</td>)}

            {/* Add Review Button */}
            <td><XButton
              title ="Add Review"
              onClick = {this.addReview}
              />
            </td>

            {/* Add Edit Button if User Created*/}
            <td>
              {user === product[creator] && 
                <XButton
                  title ="Edit Product"
                  className = "btn btn-secondary"
                  onClick = {this.editProduct}
                />
              }
            </td>           
            {/* Add Delete Button if User Created*/}
            <td>
              {user === product[creator] && 
                <XButton
                  title ="Delete Product"
                  className = "btn btn-secondary"
                  onClick = {this.editProduct}
                />
              }
            </td>    

          </tr>
        ))}

        </tbody></table>
        </div>
      )
    }

  }
)



// Display Product Details with Reviews
export const ProductDetails = connect(

  // MapStateToProps
  state => ({
    user: state.auth.currentUser.username,
    details: state.products.detail
  }), 

  // MapDispatchToProps
  dispatch => ({
    getData: (path, reducer) => dispatch(getDBDataFx(path, reducer))
  })

)(

  // Product Details Component
  class ProductDetails extends Component{

 
    // Edit Review for Item
    editReview = ({target}) => {
      this.props.history.push("/products/" + this.props.match.params.id + "/reviews/" + getDataAttribute(target, "id"))
    }

    // Add Review for Item
    addReview = () => {
      this.props.history.push("/products/" + this.props.match.params.id + "/create-review")
    }

    // Delete
    deleteReview = ({target}) => {

      // Get Id and Delete
      axiosRequest(axios.delete("./reviews/" + getDataAttribute(target, "id")),

        // Alert Message
        data => message(data, "Review Deleted" ),

        // Refresh
        () => this.props.getData("/products/" + this.props.match.params.id, updateProductDetail)

      )
        
    }

    componentDidMount () {
      // Get Product Detail Data from Database
      this.props.getData("/products/" + this.props.match.params.id, updateProductDetail)
    }

    render () {

      const {details, user: currentUser} = this.props

      if (!details.description) return <h2>.... Fetching Product Details</h2>
  
      const {reviews, description, reputation} = details

      

      return (
        <div>

          <h2>Product Details & Reviews</h2>

          {/* Product Picture and Description */}
          {/* <img alt="Product"/> */}
          <h4>Description: {description}</h4>
          
          {/* Reputation with Button to Add if None */}
          <h4>Reputation Score: {reputation === null 
            ? <XButton 
                title="Rate Product"
                onClick = {this.addReview}
              />
            : reputation}</h4>

          {/* Product Details */}
          {/* <h2>{"Product Details"}</h2>
          {Object.entries(details).map(([key, value]) => <p key={key}>{key}: {value}</p>)} */}

          {/* Reviews Section with Button to Add Review*/}
          <h4>Reviews: {reputation !== null ? "" : "Be the First to Review"}  
          <XButton 
            title="Create Review"
            onClick = {this.addReview}
          />
          </h4>

          {/* Show Reviews Table*/}
          {reviews && reviews.length

          ? <table className="table table-hover"><tbody>
              {reviews.map(review => ([
                
                  // Rating, Creator, Date, Edit Button
                  <tr key ={review.id + "1"} data-id={review.reviewID}> 
                    <td>Rating: {convertRating(review.rating)}</td>
                    <td>User: {review.creator}</td>
                    <td>{review.creationDate && review.creationDate.toString()}</td>
                    <td>{currentUser === review.creator
                          ? <XButton
                              title="Edit"
                              onClick = {this.editReview}
                            />
                          : ""
                        }
                    </td>
                    <td>{currentUser === review.creator
                          ? <XButton
                              title="Delete"
                              onClick = {this.deleteReview}
                            />
                          : ""
                        }
                    </td>
                  </tr>,

                  <tr key ={review.id + "2"}>
                    <td></td><td  colSpan="3">{review.comment}</td>
                  </tr>
                
              ]))} 
            </tbody></table>
          
          : <h4>No Reviews</h4>

          }

        </div>
      )
    }
  }
)


// Add & Update Products
export const UpsertProduct = connect (

  // Map State to Props
  state => ({
    user: state.auth.currentUser.username,
    fields: state.products.setup.upsertProductFields,
    title: state.products.upsertProduct.title,
    description: state.products.upsertProduct.description
  }),

  // Map Dispatch to Props
  dispatch => ({
    addProduct: (data) => dispatch(),
    updateTextbox: ({target}) => dispatch(productTextboxChangeFx(target.name, target.value)),
    clearTextbox: () => dispatch(productClearTextboxFx())
  })

)(

  // UpsertProduct Component
  class extends Component {


    componentDidMount () {


    }

    componentDidUpdate() {

    }

    // Add / Edit Product
    upsert = (e) => {

      e.preventDefault()

      const {title, description, user, fields, clearTextbox} = this.props    

      // Object to Send
      const data = {
          creator: user,
          creationDate: new Date(),
          description,
          title
      }

      alert (JSON.stringify(data))
      //request
      // reputation: 0 (update when product review is added)
      // reviews:[] (push review to array. Create field when first review is Added)
      // img: "picture http path"
      clearTextbox()

    }

    // Cancel Button
    cancel = () => this.props.history.goBack()

    render () {
      
      // debugger
      const {title, description, updateTextbox} = this.props 

      // Add or Edit Mode
      let edit = this.props.match.params.id

      return (

          <div className="container">
          <br/>

          <h2>{edit ? "Edit Product" : "Add Product"}</h2>
          
          <form className="form-horizontal" onSubmit={this.upsert}>

            {/* Title */}
            <FormTextbox
              title="Title"
              name = "title"
              value = {title}
              onChange = {updateTextbox}
            />

            {/* Comment */}
            <FormTextbox
              title = "Description" 
              name = "description"
              textArea = "true"
              value = {description}
              onChange = {updateTextbox}
            />

            <div className="form-group">        
              <div className="col-sm-offset-2 col-sm-10">
                <XButton
                  title = "Cancel"
                  className = "btn btn-secondary"
                  onClick = {this.cancel}
                />  

                <XButton
                  title = {edit ? "Update Product" : "Add Product"}
                  type = "Submit"
                /> 

              {/* Delete Button */}
              {edit &&
                <XButton
                  title = "Delete Product"
                />
              }
              </div>
            </div>
          </form>
        </div>


      )

    }

  }
)