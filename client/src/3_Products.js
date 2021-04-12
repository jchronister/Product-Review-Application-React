import {Component} from "react"
import {connect} from "react-redux"
import {XButton, FormTextbox} from "./zComponents"

import {productTextboxChangeFx, productClearTextboxFx} from "./9.1_Actions"

// Display Products List Component
export const Products = connect (

  // MapStateToProps
  state => ({
    products: state.products.products,
    user: state.auth.currentUser.username,
    fieldList: state.products.setup.productFields
  }),

  // MapDischargeToProps
  null

)(

  // Product List Component
  class extends Component { 

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

    render () {

      const header = true // Show Product Table Header
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
          {header && <tr>{fields.map((n, i) => <th key={i}>{fieldList[n]}</th>)}<td></td><td></td></tr>}
          </thead>

          {/* Add Rows */}
          <tbody>
          {products.map(product => (
          <tr key={product[id]} data-id={product[id]}>

            {/* Add Columns/Cells */}
            {fields.map((n, i)=><td key={product[id] + i} data-id={product[id]}>{product[n]}</td>)}

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
  }), 

  // MapDispatchToProps
  null

)(

  // Product Details Component
  class ProductDetails extends Component{

    state = {
      rating:null ,
      description:"A Outdoor Wonder Water Bottle",
      details: {size:"1 Liter", width: "3 inches", height: "12 inches"},
      reviews:[
        {
          id:1,
        creator: "jrc",
        rating: 2,
        title:"great bottle",
        comment:"This is awesome",
        creationDate: new Date()
        },
        {
          id:2, 
        creator: "tekle",
        rating: 0,
        creationDate: new Date(),
        comment: "Ive Seen Better",
        title:"fell apart"
        }
        ]

    }

    editReview = () => {}

    // Add Review for Item
    addReview = () => {
      this.props.history.push("/products/" + this.props.match.params.id + "/create-review")
    }
    render () {

      const {reviews, description, details, rating, currentUser} = this.state

      return (
        <div>

          <h2>Product Details & Reviews</h2>

          {/* Product Picture and Description */}
          <img alt="Product"/>
          <h2>{description || "Product Description"}</h2>
          
          {/* Reputation with Button to Add if None */}
          <h2>Reputation: {rating === null 
            ? <XButton 
                title="Rate Product"
                onClick = {this.addReview}
              />
            : rating}</h2>

          {/* Product Details */}
          <h2>{"Product Details"}</h2>
          {Object.entries(details).map(([key, value]) => <p key={key}>{key}: {value}</p>)}

          {/* Reviews Section with Button to Add Review*/}
          <h2>Reviews: {rating || "Be the First to Review"}  
          <XButton 
            title="Create Review"
            onClick = {this.addReview}
          />
          </h2>

          {/* Show Reviews Table*/}
          {reviews.length

          ? <table><tbody>
              {reviews.map(review => ([
                
                  // Rating, Creator, Date, Edit Button
                  <tr key ={review.id + "1"}> 
                    <td>Rating: {review.rating}</td>
                    <td>User: {review.creator}</td>
                    <td>{review.creationDate.toString()}</td>
                    <td>{currentUser === review.creator
                          ? <XButton
                              title="Edit Review"
                              
                            />
                          : ""
                        }
                    </td>
                  </tr>,

                  <tr key ={review.id + "2"}>
                    <td  colSpan="4">{review.comment}</td>
                  </tr>
                
              ]))} 
            </tbody></table>
          
          : <h2>No Reviews</h2>

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