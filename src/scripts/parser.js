function parseMonster(dirty, _this){
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

    // set localStorage if flag is true
    if(_this.state.settings.useCache){
        console.log('setting localStorage');
        localStorage.setItem('data', JSON.stringify([title, cleanSheets]));
    }

    _this.setState({
        title: title,
        monsters: cleanSheets,
    });
}
export default parseMonster;
