import {Link, BrowserRouter, Route, Switch, useHistory} from "react-router-dom"


import {Login} from "./2_Login"
import {Products, UpsertProduct, ProductDetails} from "./3_Products"
import {UpsertReview} from "./4_Reviews"
import {UserAccounts, ServerLog} from "./5_SuperUser"
import {connect} from "react-redux"
import {XButton} from "./zComponents"
import {logoutFx} from "./9.1_Actions"
import {axios} from "./index"

export const MainRouter = connect(

  // Map State to Props
  state => ({
    role: state.auth.currentUser.role,
    username: state.auth.currentUser.username
  }),

  // Map Dispatch to Props
  dispatch => ({
    logout: () => dispatch(logoutFx())
  })

)(

  // Main Router Component
  function (props) {

    const {role, username, logout} = props

  return (
    <div className="container">
    <BrowserRouter>

      {/* Login Status at Top of Page */}
      <LoginStatus
        username = {username}
        role = {role}
        logout = {logout}
      /><br/>

      {/* Show Navigation if User Logged In */}
      {role &&
        <div>
          <h4>Product Review Application</h4>
        <ul>
          <li><Link to="/products">List Products</Link></li>
          <li><Link to="/create-product">Add Product</Link></li>
        </ul>
        </div>
      }

      {/* Show Super User Dashboard */}
      {role === "superuser" &&
        <div>
        <h4>Super User Dashboard</h4>
        <ul>
          <li><Link to="/users">User Accounts</Link></li>
          <li><Link to="/serverlog">Server Log</Link></li>
        </ul>
        </div>
      }

      {/* Routes */}
      <Switch>

        <Route path="/login" component={Login}/>

        {/* Make User Login if Needed */}
        {!role && <Route path="/"
              render={()=> (<div>
                                <h2>Not Authorized. Please{" "} 
                                <Link to="/login">Login</Link></h2>
                            </div>)}
        />}

        <Route path="/products/:id" exact component={UpsertProduct}/>
        <Route path="/products" exact component={Products}/>

        <Route path="/detail-product/:id" exact component={ProductDetails}/>

        <Route path="/create-product" exact component={UpsertProduct}/>
        <Route path="/users" exact component={UserAccounts}/>
        <Route path="/serverlog" exact component={ServerLog}/>
        <Route path="/products/:id/create-review" exact component={UpsertReview}/>
                                
        <Route path="/products/:id/reviews/:ReviewId" exact component={UpsertReview}/>
        

      </Switch>

    </BrowserRouter>
    </div>
  )


  }
)


// Display Login Status at Top of Page
//user
//setUserInfo
function LoginStatus ({role, username, logout}) {

  const history = useHistory();

  return (

    <div>
      {username ?
            <h4>Currently Logged in as '{role + "/" + username}'
                <XButton 
                  title="Logout" 
                  onClick={()=> {
                    logout()

                    // Clear Axios Token
                    delete axios.defaults.headers.common['Authorization'];

                    history.push("/login")
                  }}
                />
            </h4>
        : <h4>Not Logged In</h4>}
    </div>
  )
}

