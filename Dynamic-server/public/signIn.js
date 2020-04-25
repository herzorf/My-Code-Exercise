const $form = $("#signInForm");
$form.on("submit", (e) => {
    e.preventDefault();
    const userName = $form.find("input[name = username]").val();
    const password = $form.find("input[name = password]").val();
    $.ajax({
        method: "POST",
        url: "/signIn",
        contentType: "text/json;charset=UTF-8",
        data: JSON.stringify({ userName, password })
    }).then(() => {
        alert("登录成功")
        location.href = "./home.html"
    }, () => {
        alert("用户名或密码错误")
    })
})