import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddCategory from './Add';

export default class CategoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editShow: false,
            deleteShow: false,
        }
        this.handleEditShow = this.handleEditShow.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);

        this.handleDeleteShow = this.handleDeleteShow.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
    }

    handleEditClose() {
        this.setState({ editShow: false });
    }

    handleEditShow() {
        this.setState({ editShow: true });
    }

    handleDeleteClose() {
        this.setState({ deleteShow: false });
    }

    handleDeleteShow() {
        this.setState({ deleteShow: true });
    }

    render() {
        const { id, name } = this.props;
        return (
            <>
                <Card className="category-card">
                    <Card.Body className="d-flex justify-content-between">
                        <Card.Title className="mb-0 category-card-title">{name}</Card.Title>
                        <Card.Text className="d-flex justify-self-end">
                            <Button onClick={this.handleEditShow} ><FontAwesomeIcon icon={faEdit} size="2x" /></Button>
                            <Button onClick={this.handleDeleteShow} ><FontAwesomeIcon icon={faTrash} size="2x" /></Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Modal show={this.state.editShow} onHide={this.handleEditClose}>
                    <AddCategory edit={true} id={id} handleClose={this.handleEditClose} />
                </Modal>
                <Modal show={this.state.deleteShow} onHide={this.handleDeleteClose}>
                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button size="lg" className="button--1" onClick={this.handleDeleteClose}>Delete</Button>
                        <Button size="lg" className="button--2" onClick={this.handleDeleteClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}