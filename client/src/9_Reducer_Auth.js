import * as act from "./9.1_Actions"

const initialState = {

  username: "jrc@miu.edu",
  password: "1234",
  currentUser: {username: "", role: ""},
  users: []

} 



export function authorizationReducer(state = initialState, action) {


  switch (action.type) {

    case act.textboxChange:
      return {...state, [action.payload.name]: action.payload.value}

    case act.setUserInfo:
      var data = {username: action.payload.email, role: action.payload.role}
      return {...state, currentUser: data}
     
    case act.logout:
      data = {username: null, role: null}
      return {...state, currentUser: data}
      
    case act.updateUserList:
      return {...state, users: [...action.payload]}

    default:

  }

  return state

}