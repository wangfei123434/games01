import {DataBus} from './databus.js';
import {Seabed} from './runtime/seabed.js';
import {Sealevel} from './runtime/sealevel.js';
import {Button} from './runtime/button.js';
import {Music} from './runtime/music.js';
import {Obstacle} from './runtime/obstacle.js';
import {Score} from './player/score.js';
import {Fish} from './player/fish.js';
let databus = new DataBus();
let music = new Music()
export class Main{
  constructor(){
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext("2d");
    databus.canvas = this.canvas;
    databus.ctx = this.ctx;
    //页面初始化init
    this.init()
    //调用触屏事件
    this.registerEvent()
  }

  init(){
    this.bg = new Seabed()
    this.level = new Sealevel()
    this.button = new Button()
    this.score = new Score()
    this.fish = new Fish()
    //创建障碍物
    this.createObstacle()
    this.starGame()
    // setTimeout(()=>{
    //   databus.gameover = true
    // },5000)
  }
  // check检查是否与渔网碰撞到
  check(){
    let fishBorder = {
      top: this.fish.y,
      bottom: this.fish.y + this.fish.h,
      left: this.fish.x,
      right: this.fish.x + this.fish.w
    }
    //循环遍历所有的障碍物
    for(let i = 0;i < databus.obstaclelist.length;i ++){
      //创建障碍物边框模型
      let obstacle = databus.obstaclelist[i]
      let obstacleBorder = {
        top: obstacle.y,
        bottom: obstacle.y + obstacle.h,
        left: obstacle.x,
        right: obstacle.x + obstacle.w
      }
      if(this.isCheck(fishBorder,obstacleBorder)){
        console.log("抓到鱼了")
        databus.gameover = true
        return
      }
    }
    // 和海平面撞击判断
    if(this.fish.newy + this.fish.h >= databus.canvas.height - this.level.h){
      console.log("撞击地板了")
      //撞击地板的话就设置游戏状态，停止游戏
      databus.gameover = true
      return
    }
    //加分逻辑
    if(this.fish.x > databus.obstaclelist[0].x + databus.obstaclelist[0].img.width && this.score.isScore){
      wx.vibrateShort({
        success: (res) => {
          console.log("震动成功")
        }
      })
      this.score.isScore = false
      this.score.scoreNumber ++ 
    }
  }
  //验证是否有碰撞封装
  isCheck(fish,obstacle){
    let s = false    //未碰撞状态
    if(fish.top > obstacle.bottom || fish.bottom < obstacle.top || fish.right < obstacle.left || fish.left > obstacle.right){
      s = true
    }
    return !s
  }
  //开始游戏
  starGame(){
    this.check()
    if(!databus.gameover){
      this.bg.render()       //渲染背景
      this.level.render()    //渲染底部海平面
      this.score.render()    //渲染倒计时文字
      this.fish.render()     //渲染小鱼
      // 渲染障碍物
      databus.obstaclelist.forEach(value=>{
        value.render()
      })
      //清除障碍物
      //当第一次障碍物消失屏幕时，需要清除之前的第一组
      if(databus.obstaclelist[0].x + databus.obstaclelist[0].img.width <= 0 && databus.obstaclelist.length==4){
        databus.obstaclelist.shift()
        databus.obstaclelist.shift()
      }
      //当障碍物已经移动到屏幕中间左侧，并且当前页面只有两个障碍物时，需要额外再增加两个
      if(databus.obstaclelist[0].x <= (databus.canvas.width - databus.obstaclelist[0].img.width)/2 && databus.obstaclelist.length==2){
        this.createObstacle()
      }
      let timer = requestAnimationFrame(() =>{
        this.starGame()
      })
      databus.timer = timer
    }else{
      //游戏结束
      databus.reset()
      this.button.render()   //渲染开始按钮
      cancelAnimationFrame(databus.timer)
      wx.triggerGC()
    }
    
  }
  
  //创建障碍物
  createObstacle(){
    //控制上下高度的上限
    let minTop = databus.canvas.height/8
    let maxTop = databus.canvas.height/2
    //计算随机数
    let top = minTop + Math.random() * (maxTop-minTop)
    databus.obstaclelist.push(new Obstacle(top,"images/pi_up.png","up"))
    databus.obstaclelist.push(new Obstacle(top,"images/pi_down.png","down"))
  }
  // 触屏方法封装
  registerEvent(){
    wx.onTouchStart(()=>{
      console.log("你点击了")
      if(databus.gameover){
        console.log("游戏开始了")
        databus.gameover = false
        this.init()
      }else{
        //让鱼跳
        this.fish.y = this.fish.newy
        //让时间清0
        this.fish.time = 0
      }
    })
  }
}