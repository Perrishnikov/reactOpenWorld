/*global gapi*/
import parseMonster from './parser';
/* Start ================================================================ */
function start() {
    //need to hold onto this
    const _this = this;

    //local function to run when data comes back from gapi
    function passToParser (data) {
        parseMonster(data, _this);
    }

    // Initializes the client with the API key and the Translate API.
    gapi.client.init({
        'apiKey': 'AIzaSyB5Oa6MKMDPpJtjfA_-1eGLmgFli99sv4k',
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        // Executes an API request, and returns a Promise.
        return gapi.client.sheets.spreadsheets.get({
            spreadsheetId: '1wa6Gt3tAOwlxAOMT5RvOlPZwfW68zOVxeeqI13dmmBw', //Perry
            includeGridData: true,
        });
    }).then(function(response) {
        const serverMonster = response.result;
        if (serverMonster) {
            console.log('Data found. Time to parse...');
            passToParser(response.result);
        } else {
            console.error('Error. No data found.');
        }
    }, function(reason) {
        console.error('Error: ' + reason.result.error.message);
    });
}
export default start;
