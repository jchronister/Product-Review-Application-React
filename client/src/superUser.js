import {Component} from "react"
import {XButton} from "./zComponents"

export class UserAccounts extends Component {


  state = {users: [

    {
      username: "jrc",
      password: null,
      role: "user",
      status: "active"
      },
      {
      username: "tekle",
      password: null,
      role: "superuser",
      status: "inactive"
      }


  ]
  }

  render () {

    const users = this.state.users

    return (

      <div>
        <h2>User Accounts</h2>

          <table><tbody>

          {/* Header */}
          <tr><th>Username</th><th>User Role</th><th>User Status</th></tr>

          {/* Show User Table */}
          {users.map(user => 
            <tr key={user.username}>

                {/* Show User Info */}
                {["username", "role", "status"].map((n, i) => 
                  <td key={user.username + i}>{user[n]}</td>
                )}

                {/* Activate/Deactivate Button */}
                <td><XButton
                  title={user.status === "active" ? "Deactivate" : "Activate"}
                /></td>

                {/* Reset Password */}
                <td><XButton
                  title="Reset Password"
                /></td>     

            </tr>
          )}

        </tbody></table>
      </div>

    )
  }


}