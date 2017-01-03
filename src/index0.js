/* eslint-disable */
    
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
