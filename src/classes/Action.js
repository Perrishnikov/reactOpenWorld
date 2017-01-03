//Action Constructor
function Action(name, actionsIn){
    this.name = name;
    [this.title, ...this.rest] = actionsIn;
    this.actionList = this.rest.map(element => element[0]);
    this.actionNotes = this.rest.map(element => element[1]);
    this.currentAction = 0;
    this.visibleList = [];

    this.nextAction = (e) => {
        if(e.target.id == this.name){
            if(this.currentAction +1 <= this.actionList.length){
                this.pushVisible();
                this.displayVisible();
                this.incrementAction();
            }
        }
    };

    this.previousAction = () => {console.log('Previous Action');};
}
Action.prototype.decrementAction = function(){
    //manipulate visibleList; send it to displayVisible
};
Action.prototype.pushVisible = function(){
    this.visibleList.reverse().push(this.actionList[this.currentAction]);
};
Action.prototype.incrementAction = function(){
    this.currentAction ++;
};
Action.prototype.displayVisible = function(){
    const actionsUL = document.querySelector('.section-action-window ul');
    actionsUL.innerHTML = this.visibleList.reverse().map((element,index)=> {
        return `
                <li class="window-items"><span class="att">${this.visibleList.length -index}</span> ${element}</li>
                `;
    }).join('');
};
Action.prototype.render = function(){
    return `
        <div class="half container container-action">
            <div class="section-action-button">
                <div id="${this.name}" class="button button-next">Next Action</div>
            </div>
            <div class="section-action-title">
                Current
            </div>
            <div class="section-action-window">
                <ul>
                    <li>None</li>
                </ul>
            </div>
        </div>`;
};
Action.prototype.init = function(){
    //global listener to handle this button click
    document.addEventListener('click', this.nextAction.bind(this),false);
    return this.render();
};
