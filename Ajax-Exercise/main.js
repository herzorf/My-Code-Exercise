//console.log("这里是main.js文件");
getCss.onclick = () => {
  const ajax = new XMLHttpRequest();
  ajax.open("get", "/style.css");
  ajax.onload = () => {
    const style = document.createElement("style");
    style.innerHTML = ajax.response;
    document.head.appendChild(style);
  };
  ajax.onerror = () => {
    console.log("失败了");
  };
  ajax.send();
};

getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "js.js");
  request.onload = () => {
    const script = document.createElement("script");
    script.innerHTML = request.response;
    document.body.appendChild(script);
  };
  request.send();
};

getHtml.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("get", "./html.html");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const div = document.createElement("div");
        div.innerHTML = request.response;
        document.body.appendChild(div);
      }
    }
  };

  request.send();
};

getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "./xml.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        console.log(request.response); //string
        console.log(request.responseXML); //null
        const dom = request.responseXML;
        console.log(new XMLHttpRequest().responseXML); //null
        console.log(dom); //null
        const text = dom.getElementsByTagName("warning")[0].textContent; //error
        console.log(text);
      }
    }
  };
  request.send();
};
getJson.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "./json.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const obj = JSON.parse(request.response);
        myName.innerHTML = "hello " + obj.name;
      }
    }
  };
  request.send();
};
let n = 2;
getPage.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", `/page${n++}`);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        const array = JSON.parse(request.response);
        array.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.id;
          xxx.appendChild(li);
        });
      }
    }
  };
  request.send();
};
