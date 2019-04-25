import React from 'react';
import Rater from 'react-rater'
import { Dropdown, Card, Row, Col, ButtonGroup, Button, Image, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddBook from './Add';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class BookDetailedCard extends React.Component {
    constructor(bookProps) {
        super(bookProps);
        this.state = {
            shelf: 'Want To Read',
            bookRate: 'Rate this book',
            editShow: false,
            deleteShow: false,
        }
        this.handleClick = this.handleClick.bind(this);

        this.handleEditShow = this.handleEditShow.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);

        this.handleDeleteShow = this.handleDeleteShow.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
    }

    handleClick(e) {
        const value = e.target.value;
        this.setState({
            shelf: value,
        })
        if (value === 'Read') {
            this.setState({
                bookRate: 'My rating:',
            })
        }
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
        const { id, title, author, avgRating, cover, userType } = this.props;
        return (
            <>
                <Card className="book-card book-card-detailed ">
                    {userType === 'admin' &&
                        < Card.Text className="d-flex justify-content-end">
                            <Button onClick={this.handleEditShow} className="font-awesome-btn" ><FontAwesomeIcon icon={faEdit} size="lg" /></Button>
                            <Button onClick={this.handleDeleteShow} className="font-awesome-btn" ><FontAwesomeIcon icon={faTrash} size="lg" /></Button>
                        </Card.Text>
                    }
                    <Row className="no-gutters">
                        <Col md={2} className="p-3">
                            <Image src={cover} alt={title} rounded fluid />
                        </Col>
                        <Col md={7}>
                            <Card.Body>
                                <h3 className="book-card-title book-card-title-detailed"> <Link to={`/book/${id}`}>{title}</Link></h3>
                                <h5 className="book-card-author">by <Link to={`/author/${author.id}`} >{author.name}</Link></h5>
                                <div>
                                    <span className="rater-lg"><Rater rating={avgRating} total={5} interactive={false} /></span>
                                    <span className="card-text"><small className="text-muted book-grey-text"> {avgRating} avg. rating</small></span>
                                </div>
                            </Card.Body>
                        </Col>
                        <Col md={3} className="shelfDropdown-container">
                            <Dropdown as={ButtonGroup} size="lg" >
                                <Button className="shelfDropdown-btn">{this.state.shelf}</Button>
                                <Dropdown.Toggle split id="dropdown-split-basic" className="shelfDropdown-btn" />
                                <Dropdown.Menu className="shelfDropdown-menu">
                                    <Dropdown.Item as="button" onClick={this.handleClick} value="Read">Read</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={this.handleClick} value="Currently Reading">Currently Reading</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={this.handleClick} value="Want to Read">Want to Read</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="myAlign-center">
                                <small className="text-muted grey-text">{this.state.bookRate} </small>
                                <div className="rater-md">
                                    <Rater total={5} interactive={true} />
                                </div>
                            </div>
                        </Col>
                    </Row>
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
        )
    }
}

const mapStateToProps = state => {
    return ({
        userType: state.user.type,
    });
};
export default connect(mapStateToProps)(BookDetailedCard);