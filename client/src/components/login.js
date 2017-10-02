import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setPassword,setUsername,fetchLogIn} from '../actions';
import '../CSS/login-page.css';

class Login extends Component {
  goToUser() {
    if(this.props.admin) {
      this.props.history.push(`/admin/${this.props.userId}`);
    }else if (this.props.loggedIn) {
      this.props.history.push(`/user/${this.props.userId}`);
    }
  }

  updateUser(userName) {
    this.props.dispatch(setUsername(userName));
  }

  updatePassword(password) {
    this.props.dispatch(setPassword(password));
  }
 componentDidMount() {
   this.goToUser();
 }
  componentDidUpdate() {
    this.goToUser();
  }

  logIn(e) {
   e.preventDefault();
   this.props.dispatch(fetchLogIn(this.props.loginName, this.props.password));
  }

  render () {
        return (
          <section className='login-container'>
            <div>
              <h3>Quiz Manager</h3>
              <p>Quiz Manager allows users to complete content that is required for their job, and for administrators to check on the users' progress. It's an easy way for users to access content they need to complete and for the powers that be to check that the content is being completed. Our MVP uses quizzes as content, but the content could easily be anything (forms, articles, etc.)</p>
              <p>Log-in Information:</p> 
              <p><b>Admin</b> Username: <i>Admin</i>, Password: <i>test-password</i></p>
              <p><b>User</b> Username: <i>UserOne</i> Password: <i>test-password</i>.</p>
            </div>
            <div className='login-form'>
              <form onSubmit={e => this.logIn(e)} >
                <div className='login'>
                  <label className='login-direction'>Username</label>
                  <input type='username' placeholder='username' value={this.props.loginName} onChange={e=> this.updateUser(e.target.value)} />
                </div>
                <div className='login'>
                  <label className='login-direction'>Password</label>
                  <input type='password' placeholder='password' value={this.props.password} onChange={e=> this.updatePassword(e.target.value)}/>
                </div>
                <button type="submit">login</button>
              </form>
            </div>
          </section>
        )
  }
}

const mapStateToProps = state =>({
  users: state.users,
  userId: state.userId,
  admin: state.admin,
  loggedIn: state.loggedIn,
  password: state.loginPass,
  loginName: state.loginName

});

export default connect(mapStateToProps)(Login);
