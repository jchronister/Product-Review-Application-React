import {Component} from "react"
import {XButton} from "./zComponents"
import {connect} from "react-redux"
import {axiosRequest, getDataAttribute} from "./zFx"
import {axios} from "./index"
import {updateUserListFx} from "./9.1_Actions"

export const UserAccounts = connect (

  // MapStateToProps
  state => ({
    users: state.auth.users
  }),

  // MapDispatchToProps
  dispatch => ({
    getUsers: () => dispatch(

      // Server Request for Users Data
      dispatch => {
        axiosRequest(axios.get("/super/users"),
          data => dispatch(updateUserListFx(data.data))
        )
      }

    )
  })

)(

  // User Account Component
  class extends Component {

    componentDidMount () {
      this.props.getUsers()
    }

    accountActivation = ({target}) => {
      
      // Get Id & Status
      const id = getDataAttribute(target, "id")
      const {status} = this.props.users.filter(n => n._id === id)[0]

      axiosRequest(axios.put("/super/users", {id, "status": status === "active" ? "inactive" : "active"}),

        // Show Response Message
        data => {
          if (data.nModified === 1) {
            alert("User Updated")
          } else {
            alert(JSON.stringify(data, null, 2))
          }
        },

        // Refresh Data
        () => this.props.getUsers()
      )

    }

    resetPassword ({target}) {

      const newPassword = prompt("Please Enter New Password")

      // Return on Cancel
      if(newPassword === null) return

      // Empty String
      if (!newPassword) return alert("Invalid Password")

      // Get Id
      const id = getDataAttribute(target, "id")

      // Update
      axiosRequest(axios.put("/super/users", {id, "password": newPassword}),

        // Show Response Message
        data => {
          if (data.nModified === 1) {
            alert("Password Change Successful")
          } else {
            alert(JSON.stringify(data, null, 2))
          }
        }
    )     


    }

    render () {

      const {users} = this.props
      const id = "_id"

      // Exit for No Data
      if (!users.length) return (<h2>User Accounts ...Waiting on Data</h2>)

      return (

        <div>
          <h2>User Accounts</h2>

            <table className="table table-hover"><tbody>

            {/* Header */}
            <tr><th>User Name</th><th>User Role</th><th>User Status</th><th></th><th></th></tr>

            {/* Show User Table */}
            {users.map(user => 
              <tr key={user[id]} data-id={user[id]}>

                  {/* Show User Info */}
                  {["email", "role", "status"].map((n, i) => 
                    <td key={user.email + i}>{user[n]}</td>
                  )}

                  {/* Activate/Deactivate Button */}
                  <td><XButton
                    title={user.status === "active" ? "Deactivate" : "Activate"}
                    onClick = {this.accountActivation}
                  /></td>

                  {/* Reset Password */}
                  <td><XButton
                    title="Reset Password"
                    onClick = {this.resetPassword}
                  /></td>     

              </tr>
            )}

          </tbody></table>
        </div>

      )
    }

  }
)




export class ServerLog extends Component {

  state = {log:""}

  componentDidMount () {

    const ab2str = function (buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    axiosRequest(axios.get("./super/logs"),

      data => {
        this.setState({log: ab2str(data.data.data)})
      }
    )

  }

  render () {
//     const str = this.state.log.split("*")
// debugger
    return (

      <div>
        
        <h2>Server Access Log</h2>
        {this.state.log.split("*").map((n, i) => <p key={i}>{n}</p>)}

      </div>

    )



  }


}