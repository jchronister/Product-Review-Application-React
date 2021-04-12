import * as act from "./9.1_Actions"

const initialState = {

  username: "jeremy@miu.edu",
  password: "1234",
  currentUser: {username: "", role: ""}

}



export function authorizationReducer(state = initialState, action) {


  switch (action.type) {

    case act.textboxChange:
      return {...state, [action.payload.name]: action.payload.value}

    // Login Fall Through for Testing
    case act.login: //????????
    case act.setUserInfo:
      var data = {username: action.payload.username, role: action.payload.role}
      return {...state, currentUser: data}
     
    case act.logout:
      data = {username: null, role: null}
      return {...state, currentUser: data}     

    default:

  }

  return state

}