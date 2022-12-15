function search() {
  // Declare variables
  var input, filter, table, tr, i, txtValue;
  input = document.getElementById("myInput");
  filter = typeof input.value === "number" ? input.value : input.value.toUpperCase();
  table = document.getElementById("pkg-table");
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

const pkgForm = document.querySelector("#pkg-form");
const modal = document.querySelector("#modal");
const cfm_modal = document.querySelector(".cfm-modal");
const table = document.querySelector("#pkg-table");
const tbody = document.getElementsByTagName("tbody")[0];

function newPackage() {
  document.querySelector(".edit-new-form").onsubmit = () => submitPackage();
  document.querySelector("#package_number").placeholder = "Added Automatically";
  pkgForm.reset();
  modal.showModal();
}

function editPackage(pkg_num) {
  document.querySelector(".edit-new-form").onsubmit = () => submitPackage(pkg_num);
  let tr = document.querySelector(`#tr${pkg_num}`);
  tr.classList.add("table-secondary");
  console.log(pkg_num);
  fetch(`/admin/packageInfo/${pkg_num}`)
    .then((packages) => packages.json())
    .then((packages) => {
      packages.forEach((package) => {
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
        document.getElementById("payment_status").value = package.Is_Paid;
        document.getElementById("category").value = package.Category;
      });
      modal.showModal();
    });
}

function cancelPackage() {
  const tr = document.querySelector(".table-secondary");
  if (tr) {
    tr.classList.remove("table-secondary");
  }
  modal.classList.add("hide");
  modal.addEventListener("animationend", function animationEnd() {
    console.log("animationend");
    modal.classList.remove("hide");
    modal.close();
    pkgForm.reset();
    modal.removeEventListener("animationend", animationEnd, false);
  });
}
function submitPackage(pkg_num) {
  console.log(pkg_num, typeof pkg_num);
  data = {
    Package_number: document.getElementById("package_number").value,
    Category: document.getElementById("category").value,
    Weight: document.getElementById("weight").value,
    Width: document.getElementById("width").value,
    Height: document.getElementById("height").value,
    Length: document.getElementById("length").value,
    destination: document.getElementById("destination").value,
    Value: document.getElementById("value").value,
    Status: document.getElementById("status").value,
    Final_delivery_Date: document.getElementById("delivery_date").value,
    Sender_SSN: document.getElementById("sender_ssn").value,
    Receiver_SSN: document.getElementById("receiver_ssn").value,
    RC_ID: document.getElementById("rc_id").value,
    Time: document.getElementById("time").value.replace("T", " "),
    Is_Paid: document.getElementById("payment_status").value,
  };
  tableData = [
    data.Package_number,
    data.Category,
    data.destination,
    data.Status,
    data.Sender_SSN,
    data.Receiver_SSN,
    data.RC_ID,
    data.Time,
    data.Is_Paid,
  ];
  console.log(tableData);
  if (pkg_num) {
    fetch(`/admin/updatePackageInfo/${pkg_num}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((packages) => packages.json())
      .then((packages) => {
        fetch(`/admin/packagesInfo`)
          .then((packages) => packages.json())
          .then((packages) => {
            tbody.innerHTML = "";
            packages.forEach((package) => {
              tbody.innerHTML += `
          <tr id="tr${package.Package_number}">
          <td>
            <a href="/package/${package.Package_number}">${package.Package_number}</a>
          </td>
          <td>${package.Category}</td>
          <td>${package.destination}</td>
          <td>${package.Status}</td>
          <td>${package.Sender_SSN}</td>
          <td>${package.Receiver_SSN}</td>
          <td>${package.RC_ID}</td>
          <td>${package.Time}</td>
          <td>${package.Is_Paid ? "Paid" : "Not Paid"}</td>
          <td>
            <button id="${package.Package_number}" class="btn btn-outline-secondary pkg-edit-btn" onclick="editPackage(this.id)">Edit</button>
          </td>
          <td>
            <button id="${package.Package_number}" class="btn btn-outline-danger" onclick="removePackage(this.id)">Delete</button>
          </td>
        </tr>`;
            });
          });
      });
  } else {
    fetch(`/admin/addPackage/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((packages) => packages.json())
      .then((packages) => {
        fetch(`/admin/packagesInfo`)
          .then((packages) => packages.json())
          .then((packages) => {
            tbody.innerHTML = "";
            packages.forEach((package) => {
              tbody.innerHTML += `
          <tr id="tr${package.Package_number}">
          <td>
            <a href="/package/${package.Package_number}">${package.Package_number}</a>
          </td>
          <td>${package.Category}</td>
          <td>${package.destination}</td>
          <td>${package.Status}</td>
          <td>${package.Sender_SSN}</td>
          <td>${package.Receiver_SSN}</td>
          <td>${package.RC_ID}</td>
          <td>${package.Time}</td>
          <td>${package.Is_Paid ? "Paid" : "Not Paid"}</td>
          <td>
            <button id="${package.Package_number}" class="btn btn-outline-secondary pkg-edit-btn" onclick="editPackage(this.id)">Edit</button>
          </td>
          <td>
            <button id="${package.Package_number}" class="btn btn-outline-danger" onclick="removePackage(this.id)">Delete</button>
          </td>
        </tr>`;
            });
          });
      });
  }
  const tr = document.querySelector(".table-secondary");
  if (tr) {
    tr.classList.remove("table-secondary");
  }
  modal.classList.add("hide");
  modal.addEventListener("animationend", function animationEnd() {
    modal.classList.remove("hide");
    modal.close();
    pkgForm.reset();
    modal.removeEventListener("animationend", animationEnd, false);
  });
}

function removePackage(pkg_num) {
  let tr = document.querySelector(`#tr${pkg_num}`);
  console.log(tr);
  tr.classList.add("table-danger");
  cfm_modal.showModal();
}

function confirm() {
  const tr = document.querySelector(".table-danger");
  const pkg_num = tr.id.replace("tr", "");
  var index = tr.rowIndex;
  fetch(`/admin/deletePackage/${pkg_num}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((packages) => packages.json())
    .then((packages) => {
      console.log(packages);
    });

  table.deleteRow(index);

  cfm_modal.classList.add("hide");
  cfm_modal.addEventListener("animationend", function animationEnd() {
    cfm_modal.classList.remove("hide");
    cfm_modal.close();
    pkgForm.reset();
    cfm_modal.removeEventListener("animationend", animationEnd, false);
  });
}

function cancelConfirm() {
  document.querySelector(".table-danger").classList.remove("table-danger");
  cfm_modal.classList.add("hide");
  cfm_modal.addEventListener("animationend", function animationEnd() {
    cfm_modal.classList.remove("hide");
    cfm_modal.close();
    pkgForm.reset();
    cfm_modal.removeEventListener("animationend", animationEnd, false);
  });
}

function pay(package_number, Weight, Height, Width, Length, value, Customer_SSN) {
  document.getElementById("value").innerText ="The Payent Value Including The Insurance Amount Is " + ((Weight * 10) / 100 + (Height * Width * Length * 10) / 100 + (value * 20) / 100);
  document.getElementById("delivery_fee").innerText = ((Weight * 10) / 100 + (Height * Width * Length * 10) / 100);
  
  document.getElementById("insurance_amount").innerText =  ((value * 20) / 100);
  document.getElementById("pay-btn").addEventListener("click", () => {
    document.getElementById("modal").close();
    Package_payed(package_number, Customer_SSN);
  });
  console.log("opened");
  document.getElementById("modal").showModal();
}

function sendEmail() {
  Email.send({
    Host: "smtp.elasticemail.com",
    port: "2525",
    Username: "MANlogistic@logistic.com",
    Password: "DEA9D66168070C743C2BC2BDC52408B08EEB",
    To: "naifxbl99@gmail.com",
    From: "manlogistic2@gmail.com",
    Auth: "PLAIN, LOGIN and CRAM-MD5",
    TLS: "Optional (STARTTLS on all ports)",
    Subject: "Test email",
    Body: "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>;",
  }).then((message) => {
    alert(message);
    console.log(message);
  });
}
