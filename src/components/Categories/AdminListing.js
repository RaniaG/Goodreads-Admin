import React from 'react';
import CategoryCard from './Card';
// import categories from '../../data/categories';
import Listing from '../Listing/Listing';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import AddCategory from './Add';

const categories = [];

export default class CategoriesAdminListing extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            categories: categories,
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Row className="justify-content-center m-5">
                    <Col md={9} className="d-flex flex-column">
                        <Button className="d-flex mx-5 align-self-end add-category-btn" onClick={this.handleShow}><FontAwesomeIcon icon={faPlusSquare} size="2x" /></Button>
                        <Listing list={this.state.categories} viewType='list' viewControls={false}>
                            <CategoryCard />
                        </Listing>
                    </Col>
                </Row>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <AddCategory edit={false} handleClose={this.handleClose} />
                </Modal>
            </>
        )
    }
}