const $form = $("#signUpForm");
$form.on("submit", (e) => {
    e.preventDefault(); 
    const userName = $form.find("input[name = username]").val();
    const password = $form.find("input[name = password]").val();
    console.log(userName, password);
    $.ajax({
        method: "post",
        url: "/signUp",
        contentType: "text/json;charset=UTF-8",
        data: JSON.stringify({userName, password})
    }).then(() => { 
        alert("注册成功")
        location.href = "./signIn.html"
    }, () => { 
            
    })
})