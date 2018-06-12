import { Component } from 'react';
import * as React from 'react';
import { compose } from 'recompose';
import '../styles/App.css';
import * as actions from '../actions';
import { IAppState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import Button from 'material-ui/Button';
// import Dialog, {
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

//this interface can replace component propTypes
export interface Props {
  userName: string;
  loading: boolean;
  loadingz: boolean;
  classes: any;
  getTrips: () => any;
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
    this.props.getTrips();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
  }

  render() {
    const { classes, userName, getTrips, getMoreTrips, genericButton/*, loading*/ } = this.props;
    //const { onClick } = this.handlers;
    const loadingz = true;
    return (
      // <AppHeader></AppHeader>
      <div className="hello">
      {loadingz &&
                <div className="loader"></div>}
        <div className="greeting">
          Hello {userName}
        </div>
        <div>
          <Button onClick={e => getTrips()}>-NOT EXCITED</Button>
          <Button onClick={e => getMoreTrips()}>+AM EXCITED</Button>
          <Button onClick={e => genericButton('INCREMENT_ENTHUSIASM')}>Generic</Button>
        </div>
        <div className={classes.root}>
        {/* <Dialog open={testDialogOpen} onClose={e => onClick(e, 'CLOSE_DIALOG')}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={e => onClick(e, 'CLOSE_DIALOG')}>
              OK
            </Button>
          </DialogActions>
        </Dialog> */}
        <Typography variant="display1" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subheading" gutterBottom>
          example project
        </Typography>
        {/* <Button variant="raised" color="secondary" onClick={e => onClick(e, 'OPEN_DIALOG')}>
          Open Dialog
        </Button> */}
      </div>
      </div>
    )
  }
}


export function mapStateToProps(state: IAppState) {
  console.log('state: ', state);
  return state;
}
//TODO: add another method for completed http call
//This can't be used in this top level component, can be used in function-based child components
export function mapDispatchToProps(dispatch: Dispatch<actions.ApiAction>) {
  return {
    getTrips: () => dispatch(actions.getTrips()),
    getMoreTrips: () => dispatch(actions.getTrips()),
    genericButton: (data) => dispatch(actions.nodeClicked(data))
  }
}

const app = compose(
    withStyles(styles, {
        name: 'App',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(App);

export default withRoot(app);
