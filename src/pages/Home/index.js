import React, { Component, lazy } from 'react';

import { Route } from 'react-router-dom';

import { TabBar, Icon } from 'antd-mobile';
import tabBars from '../../utils/tabbar_config';

import './index.scss'

import Time from '../Time';
const Roll = lazy(() => import('../Roll'));
const Song = lazy(() => import('../Song'));
class Home extends Component {

  state = {
    selectedTab: this.props.location.pathname,
  };


  renderTabBarItems = () => {
    return tabBars.map((item, index) => <TabBar.Item
      title={item.title}
      key={index}
      icon={
        <Icon type="ellipsis" />
      }
      selectedIcon={
        <Icon type="ellipsis" />
      }
      selected={this.state.selectedTab === item.path}
      onPress={() => {
        this.setState({
          selectedTab: item.path,
        }, () => {
          this.props.history.push(item.path)
        });
      }}

    />)
  }



  render() {
    // console.log(this.props);
    return (
      <div className="home">
        <Route exact path="/home" component={Time} />
        <Route path="/home/roll" component={Roll} />
        <Route path="/home/song" component={Song} />
        <div className="barBox">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            noRenderContent={true}
          >
            {
              this.renderTabBarItems()
            }
          </TabBar>
        </div >
      </div>
    );
  }
}

export default Home;