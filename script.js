var billNameInput = $("#billTypeInput");
var billAmountInput = $("#billAmount");
var deleteButton = $("#deleteBtn");

var bills = [];

function calculateHandler(event) {
  event.preventDefault();
  billName = billNameInput.val();
  billAmount = billAmountInput.val();

  if (billName !== "" && !isNaN(billAmount)) {
    var bill = {
      name: billName,
      amount: parseFloat(billAmount),
    };

    bills.push(bill);
  }
  else {
    console.log("Empty string or amount is not a number");
  }
  console.log(bills);
  renderBills();
  updateTotalCost();
}

function renderBills() {
  for (var i = 0; i < bills.length; i++) {
    var billingEl = $(`<tbody>
<tr data-index="${i}">
  <th scope="row">${bills[i].name}</th>
  <td>${bills[i].amount}</td>
  <td><button type="button" class="btn btn-sm btn-danger" id="deleteBtn"><span class="bi-trash"></span></button></td>
</tr>
</tbody>`);
    
  }
  $(".table").append(billingEl);
}

function updateTotalCost() {
    var totalCost = 0;
    if(bills.length > 0) {
        for (var i = 0; i < bills.length; i++) {
            totalCost+= bills[i].amount;
            $("#finalCost").text(`Total Cost: $${totalCost}`);
        }
    }
    else {
        $("#finalCost").text(`Total Cost: $0`);
    }
    
}

function removeBill() {
    // console.log($(this).);
    var index = $(this).closest("tr").index();
    console.log(index);
    bills.splice(index, 1);
    $(this).closest("tr").remove();
    updateTotalCost();
    console.log(bills);
}

$("#calculateBtn").on("click", calculateHandler);
$(".table").on("click", ".btn-danger", removeBill);
