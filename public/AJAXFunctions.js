


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
      ${!package.Is_Paid?'<td><button class="btn btn-outline-secondary">pay</button></td>': '<td><button class="btn btn-outline-secondary" disabled>paid</button></td>'}
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
    ${!package.Is_Paid?'<td><button class="btn btn-outline-secondary">pay</button></td>': '<td><button class="btn btn-outline-secondary" disabled>paid</button></td>'}
    </tr>`
        
        });
    

       
      }
  }
  xhttp.open("GET", "/user/sentPackages/"+Customer_SSN);
  xhttp.send();


}