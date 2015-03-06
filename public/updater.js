// updater.js takes the students.db data, displays it to the user,
// and then gives the client user three options for altering the database: 
// edit, add, or delete a database row. 
// ######################################################################
// ######################################################################

// The three anchor (link) id's are listened to. Upon a users "click",
// one of the following threee events will occur:  
document.getElementById("edit").addEventListener('click', edit_prompt)
document.getElementById("add").addEventListener('click', add_prompt)
document.getElementById("delete").addEventListener('click', delete_prompt)
setInterval(function () {document.getElementById("updater").innerHTML = this.location.reload();}, 10000);


// The edit_prompt fuction takes the event occurrence as the argument.
// When the event occurs, the prompts are displayed to the user: 
function edit_prompt(event) {
  their_choice = prompt("What student do you want to edit (enter the id#)?");
  attribute_to_edit = prompt("What attribute would you like to edit?");
  new_edit = prompt("What would you like to change " + attribute_to_edit + " to?");
  set_edit_params();
}

// The add_prompt fuction takes the event occurrence as the argument.
// When the event occurs, the prompts are displayed to the user.
// 
function add_prompt(event) {
  new_name = prompt("What's the new student's name?");
  new_age  = prompt("What's the new student's age?");
  new_github = prompt("What's the new student's github?");
  create_object = {"name":new_name, "age":new_age, "github":new_github};
  sendData(create_object);
}

// The delete_prompt fuction takes the event occurrence as the argument.
// When the event occurs, the prompts are displayed to the user: 
function delete_prompt(event) {
  delete_id = prompt("Select ID of student you wish to delete.");
  delete_object = {"id":delete_id};
  sendData(delete_object);
}

function sendData(data) {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  // We turn the data object into an array of URL encoded key value pairs.
  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  // We combine the pairs into a single string and replace all encoded spaces to 
  // the plus character to match the behaviour of the web browser form submit.
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  // We define what will happen if the data is successfully sent
  XHR.addEventListener('load', function(event) {
    alert('Yeah! Data sent and response loaded.');
  });

  // We define what will happen in case of error
  XHR.addEventListener('error', function(event) {
    alert('Oups! Something goes wrong.');
  });

  // We setup our request
  XHR.open('POST', "http://localhost:4567/students/edited");

  // We add the required HTTP header to handle a form data POST request
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 
  // And finally, We send our data.
  XHR.send(urlEncodedData);
}

function set_edit_params() {
  blah = new XMLHttpRequest;
  blah.open("post", "http://localhost:4567/students/"+their_choice+"/edit");
  blah.send();
  blah.addEventListener("load", function(event){
	  r =JSON.parse(this.response);
	  if(attribute_to_edit === "name"){
		  r.name = new_edit;
	  }
	  else if (attribute_to_edit === "age"){
		  r.age = new_edit;
	  }
	  else if (attribute_to_edit === "github"){
		  r.github = new_edit;
	  }
	  else  {
		  alert("That's not a valid option, dummy");
	  }
	  sendData(r);
  
  })
}


