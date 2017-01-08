function parseMonster(dirty, _this){
    //filters out rows with no values, then returns an array of all monsters
    const title = dirty.properties.title;
    //for each SHEET in SHEETS
    const monstersData = dirty.sheets.map(element => {
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
    // just the names
    const monstersNames = monstersData.map(element => element[0][1][0]);

    _this.returnedFromParser({title, monstersData, monstersNames});

}
export default parseMonster;
