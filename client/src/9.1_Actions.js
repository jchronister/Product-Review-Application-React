


function action (type, payload) {

  return ({
    type,
    payload
  })

}


export const textboxChange = "textboxChange"
export const textboxChangeFx = (name, value) => action(textboxChange, {name, value})


export const login = "login"
export const loginFx = (username, role) => action(login, {username, role})

export const logout = "logout"
export const logoutFx = () => action(logout)

export const productTextboxChange = "productTextboxChange"
export const productTextboxChangeFx = (name, value) => action(productTextboxChange, {name, value})

export const productClearTextbox = "productClearTextbox"
export const productClearTextboxFx = () => action(productClearTextbox)

export const setUserInfo = "setUserInfo"
export const setUserInfoFx = (data) => action(setUserInfo, data)

export const updateUserList = "updateUserList"
export const updateUserListFx = (data) => action(updateUserList, data)

export const updateProduct = "updateProductList"
export const updateProductFx = (data) =>action(updateProduct, data)