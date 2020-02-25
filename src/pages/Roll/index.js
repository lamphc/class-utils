import React, { Component } from 'react';
import { WingBlank, Result, Icon } from 'antd-mobile';
// import axios from '../../utils/axios';



const students = Array.from(new Array(100)).map((item, index) => { return { student_name: '王' + index } })

const DEF = 'luck-man';

class Roll extends Component {
  state = {
    luck: DEF,
    isRoll: false
  }

  componentDidMount() {
    this.students = JSON.parse(localStorage.getItem('students')) || students;

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
    let len = this.students.length;
    let one = Math.floor(Math.random() * len + 1) - 1;
    return this.students[one].student_name
  }

  componentWillUnmount() {
    this.stopRoll()
  }
  render() {
    const { luck, isRoll } = this.state;
    return (
      <div className="time">
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
      </div>
    );
  }
}

export default Roll;