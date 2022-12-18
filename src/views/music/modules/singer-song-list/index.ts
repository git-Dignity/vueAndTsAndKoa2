class SingerSongList {
    musicInfo: Record<string, any>;
    y: string;
   constructor(musicInfo: Record<string, any>, y: string) {
     this.musicInfo = musicInfo;
     this.y = y;
   }

   toString() {
    //  return '输入项:(' + this.x + ', ' + this.y + ')';
   }

   doStuff() {
     console.log("stuff");
   }
 }

 export default SingerSongList;
