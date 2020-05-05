//音乐
let instance;
export class Music{
  constructor(){
    if(instance){
      return instance
    }
    instance = this
    this.bgmAudio = wx.createInnerAudioContext()
    this.bgmAudio.loop = true
    this.bgmAudio.src = "audios/bgm.mp3"
    this.playBgm()
  }
  //定义方法
  playBgm(){
    this.bgmAudio.play()   //播放音乐
    console.log("success Musci")
  }
}