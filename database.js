const db = require('better-sqlite3')('Database.db3');

var person_table="CREATE TABLE IF NOT EXISTS Person('SSN' VARCHAR(10) primary key,'Fname' VARCHAR(255) not null,'Lname' VARCHAR(255) not null,'Phone' VARCHAR(15) not null ,'Email' VARCHAR(15) not null,'Birth_Date' Date not null )"
var insertperson="INSERT INTO Person(SSN,Fname,Lname,Phone,Email,Birth_Date) Values (?,?,?,?,?,?) )"



var Customer_table="CREATE TABLE IF NOT EXISTS Customer('Customer_SSN' VARCHAR(10) primary key,'Country' VARCHAR(255) not null ,'city' VARCHAR(255) not null,'Street_address' VARCHAR(255) not null, FOREIGN KEY (Customer_SSN) REFERENCES person(SSN))"
var insertCustomer = "insert into Customer(Customer_SSN,Country,city,Street_address) values (?,?,?,?)"

var Sender_table="CREATE TABLE IF NOT EXISTS Sender('Sender_SSN' VARCHAR(10) primary key,FOREIGN KEY (Sender_SSN) REFERENCES Customer(Customer_SSN))"
var insertSender = "insert into Sender(Sender_SSN) values (?)"

var Receiver_table="CREATE TABLE IF NOT EXISTS Receiver('Receiver_SSN' VARCHAR(10) primary key,FOREIGN KEY (Receiver_SSN) REFERENCES Customer(Customer_SSN))"
var insertReceiver = "insert into Receiver(Receiver_SSN) values (?)"






var Company_Employee_table="CREATE TABLE IF NOT EXISTS Company_Employee('Employee_SSN' VARCHAR(10) primary key,'Role' VARCHAR(255) not null , FOREIGN KEY (Employee_SSN) REFERENCES person(SSN))"
var insertEmployee = "insert into Company_Employee(Employee_SSN,Role) values (?,?)"

var Customer_Account_table="CREATE TABLE IF NOT EXISTS Customer_Account('Username' VARCHAR(255) primary key,'Password' VARCHAR(255) not null,'Customer_SSN' VARCHAR(10) not null, FOREIGN KEY (Customer_SSN) REFERENCES Customer(Customer_SSN), UNIQUE(Customer_SSN))"
var insertUser = "insert into User(UserID,Username,Password) values (?,?,?)"

var Admin_Account_table="CREATE TABLE IF NOT EXISTS Admin_Account('Username' VARCHAR(255) primary key,'Password' VARCHAR(255) not null,'Employee_SSN' VARCHAR(10) not null, FOREIGN KEY (Employee_SSN) REFERENCES Employee(Employee_SSN), UNIQUE(Employee_SSN))"


var Retail_Centre_table="CREATE TABLE IF NOT EXISTS Retail_Centre('ID' INTEGER primary key AUTOINCREMENT,'Type' VARCHAR(255) not null,'Country' VARCHAR(255) not null ,'city' VARCHAR(255) not null,'Street_address' VARCHAR(255) not null)"
var insertRetail_Centre = "insert into Customer(Type,Country,city,Street_address) values (?,?,?,?)"


var Package_table="CREATE TABLE IF NOT EXISTS Package('Package_number' INTEGER primary key AUTOINCREMENT,'Category' VARCHAR(255) not null ,'Weight' INTEGER not null,'Width' INTEGER not null,'Height' INTEGER not null,'Length' INTEGER not null,'destination' VARCHAR(255) not null,'Value' INTEGER not null,'Status' VARCHAR(255) not null,'Final_delivery_Date' Date not null,'Sender_SSN' VARCHAR(10) not null,'Receiver_SSN' VARCHAR(10) not null,'RC_ID' INTEGER not null,'Time' datetime not null,Is_Paid INTEGER not null check (Is_Paid in (0,1)),FOREIGN KEY (Sender_SSN) REFERENCES Sender(Sender_SSN),FOREIGN KEY (Receiver_SSN) REFERENCES Receiver(Receiver_SSN),FOREIGN KEY (RC_ID) REFERENCES Retail_Centre(ID))"


var Vehicle = "CREATE TABLE IF NOT EXISTS Vehicle('Vehicle_ID' INTEGER primary key AUTOINCREMENT)"
var insertV = "INSERT INTO Vehicle() values ()"

//
var Locations = "CREATE TABLE IF NOT EXISTS Locations('Location_ID' INTEGER primary key AUTOINCREMENT)"

var Located_At_Table = "CREATE TABLE IF NOT EXISTS Located_At('Package_number' INTEGER NOT NULL,'Location_ID' INTEGER NOT NULL,'Time' datetime not null,FOREIGN KEY (Package_number) REFERENCES Package(Package_number),FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID),Primary key(Location_ID,Package_number))"

var Trucks_table = "CREATE TABLE Trucks('VIN' VARCHAR(17) PRIMARY KEY ,'Location_ID' Integer not null,Vehicle_ID INTEGER NOT NULL,FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID),FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID))"

var Planes_table = "CREATE TABLE Planes('Registration_number' VARCHAR(10) PRIMARY KEY ,'Location_ID' Integer not null,Vehicle_ID INTEGER NOT NULL,FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID),FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID))"


var Airports_table = "CREATE TABLE Airports('Registration_number' VARCHAR(10) PRIMARY KEY ,'Location_ID' Integer not null,'Country' VARCHAR(255) not null ,'city' VARCHAR(255) not null,FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID))"

var Warehouses_table = "CREATE TABLE Warehouses('Country' VARCHAR(255) not null ,'city' VARCHAR(255) not null,'Street_address' VARCHAR(255) not null,'Location_ID' Integer not null,FOREIGN KEY (Location_ID) REFERENCES Locations(Location_ID),primary key(Country,City,Street_Address))"

var Transportation_event_table  = "CREATE TABLE Transportation_event('Schedule_number' INTEGER primary key autoincrement,'Type' Varchar(255) not null,'delivery_route' Varchar(255) not null,Vehicle_ID INTEGER NOT NULL,FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID))"

var Shipped_By = "CREATE TABLE Shipped_By('Package_number' Integer not null,'Schedule_number' Integer not null,primary key(Package_number,Schedule_number),FOREIGN KEY (Package_number) REFERENCES Package(Package_number),FOREIGN KEY (Schedule_number) REFERENCES Transportation_event(Schedule_number))"


var init_Array =[person_table,Customer_table,Company_Employee_table,Customer_Account_table,Admin_Account_table,Sender_table,Receiver_table,Retail_Centre_table,Package_table,Locations,Vehicle,Located_At_Table,Trucks_table,Planes_table,Airports_table,Warehouses_table,Transportation_event_table,Shipped_By]

try{
    init_Array.forEach((table)=>{
        db.exec(table)

    })
}
catch(error){
    console.log(error)
}