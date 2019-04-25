import React from 'react';
import SimpleSchema from 'simpl-schema';

import { Form, Col, Button } from 'react-bootstrap';
// import { error } from 'util';

import '../../sass/components/_login.scss';

class Login extends React.Component {

    constructor(args) {
        super(args);

        this.state = {
            userName: '',
            password: '',
            validated: false,
            error: {
                userName: false,
                password: false,
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // const form = event.currentTarget;
        const { userName, password } = this.state;
        const validationContext = new SimpleSchema({
            userName: {
                type: String,
                optional: false,
                min: 3,
                max: 15,
            },
            password: {
                type: String,
                regEx: /^[a-z0-9A-Z_]{3,15}$/,
                optional: false,
            }
        }).newContext();
        validationContext.validate({ userName, password });

        if (!(validationContext.isValid())) {
            // event.stopPropagation();
            // validationContext.validationErrors().forEach(el => {
            //     this.setState({ [userName]: true, [password]: true });
            // })
            let errorsArr = {
                userName: false,
                password: false,
            };
            validationContext.validationErrors().forEach((a) => {
                errorsArr[a.name] = true;
                console.log(a.name);
            });

            this.setState({
                error: { ...this.state.error, ...errorsArr },
            });
            console.log('in if');
        } else {

        }
        this.setState({ validated: true });
        console.log(validationContext.isValid());
        console.log(validationContext.validationErrors());
    }

    render() {
        const { validated } = this.state;
        return (
            <Form
                noValidate
                validated={validated}
                onSubmit={e => this.handleSubmit(e)}
                className="login"
            >
                <div className="login-form">

                    <Form.Row>

                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="UserName" required className={'userName login-inputs ' + (this.state.error.userName && 'is-invalid')} onChange={this.handleChange} />
                            <Form.Control.Feedback type="invalid" className="login-invalidTxt">
                                Please provide a valid user name.
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="validationCustom05" className="login-passGroupForm">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" className={'login-inputs ' + (this.state.error.password && 'is-invalid')} required onChange={this.handleChange} />
                            <Form.Control.Feedback type="invalid" className="login-invalidTxt">
                                Please provide a valid password.
                        </Form.Control.Feedback>
                        </Form.Group>

                    </Form.Row>

                    <Button type="submit" className="login-btn">Submit</Button>
                </div>
            </Form>
        );
    }
}

export default Login;