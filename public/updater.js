

var their_choice = prompt("What student do you want to edit?");
var attribute_to_edit = prompt("What attribute would you like to edit?");
var new_edit = prompt("What would you like to change " + attribute_to_edit + "to?");


var blah = new XMLHttpRequest;

blah.open("get", "http://localhost:4567/students/"+their_choice+"/edit");

blah.send();
blah.addEventListener("load", function(){
	r =JSON.parse(this.response);
	if(attribute_to_edit === "name"){
		r.name= new_edit;
	}
	else if (attribute_to_edit === "age"){
		r.age= new_edit;
	}
	else if (attribute_to_edit === "github"){
		r.github= new_edit;
	}
	else  {
		alert("That's not a valid option, dummy");
	}
	
})