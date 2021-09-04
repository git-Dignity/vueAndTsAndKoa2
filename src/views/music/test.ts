class Point {
     x:string;
     y:string;
    constructor(x:string, y:string) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return '输入项:(' + this.x + ', ' + this.y + ')';
    }
    doStuff() {
      console.log('stuff');
    }
  }
   
  export default Point