let products = [];

$(function () {
    getAllCategories();
    getAllProducts();
    addProductEvent();
    searchEvent();
    test(funA);
})

function test(a) {
    a(5);
}

function funA(num = 5) {
    console.log("b");
}

function getAllCategories() {
    ajaxGet(`api/public/categories`)
        .then(rs => {
            let contentCates = '';

            // for (const cate in rs) {
            //     contentCates.concat(`<option value="${cate.id}">${cate.name}</option>`)
            // }

            // rs.forEach( cate => contentCates.concat(`<option value="${cate.id}">${cate.name}</option>`))

            let content = rs.map(cate => `<option value="${cate.id}">${cate.name}</option>`).join('');
            $('#select-search-loai-san-pham').html('<option value="0">Loại sản phẩm</option>' + content);
            $('#select-add-loai-san-pham').html(content);
        }).catch(ex => {
        console.log(ex)
    })
}

function getAllProducts(brandId = 0, categoryId = 0, nameAsc = true) {
    ajaxGet(`api/public/products?brand-id=${brandId}&category-id=${categoryId}&name-asc=${nameAsc}`)
        .then(function (rs) {
            products = rs;
            fillTable();
        }).catch(ex => alterDanger("Có lỗi xảy ra"))
}

function fillTable() {
    let content = '';
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        content += `<tr>
                                <th scope="row">${i + 1}</th>
                                <td>
                                <img src="${product.image}"
                                        width="80px">
                                </td>
                                <td>${product.name}</td>
                                <td>${product.price}</td>
                                <td>${product.createDate}</td>
                                <td>${product.quantity}</td>
                                <td>
                                    <button type="button" class="btn btn-warning btn-change-product" product-id="${product.id}" data-toggle="modal"
                            data-target="#detail-modal" >
                                    <i class="fas fa-pen"></i>
                                        Sửa
                                    </button>
                                    <button  type="button" class="btn btn-danger btn-delete-product" product-id="${product.id}" data-toggle="modal"
                            data-target="#delete-modal">
                                     <i class="fas fa-trash-alt"></i>
                                        Xóa
                                    </button>
                                </td>
                            </tr>`;
    }
    $('#table-content').html(content);
    changeProductEvent();
    deleteEvent();
}

function checkInputProduct() {
    let count = 4;

    if ($('#input-ten').val().length === 0) {
        alterWarning("Không được bỏ trống tên");
        count--;
    }
    if ($('#input-gia').val().length === 0) {
        alterWarning("Không được bỏ trống giá");
        count--;
    }
    if ($('#input-ton-kho').val().length === 0) {
        alterWarning("Không được bỏ trống tồn kho");
        count--;
    }
    if ($('#input-hinh-anh').val().length === 0) {
        alterWarning("Không được bỏ trống hình ảnh");
        count--;
    }
    return count === 4;
}

function addProductEvent() {
    $('#btn-them').on('click', function () {
        //clear content
        $('#input-ten').val('');
        $('#input-hinh-anh').val('');
        $('#input-gia').val(0);
        $('#input-ngay-tao').val('');
        $('#input-ton-kho').val(1);
        $('#textarea-gioi-thieu').val('');
        //set submit event
        $('#btn-submit').off('click').on('click', function () {
            if (!checkInputProduct())
                return;
            let product = {
                name: $('#input-ten').val(),
                image: $('#input-hinh-anh').val(),
                price: $('#input-gia').val(),
                quantity: $('#input-ton-kho').val(),
                introduction: $('#textarea-gioi-thieu').val(),
                categoryId: $('#select-add-loai-san-pham').val(),
                brandId: 1
            }
            ajaxPost('api/admin/product', product)
                .then(rs => {
                    alterSuccess("Thêm sản phẩm thành công");
                    $('#detail-modal').modal('hide');
                    getAllProducts();
                }).catch(ex => {
                console.log(ex);
                alterDanger("Thêm sản phẩm thất bại");
            })

        })
    })
}

function changeProductEvent() {
    $('.btn-change-product').on("click", function () {
        let productId = parseInt($(this).attr("product-id"));
        let product = products.filter(p => p.id === productId)[0];
        //fill content
        $('#input-ten').val(product.name)
        $('#input-hinh-anh').val(product.image)
        $('#input-gia').val(product.price)
        $('#input-ngay-tao').val(product.create)
        $('#input-ton-kho').val(product.quantity)
        $('#textarea-gioi-thieu').val(product.introduction)
        $('#select-add-loai-san-pham').val(product.type)

        //set change event
        $('#btn-submit').off('click').on('click', function () {
            if (!checkInputProduct())
                return;
            product.name = $('#input-ten').val()
            product.image = $('#input-hinh-anh').val()
            product.price = $('#input-gia').val()
            product.quantity = $('#input-ton-kho').val()
            product.introduction = $('#textarea-gioi-thieu').val()
            product.type = $('#select-add-loai-san-pham').val()
            ajaxPut('api/admin/product', product)
                .then(rs => {
                    alterSuccess("Thay đổi sản phẩm thành công");
                    $('#detail-modal').modal('hide');
                    fillTable();
                }).catch(ex => {
                console.log(ex);
                alterDanger("Cập nhật sản phẩm thất bại");
            })
        })
    })
}

function deleteEvent() {
    $('.btn-delete-product').on("click", function () {
        let productId = $(this).attr("product-id");
        $('#btn-xoa').off('click').on('click', function () {
            ajaxDelete('api/admin/product?id=' + productId)
                .then(rs => {
                    products = products.filter(p => p.id != productId);
                    fillTable();
                    $('#delete-modal').modal('hide');
                    alterSuccess("Đã xóa sản phẩm")
                }).catch(ex => {
                console.log(ex);
                alterDanger("Xóa sản phẩm thất bại");
            })
        })
    })
}

function searchEvent() {
    $('#select-search-loai-san-pham').on('change', function () {
        getAllProducts(0, $(this).val())
    });

    $('#select-sap-xep').on('change', function () {
        switch (parseInt($(this).val())) {
            case 1:
                products.sort((p1, p2) => p1.name.localeCompare(p2.name));
                fillTable();
                break;
            case 2:
                products.sort((p1, p2) => -p1.name.localeCompare(p2.name));
                fillTable();
                break;
        }
    })
}

function funSugarDaddy() {

    function funBaby() {
        console.log("hello");
    }

}


