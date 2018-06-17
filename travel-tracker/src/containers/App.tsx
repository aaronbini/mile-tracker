import { Component } from 'react';
import * as React from 'react';
import { compose } from 'recompose';
import '../styles/App.css';
import * as actions from '../actions';
import { IAppState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

// import Dialog, {
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from 'material-ui/Dialog';
//import Typography from 'material-ui/Typography';

import { Signin } from '../components/Signin';

import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

//this interface can replace component propTypes
export interface Props {
  userName: string;
  isAuthenticated: boolean;
  loading: boolean;
  loadingz: boolean;
  classes: any;
  getTrips: () => any;
  verifyAuth: () => any;
  login: (creds: any) => any;
  getMoreTrips: () => any;
  genericButton: (action: string) => any;
}

export interface IHandlers {
  onClick: (node, data) => void;
}

const styles = (theme): React.CSSProperties => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class App extends Component<Props, IAppState> {
  props: Props;
  state: IAppState;
  handlers: IHandlers;

  constructor(props: Props) {
    super(props);
    console.log('props: ', this.props)
    console.log('state: ', this.state);
    //this.handlers = createHandlers(this.props.dispatch);
  }

  componentDidMount() {
    //initial app load, get trips for user
    //set api url in constants
    console.log('did Mount, props: ', this.props)
    console.log('did mount state: ', this.state);
    this.props.verifyAuth()
    this.props.getTrips();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
  }

  render() {
    const { classes, userName, getTrips, getMoreTrips, genericButton, login, isAuthenticated/*, loading*/ } = this.props;
    //const { onClick } = this.handlers;
    const loadingz = true;
    return (
      // <AppHeader></AppHeader>
      <div className="hello">
        {loadingz &&
          <div className="loader"></div>}
        {!isAuthenticated && <Signin login = { creds => login(creds) }/>}
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
        {isAuthenticated && <Link to="/newTrip">New Trip</Link>}
        <div className="greeting">Hello {userName}</div>
        {/* <PrivateRoute path='/dashboard' component={Dashboard} /> */}
        {/* <PrivateRoute path='/newTrip' component={NewTrip} /> */}
        <div>
          <Button onClick={e => getTrips()}>-NOT EXCITED</Button>
          <Button onClick={e => getMoreTrips()}>+AM EXCITED</Button>
          <Button onClick={e => genericButton('INCREMENT_ENTHUSIASM')}>Generic</Button>
        </div>
        <div className={classes.root}>
      </div>
      </div>
    )
  }
}


export function mapStateToProps(state: IAppState) {
  console.log('state: ', state);
  return state;
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ApiAction>) {
  return {
    verifyAuth: () => dispatch(actions.verifyAuth()),
    getTrips: () => dispatch(actions.getTrips()),
    getMoreTrips: () => dispatch(actions.getTrips()),
    genericButton: (data) => dispatch(actions.nodeClicked(data)),
    login: creds => {
      console.log('creds in app component: ', creds);
      dispatch(actions.loginUser(creds))
    }
  }
}

const app = compose(
    withStyles(styles, {
        name: 'App',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(App);

export default withRoot(app);




/* Dialog Code
<Dialog open={testDialogOpen} onClose={e => onClick(e, 'CLOSE_DIALOG')}>
  <DialogTitle>Super Secret Password</DialogTitle>
  <DialogContent>
    <DialogContentText>1-2-3-4-5</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button color="primary" onClick={e => onClick(e, 'CLOSE_DIALOG')}>
      OK
    </Button>
  </DialogActions>
</Dialog>

<Button variant="raised" color="secondary" onClick={e => onClick(e, 'OPEN_DIALOG')}>
  Open Dialog
</Button> 
*/
