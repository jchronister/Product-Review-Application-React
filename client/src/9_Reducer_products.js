import * as act from "./9.1_Actions"

const initialState = {

  products: [],
  detail: {},
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
      
    case act.updateProductDetail:
      return {...state, detail: action.payload[0]}

    case act.updateProductInfo:
      data = {description: action.payload[0].description, title: action.payload[0].title}
      return {...state, upsertProduct: data}

    default:

  }

  return state

}



