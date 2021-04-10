import {Component} from "react"

import {XButton} from "./zComponents"

// Display Product List
export class Products extends Component {


  state = { 
    products: [{img:"", desc:"Product A Bottle", rating: 45, id:1},
    {img:"", desc:"Product A Bottle", rating: 45, id:2},
    {img:"", desc:"Product A Bottle", rating: 45, id:3}]

  }

  fieldInfo = {img:"Product Image", desc:"Description", rating: "Rating"}


  render () {

    const header = true
    const products = this.state.products
    const fieldList = this.fieldInfo
    const fields = Object.keys(fieldList)

    return (

      <div>
      <h2>Products List</h2>

      <table><tbody>

        {/* Add Header */}
        {header && <tr>{fields.map((n, i) => <th key={i}>{fieldList[n]}</th>)}</tr>}

        {/* Add Rows */}
        {products.map(product => (
        <tr key={product.id}>

          {/* Add Columns/Cells */}
          {fields.map((n, i)=><td key={product.id + i}>{product[n]}</td>)}

          {/* Add Review Button */}
          <td><XButton
            title ="Add Review"
            />
          </td>

        </tr>
      ))}

      </tbody></table>
      </div>
    )
  }

}


// Display Product Details with Reviews
export class ProductDetails extends Component{

  fieldInfo = {img:"Product Image", desc:"Description", rating: "Rating", }

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


  render () {

    const {reviews, description, details, rating} = this.state

    const currentUser = "jrc"

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
            />
          : rating}</h2>

        {/* Product Details */}
        <h2>{"Product Details"}</h2>
        {Object.entries(details).map(([key, value]) => <p key={key}>{key}: {value}</p>)}

        {/* Reviews Section with Button to Add Review*/}
        <h2>Reviews: {rating || "Be the First to Review"}  
        <XButton 
          title="Create Review"
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