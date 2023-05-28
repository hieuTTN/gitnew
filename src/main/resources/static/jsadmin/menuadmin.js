function loadMenuAdmin(){
    var main = '<nav class="nav nav-dark ">'+
    '<div> '+
        '<div class="nav_list"> '+
            '<a href="user" class="nav_link"> '+
                '<i class="bx bx-user nav_icon"></i> <span class="nav_name">Người dùng</span> '+
            '</a> '+
            '<a href="comic" class="nav_link"> '+
                '<i class="fas fa-user-graduate"></i> <span class="nav_name">Truyện</span> '+
            '</a> '+
            '<a href="chapter" class="nav_link"> '+
                '<i class="fas fa-user-graduate"></i> <span class="nav_name">Chương</span> '+
            '</a> '+
            '<a href="category" class="nav_link"> '+
                '<i class="fa fa-list-alt"></i> <span class="nav_name">Danh mục</span> '+
            '</a> '+
        '</div>'+
    '</div> '+
    '<a onclick="logout()" href="#" class="nav_link"> '+
        '<i class="bx bx-log-out nav_icon"></i> <span class="nav_name">Đăng xuất</span> '+
    '</a>'+
'</nav>'

document.getElementById("nav-bar").innerHTML = main;
    checkroleAdmin();
}

async function logout(){
    localStorage.removeItem("token");
    window.location.replace("../login")
  }

async function checkroleAdmin(){
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/admin/checkroleAdmin';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        window.location.replace('../login')
    }
}

async function checkroleUser(){
    var url = 'http://localhost:8080/api/user/checkroleUser';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        alert("hãy đăng nhập để sử dụng chức năng này")
        window.location.replace('login')
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
   
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
    nav.classList.toggle('show')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
     // Your code to run since DOM is loaded and ready
     
    });

