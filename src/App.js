/*global gapi*/
import React, {Component} from 'react';
import './App.css';
import start from './scripts/start';

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
            indexActiveMonster: null
        };
    }
    componentDidMount() {
        // console.log('did mount');
    }
    componentWillMount() {
        /* localStorage =========================================================  */
        //also sets cache after parseMonster() from ./parser.js
        if (this.state.settings.useCache && localStorage.length > 0) {
            //if there is monster.data, use it...
            const [title,...monsters] = JSON.parse(localStorage.getItem('data'));

            this.setState({
                title: title,
                monsters: monsters,
            });
            console.log('Using cached data.');
        } else {
            console.log('getting from gapi...');
            // Loads the JavaScript client library and
            //invokes start() from scripts/start.js
            gapi.load('client', start.bind(this));
        }
    }

    render() {
        return (
                <div className="App">{this.state.name}</div>
                // <div className="App">
                //     <div className="App-header">
                //         <img src={logo} className="App-logo" alt="logo"/>
                //         <h2>{this.state.welcome}</h2>
                //     </div>
                //     <p className="App-intro">
                //         To get started, edit
                //         <code>src/App.js</code>
                //         and save to reload.
                //     </p>
                // </div>
        );
    }
}
export default App;
