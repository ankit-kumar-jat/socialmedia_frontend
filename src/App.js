import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navigation from "./components/navigation";
import Home from './pages/Home';
import Login from "./pages/Login"
import Register from './pages/Register';
import User from './pages/User';
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute"
import NotFound from "./pages/NotFound";
import ForgetPass from './pages/ForgetPass';
import AuthContext from "./utils/AuthContext";
import Settings from './pages/Settings';
import Feed from './pages/Feed';
import Trending from './pages/Trending';
import PostById from './pages/PostById';
import { SnackbarProvider } from 'notistack';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory({ basename: '/socialmedia_frontend' });

const authReducer = (authState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...authState,
        isAuthenticated: true,
        userId: action.payload.userId,
        username: action.payload.username
      };
    case "LOGOUT":
      return {
        ...authState,
        isAuthenticated: false,
        userId: null,
        username: null
      };
    case "REFPOST":
      return {
        ...authState,
        refreshPost: !authState.refreshPost
      };
    case "REFUSER":
      return {
        ...authState,
        refreshUser: !authState.refreshUser
      };
    default:
      return authState;
  }
};


function App(props) {
  const initialState = props.initialState;
  const [authState, authDispatch] = React.useReducer(authReducer, initialState);

  return (
    <React.Fragment>
      {/*<Router basename="/socialmedia_frontend" history={history}>*/}
      <Router>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          maxSnack={2}
        >
          <AuthContext.Provider value={{ authState, authDispatch }}>
            <Navigation>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PublicRoute exact path="/login" component={Login} />
                <PublicRoute exact path="/forgetpass" component={ForgetPass} />
                <PublicRoute exact path="/register" component={Register} />
                <PrivateRoute exact path="/settings" component={Settings} />
                <PrivateRoute exact path="/feed" component={Feed} />
                <PrivateRoute exact path="/trending" component={Trending} />
                <PrivateRoute exact path="/posts/:postId" component={PostById} />
                <PrivateRoute exact path="/users/:username" component={User} />
                <Route component={NotFound} />
              </Switch>
            </Navigation>
          </AuthContext.Provider>
          <ScrollToTop />
        </SnackbarProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
