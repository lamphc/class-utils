import React, { Component } from 'react';
import { Flex, WingBlank, Result, Icon } from 'antd-mobile';

const students = Array.from(new Array(100)).map((item, index) => '王' + index)

const DEF = 'luck-man';

class Roll extends Component {
  state = {
    luck: DEF,
    students: JSON.parse(localStorage.getItem('students')) || students,
    isRoll: false
  }

  rollLuck = () => {
    this.setState({
      isRoll: !this.state.isRoll
    }, () => {
      if (this.state.isRoll) {
        this.cln = setInterval(() => {
          this.setState({
            luck: this.selOne()
          })
        }, 0);
      } else {
        this.stopRoll()
      }
    })

  }

  stopRoll = () => {
    this.cln && clearInterval(this.cln)
  }

  selOne = () => {
    const { students } = this.state;
    let len = students.length;
    let one = Math.floor(Math.random() * len + 1) - 1;
    return students[one]
  }

  componentWillUnmount() {
    this.stopRoll()
  }
  render() {
    const { luck, isRoll } = this.state;
    return (
      <Flex className="time">
        <WingBlank>
          <Result
            img={<Icon type="check-circle" className="spe" style={{ fill: '#e94f4f' }} />}
            title={luck}
            message="随机点名"
            buttonText={!isRoll ? '点名' : '停止'}
            buttonType="primary"
            onButtonClick={this.rollLuck}
          />
        </WingBlank>
      </Flex>
    );
  }
}

export default Roll;