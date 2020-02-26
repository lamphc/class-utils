import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

class Header extends Component {

  render() {
    const { title, onLeftClick, pos } = this.props;
    return (
      <div className={pos}>
        <NavBar
          mode="dark"
          onLeftClick={onLeftClick}
          rightContent={[,
            <Icon key="1" type="ellipsis" />
          ]}
        >{title || '导航'}</NavBar>
      </div>
    );
  }
}

export default Header;