import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminNavbar from './components/NavBar/admin';
import CategoriesAdminListing from './components/Categories/AdminListing';
import BookListing from './components/Book/Listing';
import AuthorListing from './components/Author/Listing';
import { connect } from 'react-redux';

import './API';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <>
          <AdminNavbar />
          <div className="content">
            <Switch >
              {/* admin routes */}
              <Route path="/" exact component={CategoriesAdminListing} />
              <Route path="/categories" exact component={CategoriesAdminListing} />
              <Route path="/books" exact render={
                (props) => <BookListing showControls={true} showSearchbox={true} />
              } />
              <Route path="/authors" exact render={
                (props) => <AuthorListing showControls={true} showSearchbox={true} />
              } />
            </Switch>
          </div>

        </>
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
// export default App;
