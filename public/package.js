

function search() {
  // Declare variables
  var input, filter, table, tr, i, txtValue;
  input = document.getElementById("myInput");
  filter =
    typeof input.value === "number" ? input.value : input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    let found = false;
    let tds = tr[i].getElementsByTagName("td");
    if (tds.length === 0 || filter === "") {
      found = true;
    }
    for (j = 0; j < tds.length - 2; j++) {
      let td = tds[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue) {
          if (typeof txtValue === "number") {
            if (txtValue.toString().indexOf(filter) > -1) {
              found = true;
            }
          } else {
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              found = true;
            }
          }
        }
      }
    }
    if (found) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

const newBtn = document.querySelector("#pkg-new-btn");
const editBtn = document.querySelector("#pkg-edit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const modal = document.querySelector("#modal");

newBtn.addEventListener("click", () => {
  modal.showModal();
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hide");
  modal.addEventListener("animationend", function animationEnd() {
    console.log("animationend");
    modal.classList.remove("hide");
    modal.close();
    modal.removeEventListener("animationend", animationEnd, false);
  });
});

function pay(package_number,Weight,Height,Width,Length,value,Customer_SSN){
  document.getElementById('value').innerText=(Weight*10/100+Height*Width*Length*10/100+value*20/100)+' SR'
  document.getElementById('delivery_fee').innerText=(Weight*10/100+Height*Width*Length*10/100)+' SR'
  document.getElementById('insurance_amount').innerText=value*20/100+' SR'
  

  document.getElementById('pay-btn').onclick=()=>{
  
    document.getElementById('modal').close()
    Package_payed(package_number,Customer_SSN)
  }
  
  document.getElementById('modal').showModal()
}
