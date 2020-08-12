<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="resources/js/san_pham.js"></script>
<!-- Content Wrapper. Contains page content -->
<!-- Modal -->
<div class="modal fade bd-example-modal-lg" id="detail-modal" tabindex="-1" role="dialog"
     aria-labelledby="detail-modal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Chi tiết sản phẩm</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body form-custom">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Tên</label>
                            <input type="text" class="form-control" id="input-ten" placeholder="Nhập tên sản phẩm">
                            <div class="invalid-feedback">
                                Error!
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Loại sản phẩm</label>
                            <select id="select-add-loai-san-pham" class="form-control select-loai-san-pham">
                                <option value="1">Điện thoại</option>
                                <option value="2">Laptop</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Giá</label>
                            <input type="number" class="form-control" id="input-gia" placeholder="Nhập giá sản phẩm">
                            <div class="invalid-feedback">
                                Error!
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Tồn kho</label>
                            <input type="number" class="form-control" id="input-ton-kho"
                                   placeholder="Nhập số hàng trong kho">
                            <div class="invalid-feedback">
                                Error!
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Hình ảnh</label>
                            <input type="text" class="form-control" id="input-hinh-anh"
                                   placeholder="Nhập url hình ảnh">
                            <div class="invalid-feedback">
                                Error!
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Ngày tạo</label>
                            <input disabled type="text" class="form-control" id="input-ngay-tao">
                            <div class="invalid-feedback">
                                Error!
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Giới thiệu</label>
                            <%--is-invalid--%>
                            <textarea class="form-control" id="textarea-gioi-thieu"
                                      rows="3"></textarea>
                            <div class="invalid-feedback">
                                Error!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-success" id="btn-submit">Lưu</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Delete -->
<div class="modal fade" id="delete-modal" tabindex="-1" role="dialog" aria-labelledby="delete-modal"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel1">Xác nhận thao tác</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Bạn có chắc chắn muốn xóa sản phẩm này không?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-danger" id="btn-xoa">Xóa</button>
            </div>
        </div>
    </div>
</div>

<div class="main-content">
    <div class="title-page">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 text-center">
                    <h1 class="text-title-page">Quản Lý Sản Phẩm</h1>
                </div>
                <div class="col-12">
                    <hr>
                </div>
            </div>
        </div>
    </div>
    <div class="tool-page">
        <div class="container">
            <div class="row">
                <div class="col-8 mbt-10">
                    <button type="button" class="btn btn-primary" id="btn-them" data-toggle="modal"
                            data-target="#detail-modal"><i class="fas fa-plus"></i> Thêm sản
                        phẩm
                    </button>
                </div>
                <div class="col-md-2 mbt-10">
                    <select id="select-search-loai-san-pham" class="form-control select-loai-san-pham">
                        <option selected value="0">Loại sản phẩm</option>
                        <option value="1">Điện thoại</option>
                        <option value="2">Laptop</option>
                    </select>
                </div>
                <div class="col-md-2 mbt-10">
                    <select id="select-sap-xep" class="form-control">
                        <option selected value="0">Sắp xếp</option>
                        <option value="1">A->Z</option>
                        <option value="2">Z->A</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="table-data">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered " style="text-align: center">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Ngày Tạo</th>
                                <th scope="col">Tồn kho</th>
                                <th scope="col" style="width: 175px;">Chức năng</th>
                            </tr>
                            </thead>
                            <tbody id="table-content">
                            <tr>
                                <th scope="row">1</th>
                                <td><img
                                        src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/thumbnail/300x/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone11-purple-select-2019.png"
                                        alt="" width="80px"></td>
                                <td>Ipon 12</td>
                                <td>16000000</td>
                                <td>2020/08/12</td>
                                <td>15</td>
                                <td>
                                    <button type="button" class="btn btn-warning btn-change-product"><i class="fas fa-pen"></i>
                                        Sửa
                                    </button>
                                    <button type="button" class="btn btn-danger btn-delete-product" data-toggle="modal"
                                            data-target="#delete-modal"><i class="fas fa-trash-alt"></i>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /.content-wrapper -->