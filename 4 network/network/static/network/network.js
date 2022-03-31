//create function that picks out the edit button

function edit(postid, content) {
	//SEND INFO TO SERVER TO UPDATE POST CONTENT
	fetch(`/edit/${postid}/${content}`)
	.then(response => response.json())
	.then(data => console.log(data));

}

function like(postid) {
	//SEND INFO TO SERVER TO UPDATE LIKECOUNT
	fetch(`/like/${postid}`)
	.then(response => response.json())
	.then(data => console.log(data));

}


document.addEventListener('DOMContentLoaded', () => {

	//select all Edit buttons
 	document.querySelectorAll('.editlink').forEach(button => {
 		button.onclick = () => {
 			//hide the edit button that was clicked
 			button.style.display = "none";

 			//find the parent and child elements to access needed element
 			editform = button.parentElement.parentElement;
 			postcontent = editform.parentElement.childNodes[2];
 			postid = postcontent.dataset.postid;
 			child = postcontent.childNodes[1];
 			text = child.innerHTML;

 			//create new text-area element to replace innerHTML of div
 			textarea = document.createElement("TEXTAREA");
 			textarea.setAttribute("wrap", "soft");
  			textarea.setAttribute("rows", "3");
  			textarea.setAttribute("cols", "60");
  			textarea.setAttribute("autofocus", "autofocus");

  			//create a text node to populate the text area with
  			edittext = document.createTextNode(text);
  			textarea.appendChild(edittext);

  			//create submit button for text area and assign an onclick
  			changebutton = document.createElement("INPUT");
  			changebutton.setAttribute("type", "submit");
  			changebutton.setAttribute("value", "Change");
  			changebutton.setAttribute("class", "btn btn-light btn-sm");
  			changebutton.setAttribute("style", "font-size: 12px; padding: 5px;");
  			changebutton.setAttribute("value", "Change");
  			changebutton.onclick = function(){
  				//get text
  				text = textarea.value;
  				newtext = document.createElement('a');
  				newtext.text = text;

  				//make edit button visible again after edit submitted
  				button.style.display = "block";
  				//replace the textarea with just text
  				postcontent.replaceChild(newtext, textarea);
  				postcontent.removeChild(changebutton);

  				//send this info to server
				edit(postid, text);
  			};
 			postcontent.replaceChild(textarea,child);
 			postcontent.appendChild(changebutton)
 			
 		 }

 	});

 	//select all like buttons
 	document.querySelectorAll('.likebutton').forEach(button => {
 		button.onclick = () => {

 			//get info from data-set property of button	
 			userid = button.dataset.userid;
 			postid = button.dataset.postid;

 			//locate likecounter element as child
 			parent = button.parentElement;
 			child = parent.childNodes[2];
 			likecount = child.innerHTML;
 			icon = button.childNodes[1]; 			

 			//toggle btw like icon and Unlike icon
 			if (icon.className == "far fa-heart") {
 				icon.className = "fa-solid fa-heart" ;
 				likecount = parseInt(likecount) + 1;
 			}
 			else {
 				icon.className = "far fa-heart";
 				likecount = parseInt(likecount) - 1;
 			}
 			//update like counter
 			child.innerHTML = likecount;

 			//send to server
 			like(postid);
 			
 		}
 		
 	})
 } );


