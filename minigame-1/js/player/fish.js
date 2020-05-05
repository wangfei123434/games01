//小鱼
import {DataBus} from '../databus.js'
let databus = new DataBus()

export class Fish{
  constructor(){
    this.img = wx.createImage()
    this.img.src = "images/fish1.png"
    this.x = databus.canvas.width/4
    this.y = databus.canvas.height/2
    this.w = 41
    this.h = 30
    this.time = 0     //下落事件
    this.newy = databus.canvas.height/2
  }
  render(){
    //模拟重力加速度
    let g = 0.98 / 2.9
    //设置回弹的偏移量
    let offsetUp = 30
    //计算出位移量(自由落体的高度)
    let offsetY = (g*this.time*(this.time - offsetUp))/2
    this.newy = this.y + offsetY
    this.time ++
    

    //drawImage(要绘制的图片img，要绘制的图像左上角x坐标，要绘制的图像左上角y坐标，图片尺寸宽度，图片尺寸高度，图片左上角在目标canvas上X轴坐标，图片左上角在目标canvas上Y轴坐标，图片在目标canvas上绘制的宽度，图片在目标canvas上绘制的高度)
    databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.newy,this.w,this.h)
  }
}