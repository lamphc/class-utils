import React, { Component } from 'react'
import { WingBlank, Result, Icon, Button, WhiteSpace, Toast, Slider } from 'antd-mobile'
// 洗牌算法
import { shuffle } from 'lodash'
// import axios from '../../utils/axios';
// import { bounce } from 'react-animations';
// import Radium, { StyleRoot } from 'radium';

const students = Array.from(new Array(100)).map((item, index) => { return { student_name: '王' + index } })

const DEF = 'luck man'

const ClassMap = [{ id: 5779, label: '89期' }, { id: 5780, label: '90期' }]
// const styles = {
//   bounce: {
//     animation: 'x 1s',
//     animationName: Radium.keyframes(bounce, 'bounce')
//   }
// }
window.shuffle = shuffle
const reg = /(?<=.)./g
class Roll extends Component {
  state = {
    luck: DEF,
    isRoll: false
  }

  speed = 60

  changeSpeed = (sp) => {
    // console.log(sp)
    this.speed = sp
  }

  componentDidMount () {
    this.students = JSON.parse(localStorage.getItem('students')) || students

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
        }, this.speed)
      } else {
        this.stopRoll()
      }
    })

  }

  stopRoll = () => {
    this.cln && clearInterval(this.cln)
  }

  // 洗牌算法
  shuffleClass = () => {
    this.students = shuffle(this.students)
    Toast.success(`成功洗牌${this.students.length}条数据，顺序已重新打乱！
    \r 结果：${this.students.map((item) => item.student_name.replace(reg, '*')).join(',')
      }`, 2)
    // console.log('清洗结果：', this.students)
  }

  selOne = () => {
    let len = this.students.length
    let one = Math.floor(Math.random() * len + 1) - 1
    // 处理班级
    let cur = this.students[one], name = cur.student_name
    if (cur.class_id) {
      const cas = ClassMap.filter((item) => item.id === cur.class_id)
      cas.length && (name += `（${cas[0].label}）`)
    }
    return name
  }

  componentWillUnmount () {
    this.stopRoll()
  }
  render () {
    const { luck, isRoll } = this.state
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
          <WhiteSpace />
          <Button type="warning" onClick={this.shuffleClass} >洗牌</Button>
          <Slider

            marks={{ 10: '100迈', 50: '50迈', 90: '10迈' }}
            defaultValue={this.speed}
            min={10}
            max={90}
            onChange={this.changeSpeed}
          />

        </WingBlank>
      </div>
    )
  }
}

export default Roll