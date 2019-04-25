// import React from 'react';
// //for validation
// import SimpleSchema from 'simpl-schema';
// //bootstrap component
// import { Form, Row, Col, Button } from 'react-bootstrap';
// //sass file
// import '../../sass/components/_login.scss';

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userName: '',
//             password: '',
//             error: [],
//             validated: false,
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(e) {
//         const name = e.target.name;
//         const value = e.target.value;
//         this.setState({ [name]: value });
//     }

//     handleSubmit(e) {
//         e.preventDefault();
//         const { userName, password } = this.state;
//         const validationContext = new SimpleSchema({
//             userName: {
//                 type: String,
//                 optional: false,
//                 min: 3,
//                 max: 15,
//             },
//             password: {
//                 type: String,
//                 regEx: /^[a-z0-9A-Z_]{3,15}$/,
//                 optional: false,
//             }
//         }).newContext();
//         validationContext.validate({ userName, password });

//         if (validationContext.isValid()) {
//             this.setState({ validated: true });

//         } else {

//             this.setState({ error: validationContext.validationErrors(), validated: false });
//         }
//         console.log(validationContext.isValid());
//         console.log(validationContext.validationErrors());
//     }

//     render() {
//         const { validated } = this.state;
//         return (

//             <Form className="login" noValidate validated={validated} onSubmit={this.handleSubmit}>
//                 <div className="login-form">
//                     <div>
//                         {
//                             this.state.error.length
//                                 ? this.state.error.map(a => a.name === 'userName' ? <h5 key="">not valid: {a.type}</h5> : '')
//                                 : ''
//                         }
//                     </div>
//                     <Form.Group as={Row} controlId="formHorizontalEmail">
//                         <Form.Label column sm={2}>
//                             UserName
//                         </Form.Label>
//                         <Col sm={10}>
//                             <Form.Control type="text" name="userName" placeholder="UserName" className="login-inputs" onChange={this.handleChange} />
//                         </Col>
//                     </Form.Group>

//                     <Form.Row>
//                         <Form.Group as={Col} md="6" controlId="validationCustom03">
//                             <Form.Label>City</Form.Label>
//                             <Form.Control type="text" placeholder="City" required />
//                             <Form.Control.Feedback type="invalid">
//                                 Please provide a valid city.
//                         </Form.Control.Feedback>
//                         </Form.Group>
//                     </Form.Row>

//                     <div>
//                         {
//                             this.state.error.length
//                                 ? this.state.error.map(a => a.name === 'userName' ? <h5 key="">not valid</h5> : '')
//                                 : ''
//                         }
//                     </div>
//                     <Form.Group as={Row} controlId="formHorizontalPassword">
//                         <Form.Label column sm={2}>
//                             Password
//                         </Form.Label>
//                         <Col sm={10}>
//                             <Form.Control type="password" name="password" placeholder="Password" className="login-inputs" onChange={this.handleChange} />
//                         </Col>
//                     </Form.Group>

//                     <Form.Group as={Row}>
//                         <Col sm={{ span: 10, offset: 2 }}>
//                             <Button type="submit" className="login-btn">Login</Button>
//                         </Col>
//                     </Form.Group>
//                 </div>
//             </Form>

//         )
//     }
// }
// export default Login;




// // const schema = new SimpleSchema({
// //     name: {
// //       type: String,
// //       max: 40,
// //     },
// //     age: {
// //       type: SimpleSchema.Integer,
// //       optional: true,
// //     },
// //     registered: {
// //       type: Boolean,
// //       defaultValue: false,
// //     },
// //   });