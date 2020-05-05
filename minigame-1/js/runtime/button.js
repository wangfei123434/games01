//播放按钮
import {DataBus} from '../databus.js'
let databus = new DataBus()

export class Button{
  constructor(){
    this.img = wx.createImage()
    this.img.src = "images/start_button.png"
    this.x = 0
    this.y = 0
    this.w = 64
    this.h = 64
  }
  render(){
    //drawImage(要绘制的图片img，要绘制的图像左上角x坐标，图片尺寸宽度，图片尺寸高度，图片左上角在目标canvas上X轴坐标，图片左上角在目标canvas上Y轴坐标，图片在目标canvas上绘制的宽度，图片在目标canvas上绘制的高度)
    databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,(databus.canvas.width-this.w)/2,(databus.canvas.height-this.h)/2,this.w,this.h)
  }
}