import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';


class AdminNavbar extends React.Component {


    render() {

        return (
            <Navbar expand="lg" className=" navigation">
                <Navbar.Brand >
                    <h1 className="navigation__logo"><FontAwesomeIcon icon={faBookmark} /> AwesomeReads</h1>

                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/categories" className="navigation__link">Categories</Link>
                        <Link to="/books" className="navigation__link" >Books</Link>
                        <Link to="/authors" className="navigation__link">Authors</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default withRouter(AdminNavbar);
