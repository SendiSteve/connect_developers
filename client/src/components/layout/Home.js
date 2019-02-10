import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
        <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Connect Developers</h1>
                <p className="lead">
                  Easily connect with fellow developers, create a profile, share posts and get help from developers.
                </p>
                <hr />
                <a href="/register" className="btn btn-lg btn-danger mr-2">
                  Register
                </a>
                <a href="/login" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;