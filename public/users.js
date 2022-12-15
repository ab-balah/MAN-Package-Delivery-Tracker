function search() {
  // Declare variables
  var input, filter, table, tr, i, txtValue;
  input = document.getElementById("myInput");
  filter = typeof input.value === "number" ? input.value : input.value.toUpperCase();
  table = document.getElementById("usr-table");
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

const usrForm = document.querySelector("#usr-form");
const modal = document.querySelector("#modal");
const cfm_modal = document.querySelector(".cfm-modal");
const table = document.querySelector("#usr-table");
const tbody = document.getElementsByTagName("tbody")[0];

function newUser() {
  document.querySelector("#SSN").disabled = false;
  document.querySelector(".edit-new-form").onsubmit = () => submitUser();
  usrForm.reset();
  modal.showModal();
}

function editUser(usr_num) {
  document.querySelector("#SSN").disabled = true;
  document.querySelector(".edit-new-form").onsubmit = () => submitUser(usr_num);
  let tr = document.querySelector(`#tr${usr_num}`);
  tr.classList.add("table-active");
  console.log(usr_num);
  fetch(`/admin/userInfo/${usr_num}`)
    .then((users) => users.json())
    .then((users) => {
      users.forEach((User) => {
        console.log(User);
        document.getElementById("SSN").value = User.SSN;
        document.getElementById("Fname").value = User.Fname;
        document.getElementById("Lname").value = User.Lname;
        document.getElementById("Phone").value = User.Phone;
        document.getElementById("Email").value = User.Email;
        document.getElementById("Birth_Date").value = User.Birth_Date;
        document.getElementById("Country").value = User.Country;
        document.getElementById("City").value = User.city;
        document.getElementById("Street_Address").value = User.Street_address;
      });
      modal.showModal();
    });
}

function cancelUser() {
  const tr = document.querySelector(".table-active");
  if (tr) {
    tr.classList.remove("table-active");
  }
  modal.classList.add("hide");
  modal.addEventListener("animationend", function animationEnd() {
    console.log("animationend");
    modal.classList.remove("hide");
    modal.close();
    usrForm.reset();
    modal.removeEventListener("animationend", animationEnd, false);
  });
}
function submitUser(usr_num) {
  console.log(usr_num, typeof usr_num);
  data = {
    SSN: document.getElementById("SSN").value,
    Fname: document.getElementById("Fname").value,
    Lname: document.getElementById("Lname").value,
    Phone: document.getElementById("Phone").value,
    Email: document.getElementById("Email").value,
    Birth_Date: document.getElementById("Birth_Date").value,
    Country: document.getElementById("Country").value,
    city: document.getElementById("City").value,
    Street_address: document.getElementById("Street_Address").value,
  };
  if (usr_num) {
    console.log("edit");
    fetch(`/admin/updateUserInfo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((users) => {
      fetch(`/admin/usersInfo`)
        .then((users) => users.json())
        .then((users) => {
          tbody.innerHTML = "";
          users.forEach((User) => {
            tbody.innerHTML += `
            <tr id="tr${User.SSN}" class=${User.Has_Account ? "" : "table-info"}>
            <td>${User.SSN}</td>
            <td>${User.Fname}</td>
            <td>${User.Lname}</td>
            <td>${User.Phone}</td>
            <td>${User.Email}</td>
            <td>${User.Birth_Date}</td>
            <td>${User.Country}</td>
            <td>
              <button id="${User.SSN}" class="btn btn-outline-secondary usr-edit-btn" onclick="editUser(this.id)">Edit</button>
            </td>
            <td>
              <button id="${User.SSN}" class="btn btn-outline-danger" onclick="removeUser(this.id)">Delete</button>
            </td>
          </tr>`;
          });
        });
    });
  } else {
    console.log("new");
    fetch(`/admin/addUser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((users) => {
      console.log("entered");
      fetch(`/admin/usersInfo`)
        .then((users) => users.json())
        .then((users) => {
          tbody.innerHTML = "";
          users.forEach((User) => {
            tbody.innerHTML += `
          <tr id="tr${User.SSN}" class=${User.Has_Account ? "" : "table-info"}>
          <td>${User.SSN}</td>
          <td>${User.Fname}</td>
          <td>${User.Lname}</td>
          <td>${User.Phone}</td>
          <td>${User.Email}</td>
          <td>${User.Birth_Date}</td>
          <td>${User.Country}</td>
          <td>
            <button id="${User.SSN}" class="btn btn-outline-secondary usr-edit-btn" onclick="editUser(this.id)">Edit</button>
          </td>
          <td>
            <button id="${User.SSN}" class="btn btn-outline-danger" onclick="removeUser(this.id)">Delete</button>
          </td>
        </tr>`;
          });
        });
    });
  }
  const tr = document.querySelector(".table-active");
  if (tr) {
    tr.classList.remove("table-active");
  }
  modal.classList.add("hide");
  modal.addEventListener("animationend", function animationEnd() {
    modal.classList.remove("hide");
    modal.close();
    usrForm.reset();
    modal.removeEventListener("animationend", animationEnd, false);
  });
}

function removeUser(usr_num) {
  let tr = document.querySelector(`#tr${usr_num}`);
  console.log(tr);
  tr.classList.add("table-danger");
  cfm_modal.showModal();
}

function confirm() {
  const tr = document.querySelector(".table-danger");
  const usr_num = tr.id.replace("tr", "");
  fetch(`/admin/deleteUser/${usr_num}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((users) => {
    fetch(`/admin/usersInfo`)
      .then((users) => users.json())
      .then((users) => {
        tbody.innerHTML = "";
        users.forEach((User) => {
          tbody.innerHTML += `
          <tr id="tr${User.SSN}" class=${User.Has_Account ? "" : "table-info"}>
          <td>${User.SSN}</td>
        <td>${User.Fname}</td>
        <td>${User.Lname}</td>
        <td>${User.Phone}</td>
        <td>${User.Email}</td>
        <td>${User.Birth_Date}</td>
        <td>${User.Country}</td>
        <td>
          <button id="${User.SSN}" class="btn btn-outline-secondary usr-edit-btn" onclick="editUser(this.id)">Edit</button>
        </td>
        <td>
          <button id="${User.SSN}" class="btn btn-outline-danger" onclick="removeUser(this.id)">Delete</button>
        </td>
      </tr>`;
        });
      });
  });

  cfm_modal.classList.add("hide");
  cfm_modal.addEventListener("animationend", function animationEnd() {
    cfm_modal.classList.remove("hide");
    cfm_modal.close();
    usrForm.reset();
    cfm_modal.removeEventListener("animationend", animationEnd, false);
  });
}

function cancelConfirm() {
  document.querySelector(".table-danger").classList.remove("table-danger");
  cfm_modal.classList.add("hide");
  cfm_modal.addEventListener("animationend", function animationEnd() {
    cfm_modal.classList.remove("hide");
    cfm_modal.close();
    usrForm.reset();
    cfm_modal.removeEventListener("animationend", animationEnd, false);
  });
}

function pay(SSN, Weight, Height, Width, Length, value, Customer_SSN) {
  document.getElementById("value").innerText =
    "the payent value including the insurance amount is " + ((Weight * 10) / 100 + (Height * Width * Length * 10) / 100 + (value * 20) / 100);
  document.getElementById("pay-btn").addEventListener("click", () => {
    document.getElementById("modal").close();
    User_payed(SSN, Customer_SSN);
  });
  console.log("opened");
  document.getElementById("modal").showModal();
}
