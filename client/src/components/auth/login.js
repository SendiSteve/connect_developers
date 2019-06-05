import React, {Component} from 'react'

class Register extends Component{
    render() {
        return (
            <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign In</h1>
                                <p className="lead text-center">
                                    Login to your connect developer account
                                </p>
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="example@example.com" name="email" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Password" name="password" required />
                                    </div>
                                    
                                    <input type="submit" className="btn btn-danger btn-block mt-4" />

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Register;