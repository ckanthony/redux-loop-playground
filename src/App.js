import './App.css'

import React, {Component} from 'react'
import { connect } from 'react-redux';

@connect(state => ({... state}))
class App extends Component {
  componentWillMount() {
    this.props.store.dispatch({type: 'INIT'});
  }
  render() {
    console.log(this.props)
    return <div className="App">
      <div className="App-instructions App-flex">
        <img className="App-logo" src={require('./react.svg')}/>
        <h1>{this.props.user.first_name || 'loading ...'}</h1>
      </div>
    </div>
  }
}

export default App
