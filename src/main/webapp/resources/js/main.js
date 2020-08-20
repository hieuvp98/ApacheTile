var urlBack = "";
$(function () {
    activeMenu();
})

function activeMenu() {
    let href = window.location.href;
    $(".navbar-nav li").removeClass("active");
    if(href.indexOf("quan-ly-san-pham") > 0) {
        $("li[data-value='quan-ly-san-pham']").addClass("active");
    } else if(href.indexOf("trang-chu") > 0) {
        $("li[data-value='trang-chu']").addClass("active");
    } else if(href.indexOf("quan-ly-danh-muc-san-pham") > 0) {
        $("li[data-value='quan-ly-danh-muc-san-pham']").addClass("active");
    }
}

//url link get api, option select url_api (1) or url_api_cms (2)
async function ajaxGet(url) {
    let rs = null;
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: urlBack + url,
        success: function (result) {
            rs = result;
        }
    })
    return rs;
}

//url link get api, option select url_api (1) or url_api_cms (2)
async function ajaxPost(url, data) {
    let rs = null;
    await $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url: urlBack + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            rs = result
        }
    });
    return rs;
}

async function ajaxPut(url, data) {
    let rs = null;
    await $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        url: urlBack + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            rs = result
        }
    })
    return rs;
}

async function ajaxDelete(url) {
    let rs = null;
    await $.ajax({
        type: 'DELETE',
        url: urlBack + url,
        timeout: 30000,
        success: function (result) {
            rs = result
        }
    })
    return rs;
}

async function ajaxUploadFile(url, file) {
    let rs = null;
    await $.ajax({
        type: "POST",
        url: urlBack + url,
        data: file,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            rs = result;
        }
    });
    return rs;
}

async function ajaxCall(url) {
    let rs = null;
    await $.ajax({
        type: 'GET',
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        url: url,
        success: function (result) {
            rs = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return rs;
}

async function ajaxGetFile(url) {
    let rs = null;
    await $.get({
        url: url,
        success: function(response) {
            rs = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    return rs;
}

//view Field
function viewField(data) {
    return data != null ? data : "";
}

//view error
function viewError(selector, message) {
    selector.addClass("is-invalid");
    selector.siblings(".invalid-feedback").text(`${message}. Mời nhập lại!`);
}

function hiddenError(selector) {
    selector.removeClass("is-invalid");
}

//format money
function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    let x = nStr.split(decSeperate);
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}

function alterSuccess(text, time = 2000) {
    $.notify({
        icon: 'far fa-check-circle',
        message: text
    }, {
        delay: time,
        offset: {x: 15, y: 15},
        type: 'success',
    });
}

function alterInfo(text, time = 2000) {
    $.notify({
        icon: 'fas fa-info-circle',
        message: text
    }, {
        delay: time,
        offset: {x: 15, y: 15},
        type: 'info',
    });
}

function alterWarning(text, time = 2000) {
    $.notify({
        icon: 'fas fa-exclamation',
        message: text
    }, {
        delay: time,
        offset: {x: 15, y: 15},
        type: 'warning',
    });
}

function alterDanger(text, time = 2000) {
    $.notify({
        icon: 'fas fa-exclamation-triangle',
        message: text
    }, {
        delay: time,
        offset: {x: 15, y: 15},
        type: 'danger',
    });
}

//end alter
function viewDateVn() {
    if ($(".date-vn").length > 0) {
        $(".date-vn").datepicker({
            language: "vi"
        });
    }
}

function regexUsername(text) {
    return /^[A-Za-z0-9]+/.test(text);
}

function regexPassword(text) {
    return /^[A-Za-z0-9]+/.test(text);
}

function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

function regexTen(name) {
    return /^[a-zA-Z]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/g.test(removeAscent(name));
}

function regexNumber(number) {
    return /^\d+$/.test(number)
}