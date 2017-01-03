//Reset Constructor
function Reset(test){
    this.name = 'Reset';
    this.hardReset = test;
    this.reset = (e) => {
        if(e.target.id == 'reset-button'){
            console.log('reset');
        }
    };
}

Reset.prototype.render = function(){
    return `
        <div id="resetModule" class="half container container-reset">
            <div class="section-reset-button">
                <div id="reset-button" class="button button-reset">Reset</div>
            </div>
            <div class="section-reset-title">
                This is Reset
            </div>
        </div>`;
};
Reset.prototype.init = function(){
    //global listener to handle this button click
    document.addEventListener('click', this.reset,false);
    return this.render();
};
