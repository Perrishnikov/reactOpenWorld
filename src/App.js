/*global gapi*/
import React, {Component} from 'react';
import start from './scripts/start';
// import './App.css';
import './styles/main.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                useCache: true,
            },
            title: '',
            monsters: [],
            indexActiveMonster: 0,
        };
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
                // <div className="App">{this.state.name}</div>
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
            <div className="app-wrap">
                <div className="head-wrap">
                    <div className="app-title">
                        Open World Game
                    </div>
                    <button><a id="monsterButton" className="">Select Your Monster</a></button>
                    <div id="monsterMenu">
                        {/* class; monster state as props */}
                        <ul className="monsterMenu">
                            {this.state.monsters.map((element,index) => {
                                const name = element[0][1][0];
                                return  <li key={index}>{name}</li>;
                            })}
                        </ul>
                    </div>
                </div>
                <div className="body-wrap"></div>
            </div>
        );
    }
}
export default App;
