// server side methods

import { Meteor } from 'meteor/meteor';


const dropboxV2Api = require('dropbox-v2-api');
const dropbox = dropboxV2Api.authenticate({
    token: Meteor.settings.dropboxToken
});

Meteor.methods({

	testDropbox:function(){
		dropbox({
		    resource: 'files/list_folder',
		    parameters: {
		        path: '/tarotPlayer/'
		    },
		}, (err, result, response) => {
		    if (err) { return console.log('err:', err); }
			dropboxFiles = []
			missingFiles = []
		    for (var i = result.entries.length - 1; i >= 0; i--) {
		    	dropboxFiles.push(result.entries[i].name)
		    }
	
			var fs = Npm.require("fs");

			var meteorRoot = fs.realpathSync( process.cwd() + '/../' );
			var publicPath = meteorRoot + '/web.browser/app/';
			var filesPath = publicPath + '/test/';

			var localFiles = fs.readdirSync(filesPath);

		    console.log("distant folder contains : ", dropboxFiles)
			console.log("local folder contains : ", localFiles)

			for (var i = dropboxFiles.length - 1; i >= 0; i--) {
				result = localFiles.find(element=>element===dropboxFiles[i])
				if (result == undefined) {
					missingFiles.push(dropboxFiles[i])
				}
				// we also want to check if there's old unused localFiles.
			}

			console.log("please download missing files : ", missingFiles)

			// and now we either want to use curl or another solution to
			// download the files.

			for (var i = missingFiles.length - 1; i >= 0; i--) {
				console.log("downloading file at /tarotPlayer/"+missingFiles[i])
				dropbox({
				    resource: 'files/download',
				    parameters: {
			            "path": "/tarotPlayer/"+missingFiles[i]
			        },
				}, (err, result, response) => {

					// console.log(" path of app is ", filesPath)
					console.log("HEADER ", response.headers['dropbox-api-result'])

					// fs.writeFile(response.headers['dropbox-api-result'].name, "yaaahooo", function(err) {
					//     if(err) {
					//         return console.log(err);
					//     }
					//     console.log("The file was saved!");
					// }); 
				})
			}

		});	
	}

})
