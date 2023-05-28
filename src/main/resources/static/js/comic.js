var token = localStorage.getItem("token");

var size = 2;
var sizenew = 15 ;
var sizechapter = 15;

async function loadAllCategory() {
    var url = 'http://localhost:8080/api/public/allcategory';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var list = await response.json();
    var main = '';
    var mains = ''
    for (i = 0; i < list.length; i++) {
        if(i<4){
            main +=  `<div class="col-sm-6 singeldanhmuc activedm"><i class="fa fa-diamond"></i> <a href="listcomic?id=${list[i].id}">${list[i].name}</a></div>`
            mains +=  `<div class="col-sm-2"><a href="listcomic?id=${list[i].id}" class="btn btn-secondary theloaid form-control">${list[i].name}</a></div>`
        }
        else{
            main += `<div class="col-sm-6 singeldanhmuc"><i class="fa fa-tags"></i> <a href="listcomic?id=${list[i].id}">${list[i].name}</a></div>`
        }
    }
    document.getElementById("listdmleft").innerHTML = main
    try {
        document.getElementById("dstheloaimoi").innerHTML = mains
    } catch (error) {
        
    }
}

async function loadComicDich(page) {
    var url = 'http://localhost:8080/api/public/truyenchonloc?size='+size +'&page='+page;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listpro = await response.json();
    console.log(listpro)
    var list = listpro.content;
    var totalPage = listpro.totalPages 
    var totalElements = listpro.totalElements
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-sm-3">
                    <img src="${list[i].banner}" class="truyenimg">
                    <div class="tieudetruyen">
                    <a href="detail?id=${list[i].id}" class="tentruyen">${list[i].name}</a>
                    <p class="sochuong">Số chương: ${list[i].numchap}</p>
                    </div>
                </div>`
    }
    document.getElementById("listcomicindex").innerHTML = main

    var mainpage = ''
    for(i=1; i<= totalPage; i++){
        mainpage += '<li onclick="loadComicDich('+(Number(i)-1)+')" class="page-item"><a class="page-link" href="#listsp">'+i+'</a></li>'
    }
    document.getElementById("listpage").innerHTML = mainpage
    document.getElementById("soluongsp").innerHTML = list.length
    document.getElementById("tongsl").innerHTML = totalElements
}

async function loadCungDanhMuc() {
    var id = window.location.search.split('=')[1];
    var url = 'http://localhost:8080/api/public/comiclienquan?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-sm-6">
                    <img src="${list[i].banner}" class="truyenimg">
                    <div class="tieudetruyen">
                    <a href="detail?id=${list[i].id}" class="tentruyen">${list[i].name}</a>
                    <p class="sochuong">Số chương: ${list[i].numchap}</p>
                    </div>
                </div>`
    }
    document.getElementById("cungdanhmuc").innerHTML = main
}


async function loadComicnew(page) {
    var url = 'http://localhost:8080/api/public/allcomicpage?size='+sizenew +'&page='+page;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listpro = await response.json();
    console.log(listpro)
    var list = listpro.content;
    var totalPage = listpro.totalPages 
    var totalElements = listpro.totalElements
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr class="trchuyen">
                    <td><a href="detail?id=${list[i].id}" class="aclass">${list[i].name}</a></td>
                    <td>${list[i].numchap} chương</td>
                    <td>${list[i].createdDate}</td>
                </tr>`
    }
    document.getElementById("tablenew").innerHTML = main

    var mainpage = ''
    for(i=1; i<= totalPage; i++){
        mainpage += '<li onclick="loadComicDich('+(Number(i)-1)+')" class="page-item"><a class="page-link" href="#listsp">'+i+'</a></li>'
    }
    document.getElementById("listpagenew").innerHTML = mainpage
    document.getElementById("soluongsp").innerHTML = list.length
    document.getElementById("tongsl").innerHTML = totalElements
}

async function loadChuong(page) {
    var id = window.location.search.split('=')[1];
    var url = 'http://localhost:8080/api/public/chapterByComicPage?id='+id+"&size="+sizechapter+"&page="+page;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listpro = await response.json();
    console.log(listpro)
    var list = listpro.content;
    var totalPage = listpro.totalPages 
    var totalElements = listpro.totalElements
    var main = '';
    for (i = 0; i < list.length; i++) {

        main += `<tr class="trchuyen">
                    <td><a href="chapter?id=${list[i].id}" class="aclass">${list[i].name}</a></td>
                </tr>`
    }
    document.getElementById("tablechuong").innerHTML = main

    var mainpage = ''
    for(i=1; i<= totalPage; i++){
        mainpage += '<li onclick="loadChuong('+(Number(i)-1)+')" class="page-item"><a class="page-link" href="#listsp">'+i+'</a></li>'
    }
    document.getElementById("listpagechuong").innerHTML = mainpage
    document.getElementById("soluongsp").innerHTML = list.length
    document.getElementById("tongsl").innerHTML = totalElements
}


async function loadAComic() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/comicByIdView?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var comic = await response.json();
        document.getElementById("namedetail").innerHTML = comic.name
        document.getElementById("nguon").innerHTML = comic.resource
        document.getElementById("tacgia").innerHTML = comic.authors
        document.getElementById("view").innerHTML = comic.numView
        document.getElementById("ngaytao").innerHTML = comic.createdDate
        document.getElementById("mota").innerHTML = comic.note
        document.getElementById("anhdetil").src = comic.banner
    }
}


async function loadAChap(idchap) {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/chapterById?id='+id;
        if(idchap != -1){
            url = 'http://localhost:8080/api/public/chapterById?id='+idchap;
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var chap = await response.json();
        document.getElementById("tenchuyen").innerHTML = chap.comic.name
        document.getElementById("tenchuong").innerHTML = chap.name
        document.getElementById("tacgiachap").innerHTML = chap.comic.authors
        document.getElementById("ngayup").innerHTML = chap.comic.createdDate
        document.getElementById("contentchap").innerHTML = chap.content
        loadAllChap(chap.comic.id);
    }
}

async function loadAllChap(idcomic) {
    var url = 'http://localhost:8080/api/public/chapterByComic?id='+idcomic;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var list = await response.json();
    var main = '<option value="" disabled selected style="display:none;">Chọn chương</option>'
    for(i=0; i<list.length; i++){
        main += '<option value="'+list[i].id+'">'+list[i].name+'</option>'
    }
    document.getElementById("listchuong").innerHTML = main
}

function loadChapBySelect(){
    var idchap = document.getElementById("listchuong").value
    window.location.replace("chapter?id="+idchap)
}


async function preOrNext(type) {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/preOrNextChap?id='+id+"&type="+type;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        try {
            var chap = await response.json();
        } catch (error) {
            alert("đã hết chapter")
            return;
        }
        console.log(chap)
        window.location.replace("chapter?id="+chap.id)
    }
}


async function myfavorite() {
    var url = 'http://localhost:8080/api/user/myfavorite';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = ''
    for(i=0; i<list.length; i++){
        main += ` <tr class="trchuyen">
                    <td><a href="detail?id=${list[i].comic.id}" class="aclass">${list[i].comic.name}</a></td>
                    <td>${list[i].comic.numchap}</td>
                    <td>${list[i].comic.createdDate}</td>
                    <td><i onclick="xoaYt(${list[i].id})" class="fa fa-trash aclass" style="font-size:22px"></i></td>
                </tr>`
    }
    document.getElementById("myfavorite").innerHTML = main
}

async function xoaYt(id) {
    var url = 'http://localhost:8080/api/user/deletefavorite?id='+id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    myfavorite();
}



var mores = 1;
function loadmore(){
    if(mores % 2 != 0){
        document.getElementById("mota").style.height = 'auto'
        document.getElementById("btnmort").innerText = 'thu gọn'
    }
    else{
        document.getElementById("mota").style.height = '300px'
        document.getElementById("btnmort").innerText = 'xem thêm' 
    }
    mores = Number(mores) + Number(1)
}

async function themYeuThich(){
    if(token == null){
        swal({
            title: "Thông báo", 
            text: "Bạn chưa đăng nhập!", 
            type: "warning"
          },
        function(){ 
            window.location.replace("login")
        });
    }
    var id = window.location.search.split('=')[1];
    var url = 'http://localhost:8080/api/user/addFavorite';
    var favorite = {
        "comic": {
            "id":id
        }
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(favorite)
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "Đã thêm vào yêu thích!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "thất bại", 
            type: "error"
          },
        function(){ 
        });
    }
}


async function filterComic(page) {
    var id = window.location.search.split('id=')[1];
    var search = window.location.search.split('search=')[1];
    var url = 'http://localhost:8080/api/public/allcomicpage';
    if(id != null){
        url = 'http://localhost:8080/api/public/allcomicpage?id='+id+"&size="+sizenew+"&page="+page;
        document.getElementById("tukhoa").innerHTML = 'kết quả tìm kiếm'
    }
    if(search != null){
        url = 'http://localhost:8080/api/public/allcomicpage?search='+search+"&size="+sizenew+"&page="+page;
        document.getElementById("tukhoa").innerHTML = 'kết quả tìm kiếm với từ khóa: '+decodeURI( search )
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var listpro = await response.json();
    console.log(listpro)
    var list = listpro.content;
    if(list.length == 0){
        document.getElementById("listcomicsearch").innerHTML = 'Không tìm thấy kết quả nào!'
        return;
    }
    var totalPage = listpro.totalPages 
    var totalElements = listpro.totalElements
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr class="trchuyen">
                    <td><img src="${list[i].banner}" style="width: 70px;"></td>
                    <td>
                        <a href="detail?id=${list[i].id}" class="aclass">${list[i].name}</a><br>
                        <i class="fa fa-user"></i> ${list[i].authors}
                    </td>
                    <td>
                        <p>Số chương: ${list[i].numchap}</p>
                        <p><i class="fa fa-user"></i> ${list[i].createdDate} </p>
                    </td>
                </tr>`
    }
    document.getElementById("listcomicsearch").innerHTML = main

    var mainpage = ''
    for(i=1; i<= totalPage; i++){
        mainpage += '<li onclick="filterComic('+(Number(i)-1)+')" class="page-item"><a class="page-link" href="#listsp">'+i+'</a></li>'
    }
    document.getElementById("listpagesearch").innerHTML = mainpage
    document.getElementById("soluongsp").innerHTML = list.length
    document.getElementById("tongsl").innerHTML = totalElements
}
