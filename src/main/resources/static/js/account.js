async function login() {
    var url = 'http://localhost:8080/api/authenticate'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "password": password
    }
    console.log(user)
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var token = await response.text(); 

    
    if(response.status > 300){
        swal({
            title: "Thông báo", 
            text: "Tài khoản hoặc mật khẩu không chính xác!", 
            type: "warning"
          },
        function(){  });
    }
    if(response.status < 300){
        window.localStorage.setItem('token', token);
        var urlAccount = 'http://localhost:8080/api/userlogged';
        const res = await fetch(urlAccount, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
            })
        });

        var account = await res.json();
        window.localStorage.setItem('username', account.username);
        var check = 0;
        for(i=0; i<account.authorities.length; i++){
            if(account.authorities[i].name === 'ROLE_ADMIN'){
                check = 1;
            }
        }
        if(check === 0){
            window.location.replace("index")
        }
        if(check === 1){
            window.location.replace("admin/comic")
        }
    }
}

async function regis() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var repassword = document.getElementById("repassword").value
    if(username == ""){
        alert("tên đăng nhập không được để trống")
        return;
    }
    if(password == ""){
        alert("mật khẩu không được để trống")
        return;
    }
    if(password != repassword){
        alert("mật khẩu không trùng khớp")
        return;
    }
    var url = 'http://localhost:8080/api/register'
    var user = {
        "username": username,
        "password": password,
        "authorities": [
            "ROLE_USER"
        ]
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.text();
    console.log(result)
    if (result === '1') {
        alert("tên đăng nhập đã tồn tại")
    }
    else if (result === '0') {
        swal({
            title: "Notification", 
            text: "Đăng ký tài khoản thành công!", 
            type: "success"
          },
        function(){ 
            window.location.replace("login")
        });
    }
}