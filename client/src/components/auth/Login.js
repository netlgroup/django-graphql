import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import NotificationStore from 'react-mobx-notification-system';
import Footer from '../lib/Footer';
import { AUTH_LOGIN_MUTATION } from '../../graphql';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        document.title = 'Login'
    }


    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="features-container section-container">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 features section-description wow fadeIn">
                            <Mutation mutation={AUTH_LOGIN_MUTATION} onCompleted={res => {
                                console.log(res);
                            }}>
                                {(tokenAuth, { loading, data }) => {
                                    return (
                                        <form id="create-author" className="form-horizontal" onSubmit={e => {
                                            e.preventDefault();
                                            tokenAuth({
                                                variables: {
                                                    username: this.state.username,
                                                    password: this.state.password
                                                }
                                            })
                                            this.state.username = '';
                                            this.state.password = '';
                                        }}>
                                            <div className="form-group">
                                                <label className="control-label col-sm-3">Username</label>
                                                <div className="col-sm-9">
                                                    <input type="text" name="username" placcholder="Username" className="form-control" required onChange={e => this.setState({ username: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-3">Password</label>
                                                <div className="col-sm-9">
                                                    <input type="password" name="password" placcholder="Password" className="form-control" required onChange={e => this.setState({ password: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-success">Login</button>
                                            </div>
                                        </form>
                                    )
                                }}
                            </Mutation>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}


export default Login;
