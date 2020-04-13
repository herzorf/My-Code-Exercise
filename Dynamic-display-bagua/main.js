let html = document.querySelector("#hi");
let style = document.querySelector("#style");
let str = `/*你好,我是一名前端新人，请多指教
*接下来我要开始画一个八卦图
*我要开始写代码了
*首先我需要准备一个div
*然后我要添加css样式了*/
 #八卦{
     border:1px solid red;
     width:400px;
     height:400px
 }
 /*然后我把它放到右边,变成一个圆再加上阴影*/
#八卦{
     position:fixed;
     right:20px;
     top:20px;
     box-shadow:0 0 3px rgba(0,0,0,0.5);
     border:none;
     border-radius:50%;
 }
 /*然后加上颜色*/
#八卦{
     background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%);
 }
 /*然后加上两条鱼的头*/
#八卦::before{
    position:absolute;
    height:200px;
    width:200px;
    display:block;
    content:'';
    border:1px solid red;
    left:25%;
    top:0;
    background-color:black;
    border-radius:50%;
    border:none;
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 100%);
 }
#八卦::after{
    position:absolute;
    height:200px;
    width:200px;
    display:block;
    content:'';
    border:1px solid red;
    left:25%;
    bottom:0;
    background:white;
    border-radius:50%;
    border:none;    
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%);
 }
`;
let str2 = "";
let n = 0;
let step = () => {
  setTimeout(() => {
    if (n < str.length) {
      if (str[n] === "\n") {
        str2 += "<br>";
      } else if (str[n] === " ") {
        str2 += "&nbsp";
      }
      {
        str2 += str[n];
      }
      html.innerHTML = str2;
      style.innerHTML = str.substring(0, n);
      window.scrollTo(0, 99999);
      n++;
      step();
    }
  }, 0);
};
step();
