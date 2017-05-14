$(document).ready(init);

function init(jQuery) {
	CurrentYear();
 	initMap();

	// user clicks save button
	$('#saveMapButton').on('click', function () {
			           
	    var drawingData = draw.getAll();


	    // check to see the user has drawn on the maps
	    if (drawingData.features.length == 0) {
	        console.log ('no map features!');
	        $('#noDrawingsAlert').show();

	        return;
	    }

	    // change the save button to indicate loading
	    var $btn = $(this).button('loading')

	    createGitHubGist(drawingData);
	    
	});

	// fires when the modal displays
	$('#gitHubGistModal').on('show.bs.modal', function (event) {

		// show the URL to the Gist that was just created in the input box

	    var clipboard = new Clipboard('.btn');

	    var gistURL = $('#saveMapButton').data('gist-url');

	   // modal.find('.modal-body').text(gistURL)
	    $('#modalLink').attr("href", gistURL);
	    $('#modalInput').val(gistURL);
	       
	});

}

function createGitHubGist(contents)
{
	// construct the object for the hidden field that will be submitted to CodePen - see https://blog.codepen.io/documentation/api/prefill/
	   
	    // unauthenticated client
	    const gh = new GitHub();

	    /* authenticated would look like this - there is daily limit on Gists for unauthenticated clients
	    // const gh = new GitHub(
	    	{
	        token: <<APITOKENHERE>> // api token from Github account
	    }
	    ); */

	    let gist = gh.getGist(); // not a gist yet
	    gist.create({
	       public: true,
	       description: 'My map',
	       files: {
	          "mymap.json": {
	             content: JSON.stringify(contents)
	          }
	       }
	    }).then(function({data}) {
	        
	       // Promises!
	       let createdGist = data;
	       return gist.read();
	    }).then(function({data}) {
	       let retrievedGist = data;
	       // do interesting things

	       
	       // update the data-gist-url attribute on the button with the URL of the page for the gist that was just created
	       $('#saveMapButton').data("gist-url", retrievedGist.html_url);

	       $('#gitHubGistModal').modal('show');

	       // reset the Save Button to original state (e.g not showing the loading label)
	       $('#saveMapButton').button('reset');

	    });  
}