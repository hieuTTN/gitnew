var token = localStorage.getItem("token");
async function loadMenu(){
  var authen = '<li class="nav-item"><a class="nav-link btn btn-danger" href="login">Đăng nhập</a></li>'
  if(token != null){
    authen = `<li class="nav-item dropdown">
                <a class="btn btn-danger nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Tài khoản
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="favorite">truyện yêu thích</a></li>
                  <li><a class="dropdown-item" onclick="logout()" style="cursor: pointer;">Đăng xuất</a></li>
                </ul>
              </li>`
  }
    var menu = 
    `<div class="container"><div class="container menubottom">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav navbar-nav-hover navbar-nav-effect">
            <li class="nav-item"><a class="nav-link" aria-current="page" href="index"><img class="logo" src="image/logo.webp"> <span id="activemenu">Đọc truyên online</span></a></li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fa fa-tags"> Thể loại</i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div class="row" id="listdmmenu">
                  <div class="col-md-6">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                  </div>
                </div>
              </ul>
            </li>
            <li class="nav-item" style="width: 50%;">
              <form action="listcomic"><input name="search" class="inputsearch" placeholder="nhập tên truyện hoặc tên tác giá">
              <button class="btnsearch"><i class="fa fa-search"></i></button><form>
            </li>
            ${authen}
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>`
document.getElementById("navigation").innerHTML = menu
loadCategoryMenu();
loadfooter();
}

async function loadCategoryMenu() {
  var url = 'http://localhost:8080/api/public/allcategory';
  const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
      })
  });
  var list = await response.json();
  var main = '';
  for (i = 0; i < list.length; i++) {
      main +=  `<div class="col-md-6">
                  <li><a class="dropdown-item" href="listcomic?id=${list[i].id}">${list[i].name}</a></li>
                </div>`
  }
  document.getElementById("listdmmenu").innerHTML = main
}


function loadfooter(){
  var fo = `<div class="container">
  <div class="container">
  <div class="container">
    <div class="footer-links container" id="footer-links"> 
      <h4>Top truyện nổi bật của tháng</h4> 
      <a href="https://dtruyen.com/muc-than-ky/" title="mục thần ký">mục thần ký</a>
      <a href="https://dtruyen.com/anh-co-thich-nuoc-my-khong-/" title="anh có thích nước mỹ không">
        anh có thích nước mỹ không</a>
        <a href="https://dtruyen.com/thien-kim-dai-chien/" title="thiên kim đại chiến">thiên kim đại chiến</a>
        <a href="https://dtruyen.com/thien-tai-nhi-tu-va-mau-than-phuc-hac/" title="truyện thiên tài nhi tử và mẫu thân phúc hắc">truyện thiên tài nhi tử và mẫu thân phúc hắc</a>
        <a href="https://dtruyen.com/dong-phong-hoa-chuc-sat-vach/" title="dong phong hoa chuc sat vach">dong phong hoa chuc sat vach</a><a href="https://dtruyen.com/tag/truyen-nguoc/" title="truyện ngược">truyện ngược</a><a href="https://dtruyen.com/trong-phim-ngoai-doi/" title="trong phim ngoài đời">trong phim ngoài đời</a><a href="https://dtruyen.com/me-17-tuoi-con-trai-thien-tai-cha-phuc-hac/" title="mẹ 17 tuổi con trai thiên tài cha phúc hắc">mẹ 17 tuổi con trai thiên tài cha phúc hắc</a><a href="https://dtruyen.com/co-vo-hop-dong-bo-tron-cua-tong-giam-doc/" title="Cô Vợ Hợp Đồng Bỏ Trốn Của Tổng Giám Đốc">Cô Vợ Hợp Đồng Bỏ Trốn Của Tổng Giám Đốc</a><a href="https://dtruyen.com/huyen-cua-on-noan/" title="huyền của ôn noãn">huyền của ôn noãn</a></div> <div class="container"> <div class="main-col"><span class="textoke"> Website</span> <a title="đọc truyện online" href="https://dtruyen.com/">đọc truyện</a><span class="textoke"> online chất lượng hàng đầu việt nam, với nhiều</span> <a title="Truyện Tiên Hiệp" href="https://dtruyen.com/tien-hiep/">truyện tiên hiệp</a>, <a title="Truyện Kiếm Hiệp" href="https://dtruyen.com/kiem-hiep/">truyện kiếm hiệp</a>, <a title="truyen ngon tinh" href="https://dtruyen.com/ngon-tinh/">truyện ngôn tình</a>, <a title="truyen teen" href="https://dtruyen.com/truyen-teen/">truyện teen</a>, <a title="Truyện Đô Thị" href="https://dtruyen.com/do-thi/">truyện đô thị</a> <p class="textoke">được tác giả và dịch giả chọn lọc và đăng tải. Truy cập <span class="textoke"> Website</span> nghĩa là bạn đã đồng ý với các quy định và điều khoản của chúng tôi. Vui lòng đọc kỹ các thông tin liên quan ở phía dưới.</p> <p><a rel="nofollow" href="https://dtruyen.com/privacy-policy/" title="Privacy Policy">Chính sách bảo mật</a> &nbsp; - &nbsp;<a rel="nofollow" href="https://dtruyen.com/terms/" title="Terms">Điều khoản sử dụng</a> &nbsp; - &nbsp;<a rel="nofollow" href="https://dtruyen.com/content-rules/" title="Content Rules">Quy định về nội dung</a> &nbsp; - &nbsp;<a rel="nofollow" href="https://dtruyen.com/right-holders/" title="DMCA Guidelines">Vấn đề bản quyền</a> &nbsp; - &nbsp;<a rel="nofollow" href="https://dtruyen.com/confidental/" title="Privacy agreement">Thỏa thuận quyền riêng tư</a> </p> <p> <span class="textoke"> Website</span> <span class="textoke"> hoạt động dưới</span> <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Giấy phép truy cập mở Creative Commons Attribution 4.0 International License.</a>. </p> <script src="https://img.dtruyen.com/public/frontend/desk/js/DMCABadgeHelper.min.js"></script> <a href="https://www.dmca.com/Protection/Status.aspx?ID=8474e935-28de-489e-a6dc-dc6e1d98563c&amp;refurl=https://dtruyen.com/" title="DMCA.com Protection Program" class="dmca-badge" rel="nofollow" target="_blank"> <img src="https://dtruyen.com/dmca.png" data-layzr="https://dtruyen.com/dmca.png" alt="DMCA.com Protection Status" width="75" height="36"></a> <a rel="license" href="http://creativecommons.org/licenses/by/4.0/" title="Creative Commons License"><img height="15" width="80" alt="Creative Commons License" style="border-width: 0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" data-layzr="https://i.creativecommons.org/l/by/4.0/80x15.png"></a>
         </div> <div class="right-sidebar"> <p>Copyright <i class="fa fa-copyright"></i> 2021 
      <a title="https://dtruyen.com" href="https://dtruyen.com/">DTruyen.Com</a></p> </div> 
    </div>
  </div>
  </div>
  </div>`
  try {
    document.getElementById("main-footer").innerHTML = fo
  } catch (error) {
    
  }
}

async function logout(){
  localStorage.removeItem("token");
  window.location.replace("login")
}