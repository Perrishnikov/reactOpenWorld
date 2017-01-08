/*global gapi*/
import React, {Component} from 'react';
import start from './scripts/start';
// import './App.css';
import './styles/main.css';
import {Header} from './classes/Header';
import {Body} from './classes/Body';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Perry',
            settings: {
                useCache: true,
                //checkForUpdates: true
            },
            title: '',
            monstersNames: [],
            monstersData: [],
            indexActive: -1,
        };
        this.iClicked = this.iClicked.bind(this);
    }

    componentWillMount() {
        /* localStorage - also sets cache after parseMonster() from ./parser.js*/
        if (this.state.settings.useCache && localStorage.length > 0) {
            //if there is monster.data, use it...
            const cachedData = JSON.parse(localStorage.getItem('data'));
            this.setState(cachedData);
            console.log('Using cached data.');
            console.log(cachedData);
        } else {
            console.log('getting from gapi...');
            // Loads the JavaScript client library and start() from scripts/start.js
            gapi.load('client', start.bind(this));
        }
    }

    returnedFromParser(parsedData){
            // set localStorage if flag is true
        if(this.state.settings.useCache){
            console.log('setting localStorage');
            console.log(parsedData);
            localStorage.setItem('data', JSON.stringify(parsedData));
        }
            //must render state regardless of flag
        this.setState(parsedData);
    }

    iClicked(e) {
        //iClicked is from the monster clicked in the MonsterMenu
        const name = e.target.textContent;
        const index = this.state.monstersData.findIndex(element => {
            console.log(element);
            return element[0][1][0] === name;
        });
        this.setState({
            indexActive: index,
        });
    }

    render() {
        return (
            <div className='app-wrap'>
                <Header
                    monsters={this.state.monstersData}
                    iClicked={this.iClicked}
                />
                <Body
                    activeMonster={this.state.monstersData[this.state.indexActive]}
                />
                <div className="body-wrap"></div>
            </div>
        );
    }
}
export default App;
