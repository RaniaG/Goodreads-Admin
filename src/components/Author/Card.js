

import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import AddAuthor from './Add';
class AuthorCard extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            editShow: false,
            deleteShow: false
        };
    }

    render() {
        const { id, image, name, userType } = this.props;
        let editClose = () => this.setState({ editShow: false });
        let deleteClose = () => this.setState({ deleteShow: false });

        return (
            <>
                <Card className='author m-3'>
                    <Card.Img variant="top" src={image === "" ? "https://bobandsuewilliams.com/images/gray-1.jpg" : image} />
                    <Card.Body>
                        <Card.Title><NavLink to={`/author/${id}`}>{name}</NavLink>
                            {/* float-right */}

                            {userType === 'admin' &&
                                <>
                                    <Button variant="transparent" size="lg" onClick={() => this.setState({ editShow: true })}>
                                        <FontAwesomeIcon icon={faEdit} className="m-1"></FontAwesomeIcon>
                                    </Button>
                                    <Button variant="transparent" size="lg" onClick={() => this.setState({ deleteShow: true })}>
                                        <FontAwesomeIcon icon={faTrash} className="m-1"></FontAwesomeIcon>
                                    </Button>
                                </>
                            }
                        </Card.Title>
                    </Card.Body>
                </Card>
                <Modal size="lg" show={this.state.editShow} onHide={editClose}>
                    <AddAuthor edit={true} id={id} />
                </Modal>

                <Modal show={this.state.deleteShow} onHide={deleteClose}>
                    {/* { window.confirm(" Are you sure you want to delete this ? ") }  */}
                    <Modal.Body className="p-5">
                        <p> Are you sure you want to delete this ? </p>
                        <Button size="lg" variant="primary" onClick={() => this.setState({ deleteShow: false })}>Ok</Button>
                        <Button size="lg" className="m-1" variant="secondary" onClick={() => this.setState({ deleteShow: false })}>Cancel</Button>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
const mapState2Props = (state) => ({ userType: state.user.type })
export default connect(mapState2Props)(AuthorCard);
