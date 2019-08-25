/******************************************************************
 * The universe that will display the boids as they fly.
 * 
 * @author Ron Rounsifer
 ******************************************************************/
import React, { Component, Fragment } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import '../styling/universe.css';

import { 
    Layout,
  } from 'antd';
import '../styling/universe.css';

const { Content } = Layout;

/******************************************************************
 * A Total Daily Exercise Expenditure calculator form.
 ******************************************************************/
class Universe extends Component {
  constructor(props){
    super(props);
    this.state = {
      alive: props.alive,
    }
  }

  /****************************************************************
   * Render method to display the application.
   ****************************************************************/
  render() {
    return (
      <Fragment>
        { this.state.alive ? <P5Wrapper sketch={sketch}  title={this.props.title} name={this.props.name} /> : null }  
      </Fragment>
      );
  }
}

export default Universe;