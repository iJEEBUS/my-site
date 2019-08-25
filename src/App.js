/**
 * Main entry point of the application.
 */

import React, { Component } from 'react';
import { Layout } from 'antd';
import Universe from './components/universe';

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activate: true
    }
  }
  toggleActivate = () => {
    this.setState({
      activate: !this.state.activate,
    })
  }



  // pass title and name to Universe
  render() {
    return(
    <Layout className="App">
      <Content className="App-content">
        { this.state.activate ? <Universe alive={true} /> : <Universe alive={false} /> }
      </Content>
    </Layout>
     
    )
  }
}
export default App;
