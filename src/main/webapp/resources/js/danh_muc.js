let categories = [];

$(function () {
    getAllCategories();
    addCategoryEvent();
})

function getAllCategories() {
   ajaxGet("api/public/categories")
       .then(rs => {
            categories = rs;
            fillTable();
       }).catch(ex => alterDanger("Có lỗi xảy ra"))
}

function fillTable() {
    let content = '';
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        content += `<tr>
                                <th scope="row">${i+1}</th>
                                <td>${category.name}</td>
                                <td>
                                    <button type="button" class="btn btn-warning btn-change-category" category-id="${category.id}" data-toggle="modal"
                            data-target="#detail-modal" >
                                    <i class="fas fa-pen"></i>
                                        Sửa
                                    </button>
                                    <button type="button" class="btn btn-danger btn-delete-category" category-id="${category.id}" data-toggle="modal"
                            data-target="#delete-modal">
                                     <i class="fas fa-trash-alt"></i>
                                        Xóa
                                    </button>
                                </td>
                            </tr>`;
    }
    $('#table-content').html(content);
    changeCategoryEvent();
    deleteEvent();
}

function addCategoryEvent() {
    $('#btn-them').on('click', function () {
        //clear content
        $('#input-ten').val('');
        //set submit event
        $('#btn-submit').off('click').on('click', function () {
            let category = {
                name: $('#input-ten').val()
            }
            ajaxPost('api/admin/category', category)
                .then(rs => {
                    alterSuccess("Thêm danh mục thành công")
                    $('#detail-modal').modal('hide');
                    getAllCategories();
                }).catch(ex => alterDanger("Thêm danh mục lỗi"));
        })
    })
}

function changeCategoryEvent() {
    $('.btn-change-category').on("click", function () {
        let categoryId = parseInt($(this).attr("category-id"));
        let category = categories.filter(p => p.id === categoryId)[0];
        //fill content
        $('#input-ten').val(category.name)
        //set change event
        $('#btn-submit').off('click').on('click', function () {
            category.name = $('#input-ten').val()
            ajaxPut('api/admin/category', category)
                .then(rs => {
                    alert("Thay đổi danh mục thành công");
                    $('#detail-modal').modal('hide');
                    fillTable();
                })
        })
    })
}

function deleteEvent() {
    $('.btn-delete-category').on("click", function () {
        let categoryId = $(this).attr("category-id");
        $('#btn-xoa').off('click').on('click', function () {
            ajaxDelete('api/admin/category?id='+categoryId)
                .then(rs => {
                    getAllCategories();
                    alterSuccess("Đã xóa danh mục");
                    $('#delete-modal').modal('hide');
                }).catch(ex => alterDanger("Xóa lỗi"))
        })
    })
}


