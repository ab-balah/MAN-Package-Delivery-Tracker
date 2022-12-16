
function incomingPackages(Customer_SSN){
   
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      
     
        if (this.readyState == 4 && this.status == 200) {
           
          document.getElementById('incoming').innerHTML=[]
        if ( JSON.parse(this.responseText).length) {
          
        
          JSON.parse(this.responseText).forEach(package => {
            document.getElementById('incoming').innerHTML=document.getElementById('incoming').innerHTML+`<tr class="lead">
      <td><a href="/package/${package.Package_number}">${package.Package_number}</a></td>
      <td>${package.destination}</td>
      <td>${package.Value}</td>
      <td>${package.sender}</td>
      <td>${package.Reciver}</td>
      <td>${package.RC_ID}</td>
      <td>${package.Time}</td>
      <td>${package.Status}</td>
      ${!package.Is_Paid?'<td><button class="btn btn-outline-secondary" onclick="pay('+package.Package_number+","+package.Weight+","+package.Height+","+package.Width+","+package.Length+","+package.Value+","+"'1')"+'">pay</button></td>': "<td><button class='btn btn-outline-secondary' disabled>paid</button></td>"}
      </tr>`
          
          });
        }
        else{
          document.getElementById('incoming').innerHTML=`<tr>
          <td colspan="9" class='lead display-6 text-center'>Nothing to show yet</td>
      </tr>`
        }
  
         
        }
    }

    xhttp.open("GET", "/user/incomingPackages/"+Customer_SSN);
    xhttp.send();


}




function sentPackages(Customer_SSN){
 
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    
  
      if (this.readyState == 4 && this.status == 200) {
         
        document.getElementById('sent').innerHTML=[]
        if ( JSON.parse(this.responseText).length) {
        
        JSON.parse(this.responseText).forEach(package => {
          document.getElementById('sent').innerHTML=document.getElementById('sent').innerHTML+`<tr class="lead">
    <td><a href="/package/${package.Package_number}">${package.Package_number}</a></td>
    <td>${package.destination}</td>
    <td>${package.Value}</td>
    <td>${package.sender}</td>
    <td>${package.Reciver}</td>
    <td>${package.RC_ID}</td>
    <td>${package.Time}</td>
    <td>${package.Status}</td>
    ${!package.Is_Paid?'<td><button class="btn btn-outline-secondary" onclick="pay('+package.Package_number+","+package.Weight+","+package.Height+","+package.Width+","+package.Length+","+package.Value+","+"'1')"+'">pay</button></td>': "<td><button class='btn btn-outline-secondary' disabled>paid</button></td>"}
    </tr>`
        
        });}
        else{
          document.getElementById('sent').innerHTML=`<tr>
          <td colspan="9" class='lead display-6 text-center'>Nothing to show yet</td>
      </tr>`
        }
    

       
      }
  }
  xhttp.open("GET", "/user/sentPackages/"+Customer_SSN);
  xhttp.send();


}

async function signup(){
  let form = document.getElementById("signup_form")
  formData = {}
  form.querySelectorAll("input, select").forEach(element=>{
    if(element.getAttribute("name")){
      formData[element.getAttribute("name")] = element.value
    }
  })
  let fetchData = {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
  };
  console.log(fetchData)
  let status = await fetch("/signup",fetchData);
  if(status.ok){
    window.location.replace(status.url)
  }else{
    document.getElementById('signup_failure').classList.remove('invisible_component');
  }
}

async function login(){
  let form = document.getElementById("login_form")
  formData = {}
  form.querySelectorAll("input").forEach(element=>{
    if(element.getAttribute("name")){
      formData[element.getAttribute("name")] = element.value
    }
  })
  let fetchData = {
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
  };
  let status = await fetch("/login",fetchData);
  if(status.ok){
    window.location.replace(status.url)
  }else{
    document.getElementById('login_failure').classList.remove('invisible_component');
  }
  console.log("here")
}

async function logout(){
  let fetchData = {
    method:"post",
    headers:{
      "Content-Type":"application/json"
    }
  };
  let status = await fetch("/logout",fetchData);
  if(status.ok){
    window.location.replace(status.url)
  }
}

function edit_userinfo_form(){
  let form = document.getElementById("profile_form")
  form.querySelectorAll("input").forEach(element=>{
    if(element.getAttribute("name")!="SSN" && element.getAttribute("name")!="Username"){
      element.removeAttribute('readonly')
    }
  })
  form.querySelectorAll("select").forEach(element=>{
    element.removeAttribute('disabled')
  })
  form.querySelectorAll("button").forEach(element=>{
    element.removeAttribute('disabled')
  })
}

async function updateMovement(type){
  if(type==="airport"){
    let form = document.getElementById("airports_form")
    formData = {}
    form.querySelectorAll("input, select").forEach(element=>{
      if(element.getAttribute("name")){
        if(element.getAttribute("type")==="datetime-local"){
          formData[element.getAttribute("name")] = element.value.replace("T"," ")
        }else{
          formData[element.getAttribute("name")] = element.value
        }
      }
    })
    let fetchData = {
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    };
    console.log(fetchData)
    let status = await fetch("/admin/updateMovement/airport",fetchData);
    if(status.ok){
      document.getElementById('airport_failure').classList.add('invisible_component');
    }else{
      document.getElementById('airport_failure').classList.remove('invisible_component');
    }
  }else if(type==="truck"){
    let form = document.getElementById("truck_form")
    formData = {}
    form.querySelectorAll("input, select").forEach(element=>{
      if(element.getAttribute("name")){
        if(element.getAttribute("type")==="datetime-local"){
          formData[element.getAttribute("name")] = element.value.replace("T"," ")
        }else{
          formData[element.getAttribute("name")] = element.value
        }
      }
    })
    let fetchData = {
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    };
    console.log(fetchData)
    let status = await fetch("/admin/updateMovement/truck",fetchData);
    if(status.ok){
      document.getElementById('truck_failure').classList.add('invisible_component');
    }else{
      document.getElementById('truck_failure').classList.remove('invisible_component');
    }
  }else if(type==="plane"){
    let form = document.getElementById("plane_form")
    formData = {}
    form.querySelectorAll("input, select").forEach(element=>{
      if(element.getAttribute("name")){
        if(element.getAttribute("type")==="datetime-local"){
          formData[element.getAttribute("name")] = element.value.replace("T"," ")
        }else{
          formData[element.getAttribute("name")] = element.value
        }
      }
    })
    let fetchData = {
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    };
    console.log(fetchData)
    let status = await fetch("/admin/updateMovement/plane",fetchData);
    if(status.ok){
      document.getElementById('plane_failure').classList.add('invisible_component');
    }else{
      document.getElementById('plane_failure').classList.remove('invisible_component');
    }
  }else if(type==="warehouse"){
    let form = document.getElementById("warehouse_form")
    formData = {}
    form.querySelectorAll("input, select").forEach(element=>{
      if(element.getAttribute("name")){
        if(element.getAttribute("type")==="datetime-local"){
          formData[element.getAttribute("name")] = element.value.replace("T"," ")
        }else{
          formData[element.getAttribute("name")] = element.value
        }
      }
    })
    let fetchData = {
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    };
    console.log(fetchData)
    let status = await fetch("/admin/updateMovement/warehouse",fetchData);
    if(status.ok){
      document.getElementById('warehouse_failure').classList.add('invisible_component');
    }else{
      document.getElementById('warehouse_failure').classList.remove('invisible_component');
    }
  }
}

async function getReport(type){
  if(type==="payments"){
    let table_body = document.getElementById("payments_table_body")
    let fetchData = {
      method:"post"
    };
    let data = await fetch("/admin/reports/payments",fetchData);
    if(data.ok){
      let data_array = await data.json()
      if(data_array.length>0){
        table_body.innerHTML=""
        data_array.forEach(element => {
          table_body.innerHTML+= `
          <tr>
          <td><a href="/admin/packageInfo/`+element.Package_number+`">`+element.Package_number+`</a></td>
            <td>`+element.Payment+`</td>
          </tr>
          `
        });
      }else{
        table_body.innerHTML=`
        <tr>
            <td colspan="2">No results found</td>
        </tr>
        `
      }
    }
  }else if(type==="packagedates"){
    let table_body = document.getElementById("packagedates_table_body")
    let sendData = {
      Time1: document.getElementById("showpackage_time1").value.replace("T"," "),
      Time2: document.getElementById("showpackage_time2").value.replace("T"," ")
    }
    let fetchData = {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(sendData)
    };
    let data = await fetch("/admin/reports/packagedates",fetchData);
    if(data.ok){
      let data_array = await data.json()
      if(data_array.length>0){
        table_body.innerHTML=""
        data_array.forEach(element => {
          table_body.innerHTML+= `
          <tr>
            <td><a href="/admin/packageInfo/`+element.Package_number+`">`+element.Package_number+`</a></td>
            <td>`+element.Payment+`</td>
          </tr>
          `
        });
      }else{
        table_body.innerHTML=`
        <tr>
            <td colspan="2">No results found</td>
        </tr>
        `
      }
    }
  }else if(type==="packagetypes"){
    let table_body = document.getElementById("packagetypes_table_body")
    let sendData = {
      Time1: document.getElementById("packagetypes_time1").value.replace("T"," "),
      Time2: document.getElementById("packagetypes_time2").value.replace("T"," ")
    }
    let fetchData = {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(sendData)
    };
    let data = await fetch("/admin/reports/packagetypes",fetchData);
    if(data.ok){
      let data_array = await data.json()
      
      if(data_array.length>0){
        let entries = {
          regular:0,
          fragile:0,
          liquid:0,
          chemical:0
        }
        table_body.innerHTML=""
        data_array.forEach(element => {
          console.log(element.Category)
          entries[element.Category.toLowerCase()] = element.Count
        });
        table_body.innerHTML+= `
        <tr>
          <td>`+entries.regular+`</td>
          <td>`+entries.fragile+`</td>
          <td>`+entries.liquid+`</td>
          <td>`+entries.chemical+`</td>
        </tr>
        `
      }else{
        table_body.innerHTML=`
        <tr>
            <td colspan="4">No results found</td>
        </tr>
        `
      }
    }
  }else if(type==="packagetrack"){
    let table_body = document.getElementById("packagetrack_table_body")
    let sendData = {
      Category: document.getElementById("deliverytracking_category_input").value.toLowerCase(),
      Country: document.getElementById("deliverytracking_country_input").value,
      city: document.getElementById("deliverytracking_city_input").value,
      Status: document.getElementById("deliverytracking_status_input").value.toLowerCase()
    }
    let fetchData = {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(sendData)
    };
    let data = await fetch("/admin/reports/packagetrack",fetchData);
    if(data.ok){
      let data_array = await data.json()
      if(data_array.length>0){
        table_body.innerHTML=""
        data_array.forEach(element => {
          table_body.innerHTML+= `
          <tr>
            <td>`+element.Package_number+`</td>
            <td>`+element.destination+`</td>
            <td>`+element.Value+`</td>
            <td>`+element.Sender_SSN+`</td>
            <td>`+element.Receiver_SSN+`</td>
            <td>`+element.RC_ID+`</td>
            <td>`+element.Time+`</td>
          </tr>
          `
        });
      }else{
        table_body.innerHTML=`
        <tr>
            <td colspan="7">No results found</td>
        </tr>
        `
      }
    }
  }else if(type==="packagecustomer"){
    let table_body = document.getElementById("packagecustomer_table_body")
    let sendData = {
      SSN: document.getElementById("customerpackage_ssn_input").value
    }
    let fetchData = {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(sendData)
    };
    let data = await fetch("/admin/reports/packagecustomer",fetchData);
    if(data.ok){
      let data_array = await data.json()
      
      if(data_array.length>0){
        table_body.innerHTML=""
        data_array.forEach(element => {
          table_body.innerHTML+= `
          <tr>
            <td>`+element.Package_number+`</td>
            <td>`+element.destination+`</td>
            <td>`+element.Value+`</td>
            <td>`+element.Sender_SSN+`</td>
            <td>`+element.Receiver_SSN+`</td>
            <td>`+element.RC_ID+`</td>
            <td>`+element.Time+`</td>
          </tr>
          `
        });
      }else{
        table_body.innerHTML=`
        <tr>
            <td colspan="7">No results found</td>
        </tr>
        `
      }
    }
  }
}

async function update_userinfo(){
  let form = document.getElementById("profile_form")
  formData = {}
  form.querySelectorAll("input, select").forEach(element=>{
    if(element.getAttribute("name")){
      if(element.getAttribute("name")!="SSN" && element.getAttribute("name")!="Username"){
        formData[element.getAttribute("name")] = element.value
      }
    }
  })
  let fetchData = {
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
  };
  console.log(fetchData)
  let status = await fetch("/account",fetchData);
  if(status.ok){
    window.location.replace(status.url)
  }else{
    document.getElementById('userinfo_failure').classList.remove('invisible_component');
  }
  
}

function Package_payed(package_number,Customer_SSN){
 
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    
    
      if (this.readyState == 4 && this.status == 200) {
       
      
  }
  
  
}
xhttp.open("GET", "/pay/"+package_number);
xhttp.send();

  sentPackages(Customer_SSN)
  incomingPackages(Customer_SSN)
}



function TrackPackage(){
 
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    
    output= []
      if (this.readyState == 4 && this.status == 200) {

         document.getElementById('TrackContainer').style.display='none'
         document.getElementById('status').innerHTML='not found'
        document.getElementById('history').innerHTML=[]
        JSON.parse(this.responseText).forEach(package => {
          document.getElementById('status').innerHTML=package.Status
          if(package.type==='Plane'){
          document.getElementById('history').innerHTML= document.getElementById('history').innerHTML+
          `<div class="tracking-item">
          <div class="tracking-icon status-intransit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"  class="bi bi-airplane-engines black" viewBox="0 0 16 16">
          <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0ZM7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7V3Z"/>
              <path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
              ></path>
            </svg>
            <!-- <i class="fas fa-circle"></i> -->
          </div>
          <div class="tracking-date">
            ${(new Date(package.Time)).toLocaleString()}
          </div>
          <div class="tracking-content">
            Plane ${package.Registration_number}<span
              >in <strong>${package.type}</strong> from ${package.delivery_route}</span
            >
          </div>
        </div>`}


        else if(package.type==='Truck'){
          document.getElementById('history').innerHTML= document.getElementById('history').innerHTML+
          `<div class="tracking-item">
          <div class="tracking-icon status-intransit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-truck" viewBox="0 0 16 16">
          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>
            <!-- <i class="fas fa-circle"></i> -->
          </div>
          <div class="tracking-date">
            ${(new Date(package.Time)).toLocaleString()}
          </div>
          <div class="tracking-content">
            Truck <span>in <strong>${package.type}</strong> from ${package.delivery_route}</span>
          </div>
        </div>`}
        else if(package.type==='Airport'){
          document.getElementById('history').innerHTML= document.getElementById('history').innerHTML+
          `<div class="tracking-item">
          <div class="tracking-icon status-intransit">
            <img src='airport.png' width='30px'></img>
            <!-- <i class="fas fa-circle"></i> -->
          </div>
          <div class="tracking-date">
            ${(new Date(package.Time)).toLocaleString()}
          </div>
          <div class="tracking-content">
            Airport ${package.ICAO} <span>in <strong> ${package.city}, ${package.Country}</strong></span>
          </div>
        </div>`}
        else if(package.type==='Warehouse'){
          document.getElementById('history').innerHTML= document.getElementById('history').innerHTML+
          `<div class="tracking-item">
          <div class="tracking-icon status-intransit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-building-fill" viewBox="0 0 16 16">
          <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3Zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Z"/>
        </svg>
            <!-- <i class="fas fa-circle"></i> -->
          </div>
          <div class="tracking-date">
            ${(new Date(package.Time)).toLocaleString()}
          </div>
          <div class="tracking-content">
            Warehouse  <span>in <strong>${package.Street_address}, ${package.city}, ${package.Country}</strong></span>
          </div>
        </div>`}

          
        
        });
    

        document.getElementById('TrackContainer').style.display='block'
       
      }
  }
  var Package_number=document.getElementById('TrackPackageInput').value
  xhttp.open("GET", "/Track/"+Package_number);
  xhttp.send();


}
















































































































function sendEmail(email){
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  
 
    if (this.readyState == 4 && this.status == 200) {
    
    }
    
    
    
  }
  console.log('here')
  
  xhttp.open("POST", "/sendEmail");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({email}));
}