
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
// import authors from '../../data/authors';
const authors = [];

class AddAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {
                name: '',
                website: '',
                born: '',
                url: '',
                brief: ''
            },

            error: {
                name: false,
                website: false,
                born: false,
                url: false,
                brief: false
            }
        };
        // general validation object
        this.validationContext = new SimpleSchema({
            name: {
                type: String,
                optional: false,
                min: 10,
                max: 30
            },
            website: {
                type: String,
                optional: false,
                regEx: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                min: 25,
                max: 40
            },
            url: {
                type: String,
                optional: true,
                regEx: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                min: 25,
                max: 40
            },
            brief: {
                type: String,
                optional: false
            }
        }).newContext();

    }
    componentDidMount() {
        const { edit, id } = this.props;
        if (edit) {
            this.setState({
                input: {
                    name: authors[id - 1].name,
                    website: authors[id - 1].website,
                    born: authors[id - 1].born,
                    url: authors[id - 1].url,
                    brief: authors[id - 1].brief
                }
            })
        }

    }

    inputHandler = (e) => {
        //to validate all inputs each time
        this.validationContext.validate(
            // validte the old object , the new object  
            { ...this.state.input, [e.target.name]: e.target.value }
        );
        // temp object to reset the input validation state
        let temp = {
            name: false,
            website: false,
            born: false,
            twitter: false,
            brief: false
        };
        this.validationContext.validationErrors().forEach(element => {
            temp[element.name] = true; //to capture any invalid values and make it true means it's invalid
        });

        this.setState({
            input: { ...this.state.input, [e.target.name]: e.target.value },
            error: { ...temp }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validationContext.validate({
            ...this.state.input
        });
        // if (this.validationContext.validationErrors().length == 0) {
        // }

    }
    render() {
        const { error, input } = this.state;
        return (
            <Form className="m-5 p-3" onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control size="lg" className={error.name && 'is-invalid'} type="text" placeholder="Enter full name" name="name" value={input.name} onChange={this.inputHandler} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control size="lg" className={error.website && 'is-invalid'} type="text" placeholder="Enter website" name="website" value={input.website} onChange={this.inputHandler} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Born in </Form.Label>
                    <Form.Control as="select">
                        <option>Egypt</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>United States of America</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>URL </Form.Label>
                    <Form.Control size="lg" className={error.url && 'is-invalid'} type="text" placeholder="Enter url" name="url" value={input.url} onChange={this.inputHandler} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Brief </Form.Label>
                    <Form.Control size="lg" className={error.brief && 'is-invalid'} as="textarea" rows="3" placeholder="Enter a brief" name="brief" value={input.brief} onChange={this.inputHandler} />
                </Form.Group>

                <Form.Text className="text-muted m-1">
                    We'll never share your data with anyone else.
                </Form.Text>

                <Button variant="primary" type="submit" size="lg">
                    Submit
                </Button>
            </Form>
        )
    }
}


export default AddAuthor;