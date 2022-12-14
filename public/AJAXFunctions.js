
console.log(document.getElementById("signup_form").querySelectorAll("input, select"))

function incomingPackages(Customer_SSN){
   
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      
     
        if (this.readyState == 4 && this.status == 200) {
           
          document.getElementById('incoming').innerHTML=[]
        
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
    }

    xhttp.open("GET", "/user/incomingPackages/"+Customer_SSN);
    xhttp.send();


}




function sentPackages(Customer_SSN){
 
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    
    output= []
      if (this.readyState == 4 && this.status == 200) {
         
        document.getElementById('sent').innerHTML=[]
        
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
        
        });
    

       
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
  console.log(status)
  if(status.ok){
    if(status.body){
      window.location.replace(window.location.hostname+"/login")
    }else{
      document.getElementById('signup_failure').classList.remove('invisible_component')
    }
  }else{
    document.getElementById('signup_failure').classList.remove('invisible_component');
  }
  console.log("here")
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
            <svg
              class="svg-inline--fa fa-circle fa-w-16"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
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
            <svg
              class="svg-inline--fa fa-circle fa-w-16"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
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
            Truck <span>in <strong>${package.type}</strong> from ${package.delivery_route}</span>
          </div>
        </div>`}
        else if(package.type==='Airport'){
          document.getElementById('history').innerHTML= document.getElementById('history').innerHTML+
          `<div class="tracking-item">
          <div class="tracking-icon status-intransit">
            <svg
              class="svg-inline--fa fa-circle fa-w-16"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
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
            Airport ${package.ICAO} <span>in <strong> ${package.city}, ${package.Country}</strong></span>
          </div>
        </div>`}
        else if(package.type==='Warehouse'){
          document.getElementById('history').innerHTML= document.getElementById('history').innerHTML+
          `<div class="tracking-item">
          <div class="tracking-icon status-intransit">
            <svg
              class="svg-inline--fa fa-circle fa-w-16"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
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