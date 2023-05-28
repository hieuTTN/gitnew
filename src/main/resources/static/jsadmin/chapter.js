var token = localStorage.getItem("token");
async function loadAllCategorys() {
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
    loadAllTruyen();
}

async function loadAllTruyenSelect() {
    var url = 'http://localhost:8080/api/public/allcomic';
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
    document.getElementById("listtruyen").innerHTML = main
    document.getElementById("listtruyen").classList.add("selectpicker");
    $('.selectpicker').selectpicker();
}

async function loadAllTruyen() {
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
    if(idCategory == -1){
        main = `<option value="-1" data-tokens="-1">tất cả truyện</option>`
    }
    for (i = 0; i < list.length; i++) {
        main += '<option value="'+list[i].id+'" data-tokens="'+list[i].id+'">'+list[i].name+'</option>'
    }
    document.getElementById("listtruyen").innerHTML = main
    document.getElementById("listtruyen").classList.add("selectpicker");
    $('.selectpicker').selectpicker();
    $('#listtruyen').selectpicker('refresh');
    loadAllChapter();
}

async function loadAllChapter() {
    var idtruyen = document.getElementById("listtruyen").value;
    var url = 'http://localhost:8080/api/public/chapterByComic?id='+idtruyen;
    if(idtruyen == -1){
        var url = 'http://localhost:8080/api/public/chapterByComic'
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
            <td>${list[i].comic.name}</td>
            <td>${list[i].name}</td>
            <td>${list[i].createdDate}</td>
            <td><button onclick="deleteChap(${list[i].id})" class="btn btn-danger"><i class="fa fa-trash"></i> Xóa</button></td>
            <td><a href="addchapter?id=${list[i].id}" class="btn btn-success"><i class="fa fa-edit"></i> Sửa</a></td>
            <td><a onclick="viewContent(${list[i].id})" data-toggle="modal" data-target=".bd-example-modal-lg-noidung" class="poiter"><i class="fa fa-eye"></i> Xem nội dung</a></td>
        </tr>`
    }
    document.getElementById("listchapter").innerHTML = main
    $('#example').DataTable();
}


async function viewContent(id) {
    var url = 'http://localhost:8080/api/public/chapterById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var chapter = await response.json();
    document.getElementById("tenchuong").innerHTML = chapter.name
    document.getElementById("noidungchuong").innerHTML = chapter.content
    // document.getElementById("noidungchuong").innerHTML =  document.getElementById("noidungchuong").textContent
}


async function loadAChapter() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/chapterById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var chapter = await response.json();
        document.getElementById("tentuyen").value = chapter.name
        document.getElementById("listtruyen").value = chapter.comic.id
        tinyMCE.get('editor').setContent(chapter.content)
    }
}

async function saveChapter() {
    var id = window.location.search.split('=')[1];
    var url = 'http://localhost:8080/api/admin/addChapter';

    var name = document.getElementById("tentuyen").value
    var truyen = document.getElementById("listtruyen").value
    var content = tinyMCE.get('editor').getContent()

    var chapter = {
        "id": id,
        "name": name,
        "content":content,
        "comic":{
            "id":truyen
        }
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(chapter)
    });
    if(response.status < 300){
        swal({
            title: "Thông báo", 
            text: "thêm/sửa chương thành công!", 
            type: "success"
          },
        function(){ 
            window.location.replace("chapter")
        });
    }
    else{
        swal({
            title: "Thông báo", 
            text: "thêm/sửa chương thất bại!", 
            type: "error"
          },
        function(){ 
        });
    }
}

async function deleteChap(id) {
    var url = 'http://localhost:8080/api/admin/deleteChap?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "xóa chương thành công!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "không thể xóa chương", 
            type: "error"
          },
        function(){ 
        });
    }
}