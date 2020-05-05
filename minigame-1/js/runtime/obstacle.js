//障碍物
import {DataBus} from '../databus.js'
let databus = new DataBus()

export class Obstacle{
  constructor(top,src,imgtype){
    this.img = wx.createImage()
    this.img.src = src
    this.x = databus.canvas.width
    this.y = 0
    this.w = 86
    this.h = 406
    this.top = top
    this.imgtype = imgtype
    this.spped = 2
  }
  render(){
    if(this.imgtype == "up"){
      this.y = this.top - this.h     //随机距离减去自身高度
    }else{
      let height = databus.canvas.height/5
      this.y = this.top + height
    }
    this.x = this.x - this.spped
    //drawImage(要绘制的图片img，要绘制的图像左上角x坐标，要绘制的图像左上角y坐标，图片尺寸宽度，图片尺寸高度，图片左上角在目标canvas上X轴坐标，图片左上角在目标canvas上Y轴坐标，图片在目标canvas上绘制的宽度，图片在目标canvas上绘制的高度)
    databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.y,this.w,this.h)
  }
}