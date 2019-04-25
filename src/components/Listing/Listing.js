import React from 'react';
import { Row, Col, Button, Pagination } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTh } from '@fortawesome/free-solid-svg-icons'

/**
 * this class takes an array and lists it in a format specified by input props
 * props:
 *     * viewType:
 *          -values --> 'list', 'grid'
 *          - it specifies how the array will be listed as grid or list
 *     * viewControls:
 *           -values: --> true, false
 *           - it controls the display of control buttons to the user which allow him to switch views
 *     * children:
 *          - values --> either one or two tags only
 *          - the children specifies the template element which will be repeated multiple times
 *     * list:
 *          - values: --> array of objects
 *          - this array will be mapped to the template element sent in children 
 *              and the value of each object will be sent to that template element as props
 * 
 * note:
 *      if you want the user to switch between views then send two elements in children
 *      and set viewControls to true
 *      otherwise only send only one element as children and set viewControls to false
 */
export default class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: this.props.viewType
        }
        this.changeView = this.changeView.bind(this);
    }

    changeView(viewType) {
        return () => {
            if (this.state.view !== viewType)
                this.setState({ view: viewType });
        }
    }
    render() {
        const { list, viewControls } = this.props;
        const { view } = this.state;
        let listItemsWithProps = [];
        const element = Array.isArray(this.props.children) ? this.props.children[this.state.view === 'list' ? 0 : 1] : this.props.children;
        listItemsWithProps = list.map((elm) => <Col md={view === 'list' ? 12 : 3} key={elm.id} className="mt-3">{React.cloneElement(element, elm)}</Col>);

        // debugger;
        return (
            <div className="ml-5 mr-5 mt-2" >
                {viewControls && <Row>
                    <Col md={12} className="d-flex justify-content-end">
                        <Button variant="light" active={this.state.view === 'list'} onClick={this.changeView('list')}><FontAwesomeIcon icon={faList} size="2x" /></Button>
                        <Button variant="light" active={this.state.view === 'grid'} onClick={this.changeView('grid')}><FontAwesomeIcon icon={faTh} size="2x" /></Button>
                    </Col>
                </Row>}

                <Row >
                    {
                        listItemsWithProps
                    }
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content-end">
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </Col>
                </Row>

            </div >

        );
    }
}