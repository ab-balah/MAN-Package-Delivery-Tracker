const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.resolve(__dirname, "Database.db3"), {
  verbose: console.log,
  fileMustExist: true,
});

function getUserRole(username) {
  let statement1 = db.prepare(
    "SELECT Username FROM Admin_Account WHERE Username = ?;"
  );
  let result1 = statement1.get(username);
  if (result1 != undefined) {
    return 100;
  }
  let statement2 = db.prepare(
    "SELECT Username FROM Customer_Account WHERE Username = ?;"
  );
  let result2 = statement2.get(username);
  if (result2 != undefined) {
    return 50;
  }
  return undefined;
}

function getUserPassword(username) {
  let statement1 = db.prepare(
    "SELECT Password FROM Admin_Account WHERE Username = ?;"
  );
  let result1 = statement1.get(username);
  if (result1 != undefined) {
    return result1;
  }
  let statement2 = db.prepare(
    "SELECT Password FROM Customer_Account WHERE Username = ?;"
  );
  let result2 = statement2.get(username);
  if (result2 != undefined) {
    return result2;
  }
  return undefined;
}

function addNewAccount(data) {
  try{
    //Add the information to Person
    let add_person_statement = db.prepare(
      "INSERT INTO Person(SSN, Fname, Lname, Phone, Email, Birth_Date) VALUES(?, ?, ?, ?, ?, ?);"
    );
    let add_person_result = add_person_statement.run(
      data.SSN,
      data.Fname,
      data.Lname,
      data.Phone,
      data.Email,
      data.Birth_Date
    );
    
    //Add the information to Customer
    let add_customer_statement = db.prepare(
      "INSERT INTO Customer(Customer_SSN, Country, city, Street_address) VALUES(?, ?, ?, ?);"
    );
    let add_customer_result = add_customer_statement.run(
      data.SSN,
      data.Country,
      data.city,
      data.Street_address
    );
    //Add the account to Customer_Account
    let add_account_statement = db.prepare(
      "INSERT INTO Customer_Account(Username, Password, Customer_SSN) VALUES(?, ?, ?);"
    );
    let add_account_result = add_account_statement.run(
      data.Username,
      data.Password,
      data.SSN
    );
  }catch(e){
    throw(e)
  }
}

function getUserSSN(username){
  let statement1 = db.prepare(
    "SELECT Employee_SSN FROM Admin_Account WHERE Username = ?;"
  );
  let result1 = statement1.get(username);
  if (result1 != undefined) {
    return result1;
  }
  let statement2 = db.prepare(
    "SELECT Customer_SSN FROM Customer_Account WHERE Username = ?;"
  );
  let result2 = statement2.get(username);
  if (result2 != undefined) {
    return result2;
  }
  return undefined;
}

function addPackage(data){
    let add_package_statement = db.prepare('INSERT INTO Package(Package_number, Category, Weight, Width, Height, Length, destination, Value, Status, Final_delivery_Date, Sender_SSN, Receiver_SSN, RC_ID, Time, Is_Paid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);')
    let add_package_result = add_package_statement.run(data.Package_number, data.Category, data.Weight, data.Width, data.Height, data.Length, data.destination, data.Value, data.Status, data.Final_delivery_Date, data.Sender_SSN, data.Receiver_SSN, data.RC_ID, data.Time, data.Is_Paid)
    if(result.changes==1){
        return true;
    }else{
        return false;
    }
}






function addPackage(data) {
  let add_package_statement = db.prepare(
    "INSERT INTO Person(Package_number, Category, Weight, Width, Height, Length, destination, Value, Status, Final_delivery_Date, Sender_SSN, Receiver_SSN, RC_ID, Time, Is_Paid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
  );
  let add_package_result = add_package_statement.run(
    data.Package_number,
    data.Category,
    data.Weight,
    data.Width,
    data.Height,
    data.Length,
    data.destination,
    data.Value,
    data.Status,
    data.Final_delivery_Date,
    data.Sender_SSN,
    data.Receiver_SSN,
    data.RC_ID,
    data.Time,
    data.Is_Paid
  );
  if (result.changes == 1) {
    return true;
  } else {
    return false;
  }
}

function getPackagesInfo(){
    var packages = db.prepare('select * from Package').all()
    return packages

}

function getSenderPackages(CustomerSSN){
    var packages= db.prepare(`
    select distinct p.Package_number,p.Width,p.Weight,p.destination,p.value,per.Fname || ' '|| per.Lname AS sender,per1.Fname || ' '|| per1.Lname AS Reciver,p.RC_ID,p.Time,p.Status,p.Is_paid
    from Package p,Customer c,Sender s,Receiver r,Customer c1,person per,person per1
    where p.Sender_SSN = s.Sender_SSN AND p.Receiver_SSN = r.Receiver_SSN 
    and c.Customer_SSN = s.Sender_SSN and c1.Customer_SSN =  r.Receiver_SSN  and C.Customer_SSN=per.SSN and C1.Customer_SSN = per1.SSN
    and p.Sender_SSN = ?
    order by p.Status
    `).all([CustomerSSN])

    return packages


}



function getIncomingPackages(CustomerSSN){
    var packages= db.prepare(`
    select distinct p.Package_number,p.Width,p.Weight,p.destination,p.value,per.Fname || ' '|| per.Lname AS sender,per1.Fname || ' '|| per1.Lname AS Reciver,p.RC_ID,p.Time,p.Status,p.Is_paid
    from Package p,Customer c,Sender s,Receiver r,Customer c1,person per,person per1
    where p.Sender_SSN = s.Sender_SSN AND p.Receiver_SSN = r.Receiver_SSN 
    and c.Customer_SSN = s.Sender_SSN and c1.Customer_SSN =  r.Receiver_SSN  and C.Customer_SSN=per.SSN and C1.Customer_SSN = per1.SSN
    and p.Receiver_SSN = ?
    order by p.Status
    `).all([CustomerSSN])


    return packages


}


function updatePay(package_number){
  db.prepare('update Package set Is_Paid=? where Package_number  ='+package_number).run(1)


}
function TrackPackage(package_number){
  var x = db.prepare(`
    SELECT  T.*,L.*,Ta.*,'Truck' AS type
    from Located_At L,Trucks T,Package Pa , Transportation_event Ta
    where L.Package_number=?  and L.Location_ID=T.Location_ID and
    L.Package_number=Pa.Package_number and T.Vehicle_ID=Ta.Vehicle_ID `).all([package_number])
    
    var y = db.prepare(`
    SELECT  L.*,P.*,T.*,'Plane' AS type,Pa.Status
    from Located_At L,Planes P,Package Pa,Transportation_event T
    where L.Package_number=?  and L.Location_ID=P.Location_ID and
    L.Package_number=Pa.Package_number  and T.Vehicle_ID=P.Vehicle_ID
    
    ;`).all([package_number])


    var z = db.prepare(`
    SELECT  W.*,L.*,'Warehouse' AS type,Pa.Status
    from Located_At L,Warehouses W,Package Pa
    where L.Package_number=?  and L.Location_ID=W.Location_ID and
    L.Package_number=Pa.Package_number ;`).all([package_number])
    
    var w = db.prepare(`
    SELECT  A.*,L.*,'Airport' AS type,Pa.Status
    from Located_At L,Airports A,Package Pa
    where L.Package_number=?  and L.Location_ID=A.Location_ID and
    L.Package_number=Pa.Package_number ;`).all([package_number])

    

  var history = x.concat(y,z,w).sort((a,b)=>{ return Date.parse(a.Time)-Date.parse(b.Time)})
  console.log(history)
  return  history
}





module.exports = {getUserSSN,TrackPackage,getUserRole, getUserPassword, addNewAccount, addPackage,  getPackagesInfo,getSenderPackages,getIncomingPackages,updatePay}



