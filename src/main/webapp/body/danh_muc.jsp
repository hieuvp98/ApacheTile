<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="resources/js/danh_muc.js"></script>
<!-- Content Wrapper. Contains page content -->
<!-- Modal -->
<div class="modal fade bd-example-modal-lg" id="detail-modal" tabindex="-1" role="dialog"
     aria-labelledby="detail-modal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Chi tiết Danh mục</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body form-custom">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Tên</label>
                            <input type="text" class="form-control" id="input-ten" placeholder="Nhập tên danh mục">
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
                Bạn có chắc chắn muốn xóa danh mục này không?
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
                    <h1 class="text-title-page">Quản Lý Danh Mục</h1>
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
                            data-target="#detail-modal"><i class="fas fa-plus"></i> Thêm danh mục
                    </button>
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
                                <th scope="col">Tên</th>
                                <th scope="col" style="width: 175px;">Chức năng</th>
                            </tr>
                            </thead>
                            <tbody id="table-content" class="itstudent">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /.content-wrapper -->