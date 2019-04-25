import React from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddBook from './Add';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CardBrief extends React.Component {
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
        const { id, title, cover, author, userType } = this.props;
        return (
            <>
                <Card className="book-card book-card-brief">
                    {userType === 'admin' &&
                        < Card.Text className="d-flex justify-content-end">
                            <Button onClick={this.handleEditShow} className="font-awesome-btn" ><FontAwesomeIcon icon={faEdit} size="lg" /></Button>
                            <Button onClick={this.handleDeleteShow} className="font-awesome-btn" ><FontAwesomeIcon icon={faTrash} size="lg" /></Button>
                        </Card.Text>
                    }  
                    <Card.Img variant="top" src={cover} alt={title} style={{ height: '22rem' }} />
                    <Card.Body>
                        <Card.Title className="book-card-title-brief"><Link to={`/book/${id}`}>{title}</Link></Card.Title>
                        <Card.Text>by <Link to={`/author/${author.id}`} >{author.name}</Link> </Card.Text>
                    </Card.Body>
                </Card>
                <Modal show={this.state.editShow} onHide={this.handleEditClose}>
                    <AddBook edit={true} id={id} handleClose={this.handleEditClose} />
                </Modal>
                <Modal show={this.state.deleteShow} onHide={this.handleDeleteClose}>
                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button size="lg" className="button--1" onClick={this.handleDeleteClose}>Delete</Button>
                        <Button size="lg" className="button--2" onClick={this.handleDeleteClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return ({
        userType: state.user.type,
    });
};
export default connect(mapStateToProps)(CardBrief);
