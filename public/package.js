function search() {
  // Declare variables
  var input, filter, table, tr, i, txtValue;
  input = document.getElementById("myInput");
  filter = typeof input.value === "number" ? input.value : input.value.toUpperCase();
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
const editBtn = document.querySelector(".pkg-edit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const submitBtn = document.querySelector("#submit-btn");
const pkgForm = document.querySelector("#pkg-form");

const modal = document.querySelector("#modal");

function newPackage() {
  pkgForm.reset();
  modal.showModal();
}

function editPackage(pkg_num) {
  console.log(pkg_num);
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("here");

      JSON.parse(this.responseText).forEach((package) => {
        console.log(package);
        document.getElementById("package_number").value = package.Package_number;

        document.getElementById("weight").value = package.Weight;
        document.getElementById("destination").value = package.destination;
        document.getElementById("width").value = package.Width;
        document.getElementById("height").value = package.Height;
        document.getElementById("length").value = package.Length;
        document.getElementById("sender_ssn").value = package.Sender_SSN;
        document.getElementById("receiver_ssn").value = package.Receiver_SSN;
        document.getElementById("rc_id").value = package.RC_ID;
        document.getElementById("delivery_date").value = package.Final_delivery_Date;
        document.getElementById("time").value = package.Time;
        document.getElementById("value").value = package.Value;
        document.getElementById("status").value = package.Status;
        document.getElementById("payment_status").value = package.IsPaid;
        document.getElementById("category").value = package.Category;
      });
      modal.showModal();
    }

    xhttp.open("GET", "/admin/packageInfo/" + pkg_num);
    xhttp.send();
  };

  function cancelPackage() {
    modal.classList.add("hide");
    modal.addEventListener("animationend", function animationEnd() {
      console.log("animationend");
      modal.classList.remove("hide");
      modal.close();
      pkgForm.reset();
      modal.removeEventListener("animationend", animationEnd, false);
    });
  }

  function submitPackage() {
    modal.classList.add("hide");
    modal.addEventListener("animationend", function animationEnd() {
      console.log("animationend");
      modal.classList.remove("hide");
      modal.close();
      pkgForm.reset();
      modal.removeEventListener("animationend", animationEnd, false);
    });
  }
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hide");
    modal.addEventListener("animationend", function animationEnd() {
      console.log("animationend");
      modal.classList.remove("hide");
      modal.close();
      modal.removeEventListener("animationend", animationEnd, false);
    });
  });

  function pay(package_number, Weight, Height, Width, Length, value, Customer_SSN) {
    document.getElementById("value").innerText =
      "the payent value including the insurance amount is " + ((Weight * 10) / 100 + (Height * Width * Length * 10) / 100 + (value * 20) / 100);
    document.getElementById("pay-btn").addEventListener("click", () => {
      document.getElementById("modal").close();
      Package_payed(package_number, Customer_SSN);
    });
    console.log("opened");
    document.getElementById("modal").showModal();
  }
}
