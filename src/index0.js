/* global gapi */
// (function() {
    const state = {
        settings:{
            useCache: true,
        },
        title: '',
        monsters: [],
        indexActiveMonster: null
    };
    function setIndexActiveMonster(data) {
        state.indexActiveMonster = data;
        console.log(state.indexActiveMonster);
        console.log(state);
    }

    /* localStorage =========================================================  */

    //also sets cache after parseMonster();
    if(state.settings.useCache && localStorage.length > 0){
        //if there is monster.data, use it...
        const [title, ...monsters] = JSON.parse(localStorage.getItem('data'));
        state.title = title;
        state.monsters = monsters[0];
        console.log('Using cached data');
        console.log(state);
        // parsedData.monsters = cachedMonster;
        displayHome(state.monsters);
    } else {
        // Loads the JavaScript client library and invokes `start` afterwards.
        gapi.load('client', start);
    }

    /* Start ================================================================ */
    function start() {
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
                parseMonster(serverMonster);
            } else {
                document.querySelector('footer').textContent('No data found');
            }
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }

    /* ======================================================================= */
    // filters out all crap, returns good rows.
    function parseMonster(dirty){
        //filters out rows with no values, then returns an array of all monsters
        const title = dirty.properties.title;
        //for each SHEET in SHEETS
        const cleanSheets = dirty.sheets.map(element => {
            // change value of DIRTY to specify the rowData
            dirty = element.data[0].rowData;
            //for each ROW in SHEET
            const clean = dirty
                //get only rows that are not null
                .filter(element => element.values)
                //for each row with a value...
                .map(rowElement => {
                    // tempArray holds related data in sub array (row)
                    // let rowArray = [];
                    const rowArray =
                    //get only cells with a value..
                    rowElement.values.filter(element => {
                        // console.log(element);
                        return element.userEnteredValue;
                    })
                    //for each cell, return an array with [value, note]
                    .map(element => {
                        const tempValue = element.userEnteredValue[Object.keys(element.userEnteredValue)[0]].toString().trim();

                        const tempNote = element.note || null;
                        return [tempValue, tempNote];
                    });
                    return rowArray;
                });
            return clean;
        });
        //use if localStorage if flag is true
        if(state.settings.useCache){
            //does this auto clear the old data?
            localStorage.setItem('data', JSON.stringify([title, cleanSheets]));
        }
        console.log('Data from GAPI');
        // displayHome([title, cleanSheets]);
        state.monsters = cleanSheets[0];
        state.title = title;

    }

    /* ======================================================================= */
    function displayHome (monsterIn) {
        // appends all the new monsters to #monsterMenu
        function setSelect(monsterArray){
            return `
                <ul class="monsterMenu hidden">
                    ${monsterArray.map(element => {
                        const name = element[1][0];
                        return  `<li>${name}</li>`;
                    }).join('')}
                </ul>
            `;
        }

        function setActive(monsterIn){ // eslint-disable-line
            //round up all the list items and remove ACTIVE class
            const children = Array.from(navUL.children);
            children.map(element => {
                const insideClass = element.classList;
                if(insideClass.value.includes('active')){
                    insideClass.remove('active');
                }
            });
            //set the monsterIn class to ACTIVE
            const cL = monsterIn.classList;
            if(cL.value.indexOf('active')) {
                monsterIn.outerHTML = `<li class="active">${monsterIn.textContent}</span>`;
            }
        }

        /* Variables ========================================================= */
        const [appTitle, monstersArray] = monsterIn; // eslint-disable-line
        // get #monsterMenu, insert UL and LI of all the monsters
        document.querySelector('#monsterMenu').insertAdjacentHTML('beforeend', setSelect(monstersArray));

        const navUL = document.querySelector('ul.monsterMenu');

        // when MonsterButton is pressed, make menu visible
        document.querySelector('#monsterButton').addEventListener('click', e => {
            e.preventDefault();
            const cL = navUL.classList;
            if(cL.value.includes('hidden')){
                cL.remove('hidden');
            } else {
                cL.add('hidden');
            }
        });

        //temp so I dont have to press button
        displayMonster('Mummy Farts Alot', monstersArray);

        // Just once: add listener to each monster; do this and display the clicked one
        // navUL.addEventListener('click', e => {
        //     const targetMonster = e.target.textContent;
        //     // get the list item to decorate as the active
        //     const targetLI = e.target;
        //
        //     //only displayMonster if its a different one
        //     if (targetMonster != activeMonster){
        //         setActive(targetLI);
        //         displayMonster(targetMonster, monstersArray);
        //
        //         //close the MonsterMenu when a monster is clicked
        //         navUL.classList.add('hidden');
        //         // set activeMonster so we know
        //         activeMonster = targetMonster;
        //     }
        // });
    }

    /* ======================================================================= */
    function displayMonster (targetMonster, monstersArray){
        console.log(monstersArray);
        // give me the monster that matches the value on the SELECT
        const thisMonster = monstersArray.filter(element => {
            return element[1][0] == targetMonster;
        });
        // const monsterIndex = monstersArray.findIndex(element => {
        //     return element[0][1][0] == targetMonster;
        // });

        // setIndexActiveMonster(monsterIndex);
        console.log(thisMonster);
        // returns array of only ACTIONS
        const onlyActions = thisMonster.filter(element => {
            return element[0][1] == 'Actions';
        });
        console.log(onlyActions);

        //just give me the first action array.
        const myAction = new Action('primaryAction', onlyActions); //eslint-disable-line
        const myReset = new Reset(setIndexActiveMonster); //eslint-disable-line

        // setReset(thisMonster[monsterIndex]);

        function frame(){
            return `
                ${myAction.init()} ${myReset.init()}
                <div class="half">Some Text</div>
            `;
        }
        document.querySelector('.body-wrap').innerHTML = frame();
    }
// }());
