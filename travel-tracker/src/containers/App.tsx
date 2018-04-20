import { Component } from 'react';
import * as React from 'react';
import { compose } from 'recompose';
import { connect/*, Dispatch*/ } from 'react-redux';

import Button from 'material-ui/Button';
import Dialog, {
  // DialogTitle,
  // DialogContent,
  // DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';
//import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import { IAppState } from '../types/index';
import * as actions from '../actions';
import '../styles/App.css';
import withRoot from '../withRoot';
import { AppFooter } from '../components/app-footer/AppFooter';
import { AppHeader } from '../components/app-header/AppHeader';

//this interface can replace component propTypes
export interface Props {
  name: string;
  enthusiasmLevel: number;
  dispatch: (action: any) => any;
  classes: any;
  testDialogOpen: boolean;
}

export interface IHandlers {
  onClick: (node, data) => void;
}

//register generic click handlers here for simple sync actions?
let createHandlers = (dispatch: Props['dispatch']) => {
  //generic click handler, passed a string that corresponds to action type
  let onClick = (node, data) => {
    dispatch(actions.nodeClicked(data));
  };

  return {
    onClick
  };
}

const styles = (theme): React.CSSProperties => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class App extends Component {
  props: Props;
  handlers: IHandlers;

  constructor(props: Props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  componentDidMount() {
    //initial app load, get trips for user
    //set api url in constants
    console.log('did Mount')
    const { dispatch } = this.props
    dispatch(actions.getTrips('http://localhost:8082/api/trips'));
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
    //if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      //const { dispatch } = nextProps;
      //dispatch(fetchPostsIfNeeded(selectedSubreddit))
    //}
  }

  handleRefreshClick = e => {
    e.preventDefault()

    // const { dispatch, selectedSubreddit } = this.props
    // dispatch(invalidateSubreddit(selectedSubreddit))
    // dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { enthusiasmLevel, name, classes, testDialogOpen } = this.props;
    const { onClick } = this.handlers;
    return (
      <div className="App">
        <AppHeader selectedIndex={0}></AppHeader>
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
        <div className="font-overriding-default">
          <Button className="font-overriding-default" onClick={e => onClick(e, 'DECREMENT_ENTHUSIASM')}>-NOT EXCITED</Button>
          <Button className="font-overriding-default" onClick={e => onClick(e, 'INCREMENT_ENTHUSIASM')}>+AM EXCITED</Button>
        </div>
        <div className={classes.root}>
          <Dialog className="font-overriding-default" open={testDialogOpen} onClose={e => onClick(e, 'CLOSE_DIALOG')}>
            <h2 className="font-overriding-default">Super Secret Password</h2>
            <h3 className="font-overriding-default">
              <p>1-2-3-4-5</p>
            </h3>
            <DialogActions>
              <Button className="font-overriding-default" color="primary" onClick={e => onClick(e, 'CLOSE_DIALOG')}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Button className="font-overriding-default" variant="raised" color="secondary" onClick={e => onClick(e, 'OPEN_DIALOG')}>
            Open Dialog
          </Button>
        </div>
        <AppFooter />
      </div>
    )
  }
}

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}

export function mapStateToProps({ enthusiasmLevel, languageName, testDialogOpen }: IAppState) {
  return {
    enthusiasmLevel,
    name: languageName,
    testDialogOpen
  }
}
//TODO: add another method for completed http call
//This can't be used in this top level component, can be used in function-based child components
// export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
//   return {
//     onDecrement: () => dispatch(actions.decrementEnthusiasm()),
//     onIncrement: () => dispatch(actions.incrementEnthusiasm()),
//   }
// }
//connect redux state to component state?
//the above functions at least appear to map all the properties to the component props
//so passing props into constructor seems unnecessary
//export default connect(mapStateToProps)(App);

const app = compose(
    withStyles(styles, {
        name: 'App',
    }),
    connect(mapStateToProps),
)(App);

export default withRoot(app);
