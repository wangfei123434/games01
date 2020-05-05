//倒计时文字
import {DataBus} from '../databus.js'
let databus = new DataBus()

export class Score{
  constructor(){
    // this.text = 'Count:0'
    // this.x = 50
    // this.y = 100
    this.scoreNumber = 0
    this.isScore = true
  }
  //绘制分数
  render(){
    databus.ctx.fillStyle = "white"
    databus.ctx.font = "50px 华文彩云"
    databus.ctx.fillText("count :" + this.scoreNumber,0,100,200)
  }
}