var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    //设置路由登录路由
    if (path === "/signIn" && method === "POST") {
        response.setHeader("content-Type", "text/html; charset = UTF-8");
        const userArray = JSON.parse(fs.readFileSync("./db/users.json"));
        const array = [];
        //监听数据加载对象，把加载的对象放到数组里面
        request.on("data", (chunk) => {
            array.push(chunk);
        })
        //加载完毕后存对象
        request.on("end", () => {
            //获取登录时输入的用户名和密码
            const obj = JSON.parse(Buffer.concat(array).toString());
            const userFlag = userArray.find((user) => {
                return user.userName === obj.userName && user.password === obj.password
            })
            if (userFlag === undefined) {
                response.statusCode = 400;
                response.end("name password 不匹配")
            } else {
                response.statusCode = 200;
                const random = Math.random();
                const session = JSON.parse(fs.readFileSync("./session.json").toString());
                session[random] = { user_id: userFlag.id }
                fs.writeFileSync("./session.json", JSON.stringify(session))
                response.setHeader("Set-Cookie", `session_id=${random}; HttpOnly`)
                response.end()  
            }
            response.end()
        })
    } else if (path === "/home.html") {
        //获取网页的cookie
        const cookie = request.headers["cookie"];
        console.log(cookie)
        let sessionId;
        try {
            sessionId = cookie.split(";").filter(s => s.indexOf("session_id") >= 0)[0].split("=")[1];
        } catch (error) { }
        //判断网页中是否有登录成功的cookie
        const session = JSON.parse(fs.readFileSync("./session.json").toString());
        if (sessionId && session[sessionId]) {
           
            const userId = session[sessionId].user_id;
            const userArray = JSON.parse(fs.readFileSync("./db/users.json"));
            const user = userArray.find(user => user.id === userId)
            const homeString = fs.readFileSync("./public/home.html").toString();
            let string;
            if (user) {
                string = homeString.replace("{{logoStatus}}", `您已登录,欢迎${user.userName}`);
            } else {
                string = homeString.replace("{{logoStatus}}", `您未登录`);
                   
            }
            response.write(string)
            response.end();
        } else {
            const homeString = fs.readFileSync("./public/home.html").toString();
            const string = homeString.replace("{{logoStatus}}", "您未登录")
            response.end(string);    
        }
        
     }else if (path === "/signUp" && method === "POST") {//设置注册路由
        response.setHeader("content-Type", "text/html; charset = UTF-8");
        const userArray = JSON.parse(fs.readFileSync("./db/users.json"));
        const array = [];
        //监听数据加载对象，把加载的对象放到数组里面
        request.on("data",(chunk)=> { 
            array.push(chunk);
        })
        //加载完毕后存对象
        request.on("end", () => { 
            const obj = JSON.parse(Buffer.concat(array).toString());
            const lastUser = userArray[userArray.length - 1];
            const newUser = {
                id: lastUser ? lastUser.id + 1 : 1,
                userName: obj.userName,
                password: obj.password
            }
            userArray.push(newUser)
            fs.writeFileSync("./db/users.json",JSON.stringify(userArray))
            response.end()
        })
    } else {
        const x = path === "/" ? "/index.html" : path;
        const suffix = path.substring(path.lastIndexOf("."));
        const fileTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            ".js": "text/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg"
        }
        let content;
        response.statusCode = 200
        response.setHeader('Content-Type', `${fileTypes[suffix] || "text/html"};charset=utf-8`)
        try {
            response.write(fs.readFileSync(`./public${x}`))
        } catch (error) {
            response.statusCode = 404;
            response.write(`文件不存在`)
        }
        response.end()
    }
   

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)