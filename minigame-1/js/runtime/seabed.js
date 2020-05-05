//海底世界背景
import {DataBus} from '../databus.js'
let databus = new DataBus()

export class Seabed{
  constructor(){
    this.img = wx.createImage()
    this.img.src = "images/background.png"
    this.x = 0
    this.y = 0
    this.w = 800
    this.h = 600
  }
  render(){
    //drawImage(要绘制的图片img，要绘制的图像左上角x坐标，图片尺寸宽度，图片尺寸高度，图片左上角在目标canvas上X轴坐标，图片左上角在目标canvas上Y轴坐标，图片在目标canvas上绘制的宽度，图片在目标canvas上绘制的高度)
    databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,0,0,databus.canvas.width,databus.canvas.height)
  }
}