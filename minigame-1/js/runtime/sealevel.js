//海平面
import {DataBus} from '../databus.js'
let databus = new DataBus()

export class Sealevel{
  constructor(){
    this.img = wx.createImage()
    this.img.src = "images/sealevel.png"
    this.x = 0
    this.y = 0
    this.w = 800
    this.h = 27
    //变化坐标
    this.newX = 0
    //速度  每次移动2个像素
    this.speed = 2
  }
  render(){
    //水平坐标
    this.newX = this.newX + this.speed
    //判断
    if(this.newX>(this.w-databus.canvas.width)){
      this.newX = 0
    }
    //drawImage(要绘制的图片img，要绘制的图像左上角x坐标，图片尺寸宽度，图片尺寸高度，图片左上角在目标canvas上X轴坐标，图片左上角在目标canvas上Y轴坐标，图片在目标canvas上绘制的宽度，图片在目标canvas上绘制的高度)
    databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,-this.newX,databus.canvas.height-this.h,this.w,this.h)
  }
}