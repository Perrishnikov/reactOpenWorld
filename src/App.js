/*global gapi*/
import React, {Component} from 'react';
import start from './scripts/start';
// import './App.css';
import './styles/main.css';
import Header from './classes/Header';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Perry',
            settings: {
                useCache: true,
            },
            title: '',
            monsters: [],
            indexActiveMonster: 0,
        };
        this.iClicked = this.iClicked.bind(this);
    }

    iClicked(nameIn) {
        const name = nameIn.target.textContent;
        const index = this.state.monsters.map(element => {
            const justTheName = element[0][1][0];
            return justTheName;
        }).findIndex(element => {
            return element === name;
        });
        this.setState({
            indexActiveMonster: index,
        });
    }

    componentWillMount() {
        /* localStorage - also sets cache after parseMonster() from ./parser.js*/
        if (this.state.settings.useCache && localStorage.length > 0) {
            //if there is monster.data, use it...
            const [title,monsters] = JSON.parse(localStorage.getItem('data'));
            this.setState({
                title: title,
                monsters: monsters,
            });
            console.log('Using cached data.');
            console.log(monsters);
        } else {
            console.log('getting from gapi...');
            // Loads the JavaScript client library and start() from scripts/start.js
            gapi.load('client', start.bind(this));
        }
    }
    componentDidUpdate(prevProps, prevState){
        console.log(prevProps);
        console.log(prevState);
    }

    render() {
        return (
            <div className='app-wrap'>
                <Header
                    monsters={this.state.monsters}
                    iClicked={this.iClicked}
                 />
                <div className="body-wrap"></div>
            </div>
        );
    }
}
export default App;
