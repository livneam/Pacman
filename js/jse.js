	var users=[];
	var currentUser;
	var keyDown;
	var time;
	
	$(document).ready(function(){

		$(".divClass").hide();
		$("#welcome").show();
		var testuser=["a","a","test2017"];
		users.push(testuser);
	});		


	function navToLogin ()
	{
		$(".divClass").hide();
		$("#login").show();
		stopAll();
		
	}
	function navToRegister ()
	{
		$(".divClass").hide();
		$("#subscription").show();
		stopAll();
		
	}
	function navToWelcome ()
	{
		$(".divClass").hide();
		$("#welcome").show();
		stopAll();
	}
	function navToAbout ()
	{
		document.getElementById("about").showModal(); 
		
	}
	function closeAbout() 
	{ 
		document.getElementById("about").close(); 
	}

	function config()
	{
		/*$("#subscription").hide();*/

		$(".divClass").hide();
		$("#config").show();

		
	}
	function updateTextInput(val) {
		time=val*1.2+60;
		var seconds=time;
		var minute=0;
		for(var i=0; i<5; i++){
			if ((seconds-60)>=0){
				seconds=seconds-60;
				minute=minute+1;
			}
		}
		seconds=Math.round(seconds )
		var temp=minute+":"+seconds+" (min:sec)";
		document.getElementById("timeText").innerHTML = temp;
	}

	function updateBallInput(value) {
		
		document.getElementById("ballText").innerHTML = value;
	}

	
	function StartNewGame() 
	{
		lblUser.value = currentUser;

		$(".divClass").hide();		
		$("#game").show();
		
		document.getElementById('myaudio').src = "sounds/song.mp3";
		document.getElementById('myaudio').play();
		drawBoard();
		/*document.getElementById("MonsterComboBox").innerHTML = value;*/

		/*var monster= document.getElementById("MonsterComboBox");		
		var monsterVal = monster.options[monster.selectedIndex].text;*/
		var e = document.getElementById("ddlViewBy");
		var Mon = e.options[e.selectedIndex].value;
		/*window.alert("#Mon:" + Mon );*/

		Start(Mon);
	}

	function stopAll(){
		
		massageBox.value = '';
		document.getElementById('myaudio').pause();
		window.clearInterval(interval);
		canvas.width=canvas.width;

	}

	function restartGame(){
		stopAll();
		StartNewGame();

	}

	function exitGame(){
		stopAll();		
		$("#game").hide();
		$("#config").show();


	}

	function login()
	{
		var username=document.getElementById("userNameEnteredLogin").value;
		var userpassword=document.getElementById("passwordEntered").value;
		var index=-1;
		for (var i = 0; i < users.length; i++) {
			if (username.localeCompare(users[i][0])==0){
				index=i;
			}
		}
		if (index==-1){
			alert("user name not found. please register");
		}
		else{
			if(userpassword.localeCompare(users[index][1])==0){
				currentUser = username;
				config();
			}
			else{
				alert("The password you have entered does not match");
			}
		}
		document.getElementById("userNameEnteredLogin").value='';
		document.getElementById("passwordEntered").value='';
	}
	function submitForm ()
	{	
		
		var username = document.forms["regForm"]["userName1"].value;
		var passw=document.forms["regForm"]["password1"].value;
		var passw2=document.forms["regForm"]["password2"].value;
		var firstname=document.forms["regForm"]["firstName"].value;
		var lastname=document.forms["regForm"]["lastName"].value;
		var mail=document.forms["regForm"]["email"].value;
		var bday=document.forms["regForm"]["birthday"].value;

		var pwc=/^(?=.*\d)(?=.*[A-Za-z]).{8,20}$/; 
		atpos = mail.indexOf("@");
		dotpos = mail.lastIndexOf(".");
		var alphaExp = /[0-9]/;

		if (username==null || username=="" ||passw==null || passw=="" || passw2==null || passw2=="" 
			||firstname==null || firstname=="" ||lastname==null || lastname=="" ||mail==null || mail=="" ||
			bday==null || bday=="" ){
			alert("all fields must be filled out");
	}
	else if (passw!=passw2){
		alert("re-password error");
	}
	else if (passw.length<8){
		alert("password must contains 8 characters");
	}
	else if(!passw.match(pwc)){
		alert("password contains chars and digits");
	}
	else if (atpos < 1 || ( dotpos - atpos < 2 )){
		alert("e-mail error, email must contains @");
	}
	else if (firstname.match(alphaExp)){
		alert("first name can only contain character");
	}
	else if (lastname.match(alphaExp)) {
		alert("last name can only contain character");
	}
	else if (containsObject(username,users)){
		alert("username already exist");
	}
	else {
		var newUser=[username,passw,firstname];
		users.push(newUser);
		alert("Congrats! You have just signed in to our DB");
		currentUser = username;		
		config();
	}

}

function test()
{
	var username = document.forms["regForm"]["userName1"].value;
	var passw=document.forms["regForm"]["password1"].value;
	var newUser=[username,passw];
	users.push(newUser);
	alert("Congrats! You have just signed in to our DB");
	config();
}
function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i][0] === obj) {
			return true;
		}
	}
	return false;
}



