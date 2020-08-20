// chờ html load xong


$(function () {
   //set sự kiện
   $(`#btn-alert`).on('click', function () {
      let height = $('#input-height').val();
      alert("Bạn cao " + height + " cm");
      console.log("Bạn cao " + height + " cm");
      // let x = 3;
      // const y = 5;
   })
})

