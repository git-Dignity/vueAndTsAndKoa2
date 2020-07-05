class SingerSongList {
    musicInfo:Object;
    y:string;
   constructor(musicInfo:Object, y:string) {
     this.musicInfo = musicInfo;
     this.y = y;
   }
   toString() {
    //  return '输入项:(' + this.x + ', ' + this.y + ')';
   }
   doStuff() {
     console.log('stuff');
   }
 }
   
 export default SingerSongList