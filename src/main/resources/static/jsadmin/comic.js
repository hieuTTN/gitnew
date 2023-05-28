var token = localStorage.getItem("token");
async function loadAllCategory() {
    var url = 'http://localhost:8080/api/public/allcategory';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listcategory = await response.json();
    var main = '<option value="-1" data-tokens="-1">tất cả truyện</option>';
    for (i = 0; i < listcategory.length; i++) {
        main += '<option value="'+listcategory[i].id+'" data-tokens="'+listcategory[i].id+'">'+listcategory[i].name+'</option>'
    }
    document.getElementById("cateselect").innerHTML = main
    document.getElementById("cateselect").classList.add("selectpicker");
    $('.selectpicker').selectpicker();
    loadAllComic();
}

async function loadAllCategoryAdd() {
    var url = 'http://localhost:8080/api/public/allcategory';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listcategory = await response.json();
    var main = '';
    for (i = 0; i < listcategory.length; i++) {
        main += '<option value="'+listcategory[i].id+'" data-tokens="'+listcategory[i].id+'">'+listcategory[i].name+'</option>'
    }
    document.getElementById("cateselect").innerHTML = main
    document.getElementById("cateselect").classList.add("selectpicker");
    $('.selectpicker').selectpicker();
    loadAComic();
}

async function loadAllComic() {
    var idCategory = document.getElementById("cateselect").value;
    var url = 'http://localhost:8080/api/public/allcomic?id='+idCategory;
    if(idCategory == -1){
        var url = 'http://localhost:8080/api/public/allcomic'
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
            <td><img src="${list[i].banner}" style="width: 100px;"></td>
            <td>${list[i].name}</td>
            <td>${list[i].category.name}</td>
            <td>${list[i].createdDate}</td>
            <td>${list[i].authors}</td>
            <td>${list[i].resource}</td>
            <td><button onclick="deleteComic(${list[i].id})" class="btn btn-danger"><i class="fa fa-trash"></i> Xóa</button></td>
            <td><a href="addcomic?id=${list[i].id}" class="btn btn-success"><i class="fa fa-edit"></i> Sửa</a></td>
        </tr>`
    }
    document.getElementById("listcomic").innerHTML = main
    $('#example').DataTable();
}

async function loadAComic() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/comicById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var comic = await response.json();
        document.getElementById("tentuyen").value = comic.name
        document.getElementById("nguon").value = comic.resource
        document.getElementById("tacgia").value = comic.authors
        tinyMCE.get('note').setContent(comic.note)
        document.getElementById("imgblog").src = comic.banner
        linkbanner = comic.banner
        document.getElementById("cateselect").value = comic.category.id
    }
}

var linkbanner = ''
async function saveComic() {
    document.getElementById("loading").style.display='block'
    var id = window.location.search.split('=')[1];
    var url = 'http://localhost:8080/api/admin/addComic';

    const filePath = document.getElementById('imagebanner')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/public/upload';
    const res = await fetch(urlUpload, { 
        method: 'POST', 
        headers: new Headers({
        }),
        body: formData
    });
    if(res.status < 300){
        linkbanner = await res.text();
    }

    var check = document.getElementById("dichchonloc").checked
    var chonloc = 0;
    if(check){
        chonloc = 1;
    }
    var tentuyen = document.getElementById("tentuyen").value
    var nguon = document.getElementById("nguon").value
    var tacgia = document.getElementById("tacgia").value
    // var note = document.getElementById("note").value
    var cateselect = document.getElementById("cateselect").value
    var note = tinyMCE.get('note').getContent()

    var comic = {
        "id": id,
        "name": tentuyen,
        "banner":linkbanner,
        "resource":nguon,
        "authors":tacgia,
        "note":note,
        "chonLoc":chonloc,
        "category":{
            "id":cateselect
        }
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(comic)
    });
    if(response.status < 300){
        swal({
            title: "Thông báo", 
            text: "thêm/sửa truyện thành công!", 
            type: "success"
          },
        function(){ 
            window.location.replace("comic")
        });
    }
    else{
        swal({
            title: "Thông báo", 
            text: "thêm/sửa truyện thất bại!", 
            type: "error"
          },
        function(){ 
            document.getElementById("loading").style.display='none'
        });
    }
    document.getElementById("loading").style.display='none'
}
async function deleteComic(id) {
    var url = 'http://localhost:8080/api/admin/deleteComic?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "xóa truyện thành công!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "không thể xóa truyện", 
            type: "error"
          },
        function(){ 
        });
    }
}