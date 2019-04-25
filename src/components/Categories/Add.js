import React from 'react';
import SimpleSchema from 'simpl-schema';
import { Form, Button } from 'react-bootstrap';
// import categories from '../../data/categories';
const categories = [];


export default class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {
                categoryName: '',
            },
            error: {
                categoryName: false,
            },
            invalidSubmit: true,
        }
        this.validationContext = new SimpleSchema({
            categoryName: {
                optional: false,
                type: String,
                min: 3,
                max: 25,
            },
        }).newContext();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        //debugger;
        const name = e.target.name;
        const value = e.target.value;
        this.validationContext.validate({ ...this.state.input, [name]: value });
        //console.log(this.validationContext.validationErrors());
        const index = this.validationContext.validationErrors().findIndex(a => a.name === name);
        let errorsArr;
        let invalid = true;
        if (index > -1) {
            errorsArr = { [name]: true };
        }
        else {
            errorsArr = { [name]: false };
            invalid = false;
        }
        this.setState({
            input: { ...this.state.input, [name]: value },
            error: { ...this.state.error, ...errorsArr },
            invalidSubmit: invalid,
        });
    }

    handleSubmit(e) {
        //debugger;
        e.preventDefault();
        this.validationContext.validate({ ...this.state.input });
        //console.log(this.validationContext.validationErrors().length);
        if (this.validationContext.validationErrors().length === 0) {
            //console.log('okay');
            this.setState({
                input: { ...this.state.input, ...{ categoryName: '' } },
            })
        } else {
            let errorsArr = { categoryName: false };
            this.validationContext.validationErrors().forEach((a) => {
                errorsArr[a.name] = true;
            });

            this.setState({
                error: { ...this.state.error, ...errorsArr },
            });
        }
    }

    componentDidMount() {
        const { edit, id } = this.props;
        if (edit) {
            this.setState({
                input: {
                    categoryName: categories[id - 1].name,
                }
            });
        }
    }

    render() {
        const { input, error, invalidSubmit } = this.state;
        return (
            <Form className="m-5" onSubmit={this.handleSubmit} >
                <Form.Group>
                    <Form.Label>Add New Category:</Form.Label>
                    <Form.Control type="text" placeholder="Category" size="lg" name="categoryName" value={input.categoryName} onChange={this.handleChange} className={error.categoryName && 'is-invalid'} />
                </Form.Group>
                <Button className="button--1" type="submit" size="lg" disabled={invalidSubmit} onClick={this.props.handleClose} >Add</Button>
            </Form>
        );
    }
}