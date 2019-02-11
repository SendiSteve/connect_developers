import React, {Component} from 'react'

class Register extends Component{
    constructor () {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange (e) {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }
        console.log(newUser);
    }
    render() {
        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Register</h1>
                                <p className="lead text-center">
                                    Create your connect developer account
                                </p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} />
                                    </div>
                                    <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a profile image, use
                                        a Gravatar email
                                    </small>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="example@example.com" name="email" value={this.state.email} onChange={this.onChange} />
                                    </div>
                                    
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
                                    </div>
                                    <input type="submit" className="btn btn-danger btn-block mt-4" />

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;