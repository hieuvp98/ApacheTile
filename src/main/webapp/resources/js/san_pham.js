let products = [];
let count = 3;

$(function () {
    getAllProducts();
    fillTable();
    addProductEvent();
})

function getAllProducts() {
    products.push({
        id: 1,
        name: "Iphone",
        image: "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/thumbnail/300x/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone11-purple-select-2019.png",
        price: 26_000_000,
        create: "12/08/2020",
        quantity: 15,
        introduction: "Iphone",
        type: 1
    })
    products.push({
        id: 2,
        name: "Dell Xps",
        image: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/15891818721_thumb.jpg",
        price: 50_000_000,
        create: "12/08/2020",
        quantity: 15,
        introduction: "XPS",
        type: 2
    })
    products.push({
        id: 3,
        name: "MSI prestige",
        image: "https://asset.msi.com/resize/image/global/product/product_10_20190903100138_5d6dc9820d7d2.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
        price: 50000,
        create: "12/08/2020",
        quantity: 15,
        introduction: "MSI",
        type: 2
    })
}

function fillTable() {
    let content = '';

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        content += `<tr>
                <td>${i + 1}</td>
                <td><img style="max-width: 100px" src="${product.image}" ></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.create}</td>
                <td>${product.quantity}</td>
                <td> <button type="button" class="btn btn-warning btn-change-product" product-id="${product.id}" data-toggle="modal"
                            data-target="#detail-modal"><i class="fas fa-pen"></i>
                                        Sửa
                                    </button>
                                    <button type="button" class="btn btn-danger btn-delete-product" product-id="${product.id}" > <i class="fas fa-trash-alt"></i>
                                        Xóa
                                    </button></td>
            </tr>`;
    }
    $('#table-content').html(content);
    changeProductEvent();
    deleteEvent();
}

function addProductEvent() {
    $('#btn-them').on('click', function () {
        //clear cotnent
        $('#input-ten').val('')
        $('#input-hinh-anh').val('')
        $('#input-gia').val(0)
        $('#input-ngay-tao').val('')
        $('#input-ton-kho').val('')
        $('#textarea-gioi-thieu').val('')
        //set submit event
        $('#btn-submit').off('click').on('click', function () {
            let product = {
                id: count++,
                name: $('#input-ten').val(),
                image: $('#input-hinh-anh').val(),
                price: $('#input-gia').val(),
                create: new Date(),
                quantity: $('#input-ton-kho').val(),
                introduction: $('#textarea-gioi-thieu').val(),
                type: $('#select-add-loai-san-pham').val()
            }

            products.push(product);
            alert("Thêm sản phẩm thành công");
            $('#detail-modal').modal('hide');
            fillTable();
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

            product.name = $('#input-ten').val()
            product.image = $('#input-hinh-anh').val()
            product.price = $('#input-gia').val()
            product.quantity = $('#input-ton-kho').val()
            product.introduction = $('#textarea-gioi-thieu').val()
            product.type = $('#select-add-loai-san-pham').val()

            alert("Thay đổi sản phẩm thành công");
            $('#detail-modal').modal('hide');
            fillTable();
        })
    })
}

function deleteEvent() {
    $('.btn-delete-product').on("click", function () {
        let productId = parseInt($(this).attr("product-id"));
        products = products.filter(p => p.id !== productId);
        fillTable();
        alert("Đã xóa sản phẩm")
    })
}


