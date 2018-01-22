# Part 3
## Changelog
1. Installed redux, then react-redux (ensure you know why redux is used, and how
it is commonly used [Click here for some answers](https://lorenstewart.me/2016/11/27/a-practical-guide-to-redux/))
2. Added index.js files in both actions and reducers folder
3. Added react-redux set up in setup.js
4. Added actions for input components, updated index.js file
5. Added reducer for input components, updated index.js file
6. Connected actions and states to components
7. Added loggingIn state, and the associated actions, as well as a Spinner to display loading. Linked logginIn state to whether inputs are disabled or not.

## Preview
![Preview Gif](./part3.gif)

## The 10-Step Redux Cycle
### Under the outermost layer .js files
1. Set up a *Store*, then wrap the App with a *Provider* that connects or spreads the data in the *Store* throughout the App components
### Under action .js files
2. Create an action (i.e. an object that has 2 properties: type and payload)
3. Define an action creator i.e. a function that takes in variables and returns an action with the data attched to be dispatched
4. Create index.js file
### Under reducer .js files
5. Define a reducer that takes in a default state, as well as listens for actions that are dispatched. It is the job of the reducer to listen out and then updates the state as per required (take careful note that reducers don't mutate state).
6. Create index.js file, import combineReducers and export the states from the reducers
### Under component .js files
7. Import the action creators
8. There are several ways to connect the action creators to the components. Under a simple context of supplying a button click event with a function,
* The most explicit method requires you to call constructor() {super ()} as well as dispatching the action creator directly
```javascript
constructor(props) {
    super(props);
}
const OnClick = (item1, item2) => {
    const actionObject = action_creator(item1, item2);
    this.props.dispatch(actionObject)
}
render() {
    return <Button onClick = {this.OnClick.bind(this)} />
}
```
* The slightly shorter method still requires the constructor () ... but instead pre-binds the action creator, so you can call the action creator directly without needing an extra function
```javascript
import { bindActionCreators } from 'redux'
.
.
.

constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators({action_creator1, action_creator2, ...}, this.props.dispatch);
}
render() {
    return <Button onClick = {this.boundActionCreators.action_creator1.bind(this)}/>
}
```
* The next method avoids constructor() and super() by utilising mapDispatchToProps, an argument that connect() accepts and provides the dispatch argument. This will be commonly used since connect() is needed for mapStateToProps as well. Like mapStateToProps, mapDispatchToProps accepts an object, or a function that returns an object. In this case, we will be passing an function that returns a boundActionCreators object. 
> connect()(Component) basically maps states as well as dispatched actions into the props of the Component contained in the brackets after.
```javascript
import {bindActionCreators} from 'redux'
.
.
.
const mapDispatchToProps = dispatch => {
    return bindActionCreators({action_creator1,...},dispatch);
    // Note the use of object short-hand
}
.
.
.
render() {
    return <Button onClick = {this.props.action_creator1.bind(this)}/>
    // Note that mapDispatchToProps passes the bounded action_creator into props
}
export default connect(mapStateToProps, mapDispatchToProps)(Component);
```
* **Recommended!!!** This method avoids even bindActionCreators. As mentioned above, mapDispatchToProps accepts an object. Passing an object will automatically pass it through bindActionCreators.
```javascript
render() {
    return <Button onClick = {this.props.action_creator1.bind(this)}/>
}
export default connect(mapStateToProps, {action_creator1, action_creator2})(Component);
```
9. For the reducer side, we need link up the states in the store to the components. Having performed <Provider> earlier merely gives access of the store to the children components, but to tap on the store's contents, we need to import the states as props in the component. Hence we do connect(mapStateToProps, ...)(App)
10. mapStateToProps will be a function that takes a state in the store and returns them as props of the component. 