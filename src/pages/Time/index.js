import React, { Component } from 'react';
import { Flex, WingBlank, DatePicker, Result, Button, Toast } from 'antd-mobile';
import go from '../../assets/go.wav'
import MyImg from '../../components/Img';

import './index.css'
class Time extends Component {

  state = {
    endTime: null,
    showTime: '',
    wall: '',
    loop: true,
    visible: false
  }

  componentDidMount() {
    this.audio = document.getElementById('audio')


  }



  over = () => {
    const { endTime } = this.state;
    if (!endTime) return;

    let flag = endTime.getTime();
    if (flag < +new Date) {
      return Toast.fail('休息时间太少了！', 2)
    }

    this.timeRange(flag);

    this.clt = setInterval(() => {
      this.timeRange(flag)
    }, 1000)
  }

  timeRange = (flag) => {
    let startTime = +new Date();
    // 剩余时间毫秒数
    let flong = flag - startTime;

    // 结束
    if (flong < 1000) {
      this.setState({
        showTime: ''
      })
      this.tips()
      return this.clTime()
    }
    let lday, lhour, lminute, lsecond;
    // 时间单位（毫秒）
    let dayTime = 24 * 60 * 60 * 1000, hourTime = 60 * 60 * 1000, miniteTime = 60 * 1000, second = 1000;
    lday = Math.floor(flong / dayTime);
    // 不够一天
    let _day = flong % dayTime;
    lhour = Math.floor(_day / hourTime);
    // 不够一小时
    let _hour = Math.floor(_day) % hourTime;
    lminute = Math.floor(_hour / miniteTime);
    // 不够一分钟
    let _minite = Math.floor(_hour % miniteTime);
    lsecond = Math.round(_minite / second);
    this.setState({
      showTime: '上课时间：' + lhour + '小时' + lminute + '分' + lsecond + '秒'
    })
  }

  // 设置上课时间
  choosetime = () => {
    this.clTime()
    const { visible } = this.state;
    this.setState({
      visible: !visible
    })
  }

  clTime = () => {
    if (this.clt) clearInterval(this.clt);
  }

  // 处理倒计时
  setTime = (v) => {
    this.setState({ endTime: v, visible: false }, () => {
      this.over()
    })
  }

  tips = () => {
    this.audio.play();
    this.cls = setTimeout(() => {
      clearTimeout(this.cls)
      this.setState({ loop: false })
    }, 60 * 1000)
  }

  componentWillUnmount() {
    this.clTime()
  }
  render() {
    return (
      <Flex className="time">
        <WingBlank>
          <Result
            img={MyImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
            title="课间休息"
            message="劳逸结合，马上回来！"
            buttonText={this.state.showTime ? this.state.showTime : '上课时间'}
            buttonType="warning"
            onButtonClick={this.choosetime}
          />
          {/* 选择时间 */}
          <DatePicker
            visible={this.state.visible}
            mode="time"
            format="HH:mm"
            title="下课"
            minDate={new Date}
            maxDate={new Date((+new Date) + 60 * 60 * 1000)}
            value={this.state.endTime}
            onDismiss={() => this.setState({ visible: false })}
            onChange={this.setTime}
            extra="选择休息时间"
          />
          <audio src={go} loop={this.state.loop} id="audio" hidden controls />
        </WingBlank>
      </Flex>
    );
  }
}

export default Time;