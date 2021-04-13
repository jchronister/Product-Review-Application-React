import * as act from "./9.1_Actions"

const initialState = {

  // products: [],

  upsertProduct: {title: "", description: ""},
  upsertReview: {title: "", comment: "", rating: ""},
  
  setup: {

    // Product Fields that Can be Changed
    // upsertProductFields: {img:"Product Image", title: "Title", description:"Description"},
    upsertProductFields: {title: "Title", description:"Description"},

    // Product Fields to Show
    productFields: {img:"Product Image", title: "Title", description:"Description", reputation: "Rating"}
  
  }

}

export function productReducer (state = initialState, action) {

  switch (action.type) {

    case act.productTextboxChange:
      var data = {...state.upsertProduct, [action.payload.name]: action.payload.value}
      return {...state, upsertProduct: data}

    case act.productClearTextbox:
      data = Object.keys(state.upsertProduct).reduce((a, n) => ({...a, [n]: ""}), {})
      return {...state, upsertProduct: data}   
      
      case act.updateProduct:
       return {...state, products: action.payload}
        
    default:

  }

  return state

}



initialState.products = [{
  "_id" : "6070fba9132e0e9bf707417e",
  "title" : "powerbeats",
  "reputation" : 0,
  "reviews" : [
          {
                  "creator" : "tekel@miu.edu",
                  "reviewID" : "6071ebc44916e57a76fb66f7",
                  "comment" : "nice one",
                  "rating" : "-1",
                  "creatinDate" : "2021-02-03T06:00:00Z"
          }
  ],
  "creator" : "jeremy@miu.edu",
  "creationDate" : "2021-02-05T06:00:00Z",
  "description" : "power beats headphone by Dr dre 100 watt",
  "img" : "the power beat"
},
{
  "_id" : "6071057a8faf0d160a48cdcd",
  "title" : "appleMouse",
  "reputation" : 0,
  "reviews" : [
          {
                  "creator" : "jrc",
                  "reviewID" : "607261dd111ff6cbf3e488ac",
                  "comment" : "best screen protector ever",
                  "rating" : "1",
                  "creatinDate" : "2021-03-01T05:00:00Z"
          }
  ],
  "creator" : "tedi@miu.edu",
  "creationDate" : "2021-01-01T06:00:00Z",
  "description" : "Apple Magic Mouse",
  "img" : ""
},
{
  "_id" : "60727b77b48eaebc98f2d420",
  "title" : "TV",
  "reputation" : 0,
  "reviews" : [ ],
  "creator" : "jhon@miu.edu",
  "creationDate" : "2021-04-11T04:30:47.964Z",
  "description" : "75' flat screen curved samsung Tv",
  "img" : ""
}]