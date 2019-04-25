import React from 'react'
import { Row, Col, Form, Modal } from 'react-bootstrap';
import Listing from '../Listing/Listing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'
// import authors from '../../data/authors';
import Rater from 'react-rater'
import AuthorCard from './Card';
import { connect } from 'react-redux';
import AddAuthor from './Add';



/**
 * this is listing for Authors
 * props: 
 *      *showControls: true or false
 *          it hides or shows the filters and search bar
 *      
 */
const authors = [];

class AuthorListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filters: {
                search: this.props.searchValue || "",
                sort: "name",
                category: this.props.categories || [],
                rating: [],
            },
            addAuthorView: false
        }
        this.search = this.search.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
        this.showAddAuthor = this.showAddAuthor.bind(this);
        this.closeAddAuthor = this.closeAddAuthor.bind(this);
    }
    showAddAuthor() {
        this.setState({ addAuthorView: true });
    }
    closeAddAuthor() {
        this.setState({ addAuthorView: false });
    }
    handleTextInput(event) {
        this.setState({ filters: { ...this.state.filters, search: event.target.value } });
    }
    updateFilter(filter) {
        return (event) => {
            this.setState({ filters: { ...this.state.filters, [filter]: event.target.value } });
            this.search({ ...this.state.filters, [filter]: event.target.value });
        }
    }
    addFilter(filter, value) {
        return (event) => {
            // debugger;
            const { filters } = this.state;
            if (!filters[filter].includes(value)) {
                this.setState({ filters: { ...filters, [filter]: [...filters[filter], value] } });
                this.search({ ...filters, [filter]: [...filters[filter], value] });
            }
        }
    }
    removeFilter(filter, value) {
        return (event) => {
            const { filters } = this.state;
            const arrCopy = filters[filter].slice();
            arrCopy.splice(arrCopy.indexOf(value), 1);
            this.setState({ filters: { ...filters, [filter]: arrCopy } });
            this.search({ ...filters, [filter]: arrCopy });
        }
    }
    onSubmit(e) {
        e.preventDefault();
        this.search();
    }
    search(newFilters) {
        const filters = newFilters || this.state.filters;
        const filteredData = authors.filter((el) => {
            return ((filters.category.length > 0 && filters.category.includes(el.category)) || filters.category.length === 0)
                &&
                ((filters.rating.length > 0 && filters.rating.includes(Math.round(el.rating))) || filters.rating.length === 0)
                &&
                el.name.toLowerCase().includes(filters.search.toLowerCase());
        });
        const sorting = {
            name: (a, b) => {
                // debugger;
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            },
            rating: (a, b) => {
                if (a.rating < b.rating) {
                    return -1;
                }
                if (a.rating > b.rating) {
                    return 1;
                }
                return 0;
            }
        }
        // debugger;
        // const x = sorting[filters.sort];
        this.setState({ data: filteredData.sort(sorting[filters.sort]) });
    }
    componentDidMount() {
        this.search();
    }
    componentWillReceiveProps(nextProps) {
        this.search({ ...this.state.filters, search: nextProps.searchValue });
    }
    render() {
        // debugger;
        const { showControls, showSearchbox } = this.props;
        const { filters } = this.state;
        return (
            <Row className="no-gutters">
                <Col md={12}>
                    {showControls && <Row className="justify-content-end  p-4 no-gutters">
                        <Col md={6} className="d-flex flex-row justify-content-end align-items-center">
                            {showSearchbox && <div className="mr-3">
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Control size="lg" value={this.state.filters.search} type="text" placeholder="Search" onChange={this.handleTextInput} />
                                </Form>
                            </div>}
                            <select name="SortBy" onChange={this.updateFilter('sort')} >
                                <option value="name">Sort by: Name</option>
                                <option value="rating">Sort by: Rating</option>
                            </select>
                        </Col>
                    </Row>}
                    <Row className="no-gutters justify-content-center">
                        {showControls && <Col md={3} className="filters">
                            <h3 className="filters__title">Category</h3>
                            <ul className="u-list-no-bullet">
                                <li className="filters__item" onClick={this.addFilter('category', 'Fiction')}>Fiction</li>
                                <li className="filters__item" onClick={this.addFilter('category', 'Mystery')}>Mystery</li>
                                <li className="filters__item" onClick={this.addFilter('category', 'Horror')}>Horror</li>
                                <li className="filters__item" onClick={this.addFilter('category', 'Romance')}>Romance</li>
                                <li className="filters__item" onClick={this.addFilter('category', 'Thriller')}>Thriller</li>
                            </ul>
                            <h3 className="filters__title">Reviews</h3>
                            <ul className="u-list-no-bullet">
                                <li onClick={this.addFilter('rating', 5)} className="filters__item">
                                    <Rater rating={5} total={5} interactive={false} />
                                    {/* <FontAwesomeIcon icon={faStar} className="checked" />
                                    <FontAwesomeIcon icon={faStar} className="checked" />
                                    <FontAwesomeIcon icon={faStar} className="checked" />
                                    <FontAwesomeIcon icon={faStar} className="checked" />
                                    <FontAwesomeIcon icon={faStar} className="checked" /> */}
                                </li>
                                <li onClick={this.addFilter('rating', 4)} className="filters__item">
                                    <Rater rating={4} total={5} interactive={false} />
                                </li>
                                <li onClick={this.addFilter('rating', 3)} className="filters__item">
                                    <Rater rating={3} total={5} interactive={false} />
                                </li>
                                <li onClick={this.addFilter('rating', 2)} className="filters__item">
                                    <Rater rating={2} total={5} interactive={false} />
                                </li>
                                <li onClick={this.addFilter('rating', 1)} className="filters__item">
                                    <Rater rating={1} total={5} interactive={false} />
                                </li>

                            </ul>

                        </Col>
                        } <Col md={9}>
                            <div className="d-flex flex-row mt-4">
                                {
                                    filters.category.map((el) =>
                                        <div key={el} className="filters__tag">
                                            {el}
                                            <FontAwesomeIcon icon={faTimesCircle} size="2x" className="ml-2" onClick={this.removeFilter('category', el)} />
                                        </div>
                                    )
                                }
                                {
                                    filters.rating.map((el) =>
                                        <div key={el} className="filters__tag">
                                            Rating: {el}
                                            <FontAwesomeIcon icon={faTimesCircle} size="2x" className="ml-2" onClick={this.removeFilter('rating', el)} />
                                        </div>
                                    )
                                }

                            </div>
                            {
                                this.props.userType === 'admin' &&
                                <>
                                    <div className="d-flex justify-content-end pr-5">
                                        <button className="button button--1" onClick={this.showAddAuthor}>
                                            <FontAwesomeIcon icon={faUserPlus} size="2x" />
                                        </button>
                                    </div>
                                    <Modal show={this.state.addAuthorView} onHide={this.closeAddAuthor}>
                                        <AddAuthor edit={false} />
                                    </Modal>
                                </>
                            }
                            <Listing list={this.state.data} viewType='grid' viewControls={false}>
                                <AuthorCard />
                            </Listing>
                        </Col>
                    </Row>
                </Col>
            </Row>
            // <Spinner animation="border" role="status">
            //     <span className="sr-only">Loading...</span>
            // </Spinner>
        )
    }
}
export default connect(function (state) { return { userType: state.user.type } })(AuthorListing);