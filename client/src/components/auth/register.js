import React, {Component} from 'react'
import axios from 'axios'
import classnames from 'classnames';

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
        // console.log(newUser);
        axios.post('/api/users/register', newUser)
        .then(response => console.log(response.data))
        .catch(err => this.setState({errors: err.response.data}))
    }
    render() {
        const { errors } = this.state;

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
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className={classnames('form-control', {'is-invalid': errors.username})} placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} />
                                        {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                                    </div>
                                    <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a profile image, use
                                        a Gravatar email
                                    </small>
                                    <div className="form-group">
                                        <input type="email" className={classnames('form-control', {'is-invalid':errors.email})} placeholder="example@example.com" name="email" value={this.state.email} onChange={this.onChange} />
                                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                    </div>
                                    
                                    <div className="form-group">
                                        <input type="password" className={classnames('form-control', {'is-invalid':errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className={classnames('form-control', {'is-invalid': errors.password})} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
                                        {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
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