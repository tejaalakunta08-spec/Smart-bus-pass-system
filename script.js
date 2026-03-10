function getUsers(){
return JSON.parse(localStorage.getItem("users")||"[]")
}

function saveUsers(u){
localStorage.setItem("users",JSON.stringify(u))
}

function getPasses(){
return JSON.parse(localStorage.getItem("passes")||"[]")
}

function savePasses(p){
localStorage.setItem("passes",JSON.stringify(p))
}

let users=getUsers()

if(users.length===0){
users.push({username:"admin",password:"admin",role:"admin"})
saveUsers(users)
}

function register(){

let u=document.getElementById("regUser").value
let p=document.getElementById("regPass").value

if(!u||!p){
alert("Fill details")
return
}

let users=getUsers()

users.push({username:u,password:p,role:"student"})

saveUsers(users)

alert("Registered Successfully")

document.getElementById("registerSection").style.display="none"
document.getElementById("loginSection").style.display="block"

}

function showRegister(){
document.getElementById("loginSection").style.display="none"
document.getElementById("registerSection").style.display="block"
}

let currentUser=null

function login(){

let u=document.getElementById("loginUser").value
let p=document.getElementById("loginPass").value

let user=getUsers().find(x=>x.username===u && x.password===p)

if(!user){
alert("Invalid Login")
return
}

currentUser=user

document.getElementById("loginSection").style.display="none"
document.getElementById("dashboard").style.display="block"

if(user.role==="admin"){
document.getElementById("adminBtn").style.display="block"
}

}

function logout(){
location.reload()
}

function showSection(id){

document.querySelectorAll(".section").forEach(s=>s.style.display="none")

document.getElementById(id).style.display="block"

if(id==="location") loadMap()

if(id==="admin") startScanner()

}

function createPass(){

let nameVal=document.getElementById("name").value
let rollVal=document.getElementById("roll").value
let routeVal=document.getElementById("route").value
let fareVal=document.getElementById("fare").value
let file=document.getElementById("photo").files[0]

if(!nameVal||!rollVal||!routeVal||!fareVal||!file){
alert("Fill all fields including photo")
return
}

let reader=new FileReader()

reader.onload=function(){

let id="BP"+Date.now()

let issue=new Date()
let expiry=new Date()
expiry.setDate(issue.getDate()+30)

let pass={
id:id,
name:nameVal,
roll:rollVal,
route:routeVal,
fare:fareVal,
expiry:expiry.toISOString().split("T")[0],
photo:reader.result
}

let passes=getPasses()
passes.push(pass)
savePasses(passes)

alert("Pass Generated: "+id)

fetchPassById(id)

}

reader.readAsDataURL(file)

}

function fetchPass(){

let id=document.getElementById("searchID").value
fetchPassById(id)

}

function fetchPassById(id){

let pass=getPasses().find(p=>p.id===id)

if(!pass){
alert("Pass not found")
return
}

document.getElementById("result").innerHTML=`

<div class="pass" id="passCard">

<img src="${pass.photo}" width="100"><br>

<b>ID:</b> ${pass.id}<br>
<b>Name:</b> ${pass.name}<br>
<b>Roll:</b> ${pass.roll}<br>
<b>Route:</b> ${pass.route}<br>
<b>Fare:</b> ₹${pass.fare}<br>
<b>Expiry:</b> ${pass.expiry}

<div id="qr"></div>

<button onclick="printPass()">Print</button>
<button onclick="downloadPDF()">PDF</button>

</div>

`

new QRCode(document.getElementById("qr"),pass.id)

}

function showAllPasses(){

let passes=getPasses()

let html=""

passes.forEach(p=>{
html+=`<div>${p.id} - ${p.name}</div>`
})

document.getElementById("allPasses").innerHTML=html

}

function printPass(){

let content=document.getElementById("passCard").innerHTML

let win=window.open()

win.document.write(content)

win.print()

}

function downloadPDF(){
html2pdf().from(document.getElementById("passCard")).save("BusPass.pdf")
}

let mapLoaded=false

function loadMap(){

if(mapLoaded) return

mapLoaded=true

let map=L.map('map').setView([17.385044,78.486671],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let bus=L.marker([17.385044,78.486671]).addTo(map)

let lat=17.385044
let lng=78.486671

setInterval(()=>{

lat+=0.001
lng+=0.001

bus.setLatLng([lat,lng])

},2000)

}