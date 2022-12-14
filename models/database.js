const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.resolve(__dirname,'Database.db3'),{verbose:console.log,fileMustExist:true});


var person_table="CREATE TABLE IF NOT EXISTS Person('SSN' VARCHAR(10) primary key,'Fname' VARCHAR(255) not null,'Lname' VARCHAR(255) not null,'Phone' VARCHAR(15) not null ,'Email' VARCHAR(15) not null,'Birth_Date' Date not null )"
var insertperson="INSERT INTO Person(SSN,Fname,Lname,Phone,Email,Birth_Date) Values (?,?,?,?,?,?)"



var Customer_table="CREATE TABLE IF NOT EXISTS Customer('Customer_SSN' VARCHAR(10) primary key,'Country' VARCHAR(255) not null ,'city' VARCHAR(255) not null,'Street_address' VARCHAR(255) not null, FOREIGN KEY (Customer_SSN) REFERENCES person(SSN))"
var insertCustomer = "insert into Customer(Customer_SSN,Country,city,Street_address) values (?,?,?,?)"

var Sender_table="CREATE TABLE IF NOT EXISTS Sender('Sender_SSN' VARCHAR(10) primary key,FOREIGN KEY (Sender_SSN) REFERENCES Customer(Customer_SSN))"
var insertSender = "insert into Sender(Sender_SSN) values (?)"

var Receiver_table="CREATE TABLE IF NOT EXISTS Receiver('Receiver_SSN' VARCHAR(10) primary key,FOREIGN KEY (Receiver_SSN) REFERENCES Customer(Customer_SSN))"
var insertReceiver = "insert into Receiver(Receiver_SSN) values (?)"






var Company_Employee_table="CREATE TABLE IF NOT EXISTS Company_Employee('Employee_SSN' VARCHAR(10) primary key,'Role' VARCHAR(255) not null , FOREIGN KEY (Employee_SSN) REFERENCES person(SSN))"
var insertEmployee = "insert into Company_Employee(Employee_SSN,Role) values (?,?)"

var Customer_Account_table="CREATE TABLE IF NOT EXISTS Customer_Account('Username' VARCHAR(255) primary key,'Password' VARCHAR(255) not null,'Customer_SSN' VARCHAR(10) not null, FOREIGN KEY (Customer_SSN) REFERENCES Customer(Customer_SSN), UNIQUE(Customer_SSN))"
var insertUser = "insert into Customer_Account(username,Password,Customer_SSN) values (?,?,?)"

var Admin_Account_table="CREATE TABLE IF NOT EXISTS Admin_Account('Username' VARCHAR(255) primary key,'Password' VARCHAR(255) not null,'Employee_SSN' VARCHAR(10) not null, FOREIGN KEY (Employee_SSN) REFERENCES Company_Employee(Employee_SSN), UNIQUE(Employee_SSN))"
var insertAdmin = "insert into Admin_Account(username,Password,Employee_SSN) values (?,?,?)"


var Retail_Centre_table="CREATE TABLE IF NOT EXISTS Retail_Centre('ID' INTEGER primary key AUTOINCREMENT,'Type' VARCHAR(255) not null,'Country' VARCHAR(255) not null ,'city' VARCHAR(255) not null,'Street_address' VARCHAR(255) not null)"
var insertRetail_Centre = "insert into Retail_Centre(Type,Country,city,Street_address) values (?,?,?,?)"


var Package_table="CREATE TABLE  Package('Package_number' INTEGER primary key AUTOINCREMENT,'Category' VARCHAR(255) not null ,'Weight' INTEGER not null,'Width' INTEGER not null,'Height' INTEGER not null,'Length' INTEGER not null,'destination' VARCHAR(255) not null,'Value' INTEGER not null,'Status' VARCHAR(255) not null,'Final_delivery_Date' Date not null,'Sender_SSN' VARCHAR(10) not null,'Receiver_SSN' VARCHAR(10) not null,'RC_ID' INTEGER not null,'Time' datetime not null,'Is_Paid' INTEGER not null check (Is_Paid in (0,1)))"
var insertPackage = "INSERT INTO Package(Category,Weight,Width,Height,Length,destination,Value,Status,Final_delivery_Date,Sender_SSN,Receiver_SSN,RC_ID,Time,Is_Paid) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

var Vehicle = "CREATE TABLE IF NOT EXISTS Vehicle('Vehicle_ID' INTEGER primary key AUTOINCREMENT)"
var insertV = "INSERT INTO Vehicle DEFAULT values"

//
var Locations = "CREATE TABLE IF NOT EXISTS Locations('Location_ID' INTEGER primary key AUTOINCREMENT)"
var insertLocation = "INSERT INTO Locations DEFAULT values"

var Located_At_Table = "CREATE TABLE IF NOT EXISTS Located_At('Package_number' INTEGER NOT NULL,'Location_ID' INTEGER NOT NULL,'Time' datetime not null,FOREIGN KEY (Package_number) REFERENCES Package(Package_number),FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID),Primary key(Location_ID,Package_number))"
var insert_Located_At =  "INSERT INTO Located_At(Package_number,Location_ID,Time) VALUES (?,?,?)"

var Trucks_table = "CREATE TABLE Trucks('VIN' VARCHAR(17) PRIMARY KEY ,'Location_ID' Integer not null,Vehicle_ID INTEGER NOT NULL,FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID),FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID))"
var insert_trucks = "INSERT INTO Trucks(VIN,Location_ID,Vehicle_ID) values (?,?,?)"

var Planes_table = "CREATE TABLE Planes('Registration_number' VARCHAR(10) PRIMARY KEY ,'Location_ID' Integer not null,Vehicle_ID INTEGER NOT NULL,FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID),FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID))"
var insert_plan = "INSERT INTO Planes(Registration_number,Location_ID,Vehicle_ID) values (?,?,?)"


var Airports_table = "CREATE TABLE Airports('ICAO' VARCHAR(10) PRIMARY KEY ,'Location_ID' Integer not null,'Country' VARCHAR(255) not null ,'city' VARCHAR(255) not null,FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID))"
var insert_Airport = "INSERT INTO Airports(ICAO,Location_ID,Country,city) values (?,?,?,?)"

var Warehouses_table = "CREATE TABLE Warehouses('Country' VARCHAR(255) not null ,'city' VARCHAR(255) not null,'Street_address' VARCHAR(255) not null,'Location_ID' Integer not null,FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID),primary key(Country,City,Street_Address))"
var insert_Warehouse = "INSERT INTO Warehouses(Country,city,Street_address,Location_ID) values (?,?,?,?)"
var Transportation_event_table  = "CREATE TABLE Transportation_event('Schedule_number' INTEGER primary key autoincrement,'Type' Varchar(255) not null,'delivery_route' Varchar(255) not null,Vehicle_ID INTEGER NOT NULL,FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID))"
var insert_Transportation_event  =  "INSERT INTO Transportation_event(Type,delivery_route,Vehicle_ID) Values (?,?,?)"


var Shipped_By = "CREATE TABLE Shipped_By('Package_number' Integer not null,'Schedule_number' Integer not null,primary key(Package_number,Schedule_number),FOREIGN KEY (Package_number) REFERENCES Package(Package_number),FOREIGN KEY (Schedule_number) REFERENCES Transportation_event(Schedule_number))"
var insert_Shipped_By = "INSERT INTO Shipped_By(Package_number,Schedule_number) values (?,?)"


var init_Array =[person_table,Customer_table,Company_Employee_table,Customer_Account_table,Admin_Account_table,Sender_table,Receiver_table,Retail_Centre_table,Package_table,Locations,Vehicle,Located_At_Table,Trucks_table,Planes_table,Airports_table,Warehouses_table,Transportation_event_table,Shipped_By]

try{

    /*
    var vehicleID=  db.prepare(insertV).run()
    var locationID=  db.prepare(insertLocation).run()

    db.prepare(insert_trucks).run(["xxx1",locationID.lastInsertRowid,vehicleID.lastInsertRowid])
    
    var vehicleID=  db.prepare(insertV).run()
    var locationID=  db.prepare(insertLocation).run()

    db.prepare(insert_plan).run(['1111',locationID.lastInsertRowid,vehicleID])
    var locationID=  db.prepare(insertLocation).run()
db.prepare(insert_Airport).run(["XYA81",locationID.lastInsertRowid,"saudi",'madinh'])
var locationID=  db.prepare(insertLocation).run()
db.prepare(insert_Warehouse).run(["saudi","makkah",'12032',locationID.lastInsertRowid])

db.prepare(insert_Located_At).run([1,3,'2022-12-12 09:51:51'])

db.prepare(insert_Transportation_event).run(['plane','dammam to madinh',2])
db.prepare(insert_Shipped_By).run([1,1])
   /*
   db.exec('delete from Trucks')
   db.exec('delete from Locations')
   db.exec('delete from Vehicle')*/

 /*
 db.prepare("INSERT INTO Package(Category,Weight,Width,Height,Length,destination,Value,Status,Final_delivery_Date,Sender_SSN,Receiver_SSN,RC_ID,Time,Is_Paid) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)").run(["chemical",19.2,12,15,12,'makkah',130,'delivered','2022-12-13','1','3',1,'2021-1-1 11:12:13',1])
*/
/*db.prepare('INSERT INTO Sender(Sender_SSN) values (?)').run(['3'])
db.prepare('INSERT INTO Receiver(Receiver_SSN) values (?)').run(['1'])
  */
   

}
catch(error){
    console.log(error)
}