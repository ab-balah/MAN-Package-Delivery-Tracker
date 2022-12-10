function search() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
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
    for (j = 0; j < tds.length-2; j++) {
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
