// import './2_Login.css';

import {Component} from "react"
import {connect} from "react-redux"

import {Textbox, XButton} from "./zComponents"
import {textboxChangeFx, loginFx, setUserInfoFx} from "./9.1_Actions"

import jwt from "jsonwebtoken"

import {axiosRequest, isMissing} from "./zFx"
import {axios} from "./index"


export const Login = connect(

  // MapStateToProps
  state => ({
    username: state.auth.username, 
    password: state.auth.password
  }),
  
  // MapDispatchToProps
  dispatch => ({
    inputChange: ({target : {name, value}}) => dispatch(textboxChangeFx(name, value)),
    login: (fx) => dispatch(fx)
  })

)(

  // Login Display Component
  class extends Component {


    login = () => {
 
      this.getAccount("/auth/login")
    }

    create = () => {

      this.getAccount("/auth/signup")
    }

    // Request Server for Account Data
    getAccount = (path) => {

      // Required Data
      const required = {email: "Username", password: "Password"}
      
      // Get User Input
      const {username: email, password} = this.props
      const info = {email, password}

      // Validate Data
      const missing = isMissing(Object.keys(required), info,required)
      if (missing) return alert(missing[1])

      this.props.login( 

          dispatch => {

              axiosRequest(axios.post(path, info), 
      
              // Login Callback Function
              data => {

                // Server Not Setup to Handle Add & Login at Same Time
                if (!data.data) return alert("User Successfully Added. Please Login")

                // Set Axios Token
                axios.defaults.headers.common['Authorization'] = data.data;

                // Update User Info State
                dispatch(setUserInfoFx(jwt.decode(data.data)))

                // Go to Main Page
                this.props.history.replace("./")

              })
            }

          )

    }

    render () {

      return (
        
      <div>

      <div>
          <div className="login-main-text">
              <h2>Product Review Application Login Page</h2>
          </div>
        </div>

        <div className="main">
          <div className="col-md-6 col-sm-12">
              <div className="login-form">
                {/* <form onSubmit={this.getAccount}> */}
            
                    <div className="form-group">

                        {/* Username */}
                        <Textbox
                          name = "username"
                          labelCaption = "User Name "
                          value = {this.props.username}
                          onChange = {this.props.inputChange}
                          placeholder="Email"
                          // className="form-control"
                          // required = {true}
                        />

                    </div>

                    <div className="form-group">

                        {/* Password */}
                        <Textbox
                          name = "password"
                          labelCaption = "Password"
                          value = {this.props.password}
                          onChange = {this.props.inputChange}
                          placeholder="Password"
                          // className="form-control"
                          // required = {true}
                        
                        />
                    
                    </div>

                    {/* Login */}
                    <XButton
                      title = "Login"
                      // type ="submit"
                      className="btn btn-primary"
                      onClick = {this.login}
                      // formAction="Get"
                    />  

                    {/* Create Account */}
                    <XButton
                      title = "Register"
                      // type ="submit"
                      className="btn btn-secondary"
                      onClick = {this.create}
                      // formMethod="POST"
                    />

                {/* </form> */}
              </div>
          </div>
        </div>

      </div>
    
      )
    }

  }
)