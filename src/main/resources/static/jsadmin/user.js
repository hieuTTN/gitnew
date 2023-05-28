var token = localStorage.getItem("token");
async function loadAllUser() {
    var url = 'http://localhost:8080/api/admin/getUserNotAdmin';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var listUser = await response.json();
    console.log(listUser)
    var main = '';
    var activebtn = 'btn btn-primary'
    var activename = 'khóa'
    var activeicon = 'fa fa-lock'
    var type = 1;
    for (i = 0; i < listUser.length; i++) {
        if(listUser[i].actived == 0){
            activebtn = 'btn btn-danger'
            activename = 'mở khóa'
            activeicon = 'fa fa-unlock'
            type = 0;
        }
        else{
            activebtn = 'btn btn-primary'
            activename = 'khóa'
            activeicon = 'fa fa-lock'
            type = 1;
        }

        main += '<tr>'+
                    '<td>#'+listUser[i].id+'</td>'+
                    '<td>'+listUser[i].username+'</td>'+
                    '<td>'+listUser[i].createdDate+'</td>'+
                    '<td><button onclick="lockOrUnlock('+listUser[i].id+','+type+')" class="'+activebtn+'"><i class="'+activeicon+'"></i> '+activename+'</button></td>'+
                '</tr>'
    }
    document.getElementById("listuser").innerHTML = main
    $('#example').DataTable();
}


async function loadAllUserByDate() {
    var d1 = document.getElementById("ngaybatdau").value
    var d2 = document.getElementById("ngayketthuc").value

    if(d1> d2){
        alert("ngày bắt đầu phải nhỏ hơn ngày kết thúc!")
        return;
    }
    var url = 'http://localhost:8080/api/admin/getUserNotAdminByDate?d1='+d1+'&d2='+d2;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var listUser = await response.json();
    console.log(listUser)
    var main = '';
    var activebtn = 'btn btn-primary'
    var activename = 'khóa'
    var activeicon = 'fa fa-lock'
    var type = 1;
    for (i = 0; i < listUser.length; i++) {
        if(listUser[i].actived == 0){
            activebtn = 'btn btn-danger'
            activename = 'mở khóa'
            activeicon = 'fa fa-unlock'
            type = 0;
        }
        else{
            activebtn = 'btn btn-primary'
            activename = 'khóa'
            activeicon = 'fa fa-lock'
            type = 1;
        }

        main += '<tr>'+
                '<td>#'+listUser[i].id+'</td>'+
                '<td>'+listUser[i].username+'</td>'+
                '<td>'+listUser[i].createdDate+'</td>'+
                '<td><button onclick="lockOrUnlock('+listUser[i].id+','+type+')" class="'+activebtn+'"><i class="'+activeicon+'"></i> '+activename+'</button></td>'+
            '</tr>'
    }
    document.getElementById("listuser").innerHTML = main
    $('#example').DataTable();
}

async function loadAllAdmin() {
    var url = 'http://localhost:8080/api/admin/getUserNotUser';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var listUser = await response.json();
    console.log(listUser)
    var main = '';
    for (i = 0; i < listUser.length; i++) {
        main += '<tr>'+
        '<td>#'+listUser[i].id+'</td>'+
        '<td>'+listUser[i].username+'</td>'+
        '<td>'+listUser[i].createdDate+'</td>'+
        '<td></td>'+
    '</tr>'
    }
    document.getElementById("listuser").innerHTML = main
    $('#example').DataTable();
}

async function loadtaikhoanqt(){
    var check = document.getElementById("tkqt").checked;
    if(check == true){
        document.getElementById("ngaybatdau").disabled = true
        document.getElementById("ngayketthuc").disabled = true
        document.getElementById("btn-fi").disabled = true
        loadAllAdmin();
    }
    if(check == false){
        document.getElementById("ngaybatdau").disabled = false
        document.getElementById("ngayketthuc").disabled = false
        document.getElementById("btn-fi").disabled = false
        loadAllUser();
    }
}

async function lockOrUnlock(id, type) {
    var url = 'http://localhost:8080/api/admin/activeUser?id=' + id;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        var mess = '';
        if(type == 1){
            mess = 'Khóa thành công'
        }
        else{
            mess = 'Mở khóa thành công'
        }
        swal({
            title: "Thông báo", 
            text: mess, 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "hành động thất bại", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
}