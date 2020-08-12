<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
        <img src= "resources/image/LogoTV.png"
             width="40" height="40" class="d-inline-block align-top" alt="">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active" data-value="trang-chu">
                <a class="nav-link" href="trang-chu.tiles">Trang Chủ <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item" data-value="quan-ly-san-pham">
                <a class="nav-link" href="san-pham.tiles">Sản Phẩm</a>
            </li>
            <li class="nav-item" data-value="quan-ly-danh-muc">
                <a class="nav-link" href="danh-muc.tiles">Danh mục sản phẩm</a>
            </li>
        </ul>
    </div>
</nav>