$(function () {
  loadMedicines();
  $("#medicines").on("click", ".btn-danger", handleDelete);
  $("#medicines").on("click", ".btn-warning", handleUpdate);
  $("#update-btn").on("click", function () {
    var id = $("#id-update").val();
    var name = $("#name-update").val();
    var price = $("#price-update").val();
    var quantity = $("#quantity-update").val();
    $.ajax({
      url: "http://localhost:4000/api/medicines/" + id,
      method: "PUT",
      data: { name: name, price: price, quantity: quantity },
      success: function (response) {
        console.log("Updated");
        console.log(response);
        dismissModal();
        loadMedicines();
      },
    });
  });
  $("#add-medicine").on("click", addRecipe);
  $("#cancel").on("click", dismissModal);
  $("#all-btn").on("click", loadMedicines);
});

function dismissModal() {
  $("#name-update").val("");
  $("#price-update").val("");
  $("#quantity-update").val("");
  $("#update-modal").modal("hide");
}

function addRecipe() {
  var name = $("#name-input").val();
  var price = $("#price-input").val();
  var quantity = $("#quantity-input").val();
  $.ajax({
    url: "http://localhost:4000/api/medicines",
    method: "POST",
    data: {
      name: name,
      price: price,
      quantity: quantity,
    },
    success: function (response) {
      $("#name-input").val("");
      $("#price-input").val("");
      $("#quantity-input").val("");
      loadMedicines();
      console.log("added");
    },
  });
}

function handleDelete() {
  var btn = $(this);
  var parent = btn.closest(".container");
  var id = parent.attr("data-id");
  $.ajax({
    url: "http://localhost:4000/api/medicines/" + id,
    method: "DELETE",
    success: function (response) {
      console.log("success");
      loadMedicines();
    },
  });
}

function handleUpdate() {
  var btn = $(this);
  var parent = btn.closest(".container");
  var id = parent.attr("data-id");
  $.ajax({
    url: "http://localhost:4000/api/medicines/" + id,
    method: "GET",
    success: function (response) {
      $("#id-update").val(response._id);
      $("#name-update").val(response.name);
      $("#price-update").val(response.price);
      $("#quantity-update").val(response.quantity);
    },
  });
  $("#update-modal").modal("show");
}

function loadMedicines() {
  $.ajax({
    url: "http://localhost:4000/api/medicines",
    method: "GET",
    error: function (response) {
      $("#medicines").html("Error Occured");
    },
    success: function (response) {
      console.log(response);
      $("#medicines").empty();
      for (var i = 0; i < response.length; i++) {
        $("#medicines").append(
          '<div class="container" data-id="' +
            response[i]._id +
            '"><h3>' +
            response[i].name +
            "</h3><h4> Rs. " +
            response[i].price +
            '</h4><p><button class="btn btn-danger btn-sm float-end">delete</button><button class="btn btn-warning btn-sm float-end">edit</button>' +
            response[i].quantity +
            " left</p></div><hr>"
        );
      }
    },
  });
}
