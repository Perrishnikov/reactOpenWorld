import React from 'react';

class Header extends React.Component {
    toggleMenu(e){
        e.preventDefault();
        const target = this.refs.target.classList;
        if(target.value.includes('hidden')){
            target.remove('hidden');
        } else {
            target.add('hidden');
        }
    }

    render() {
        return (
            <div className="head-wrap">
                <div className="app-title">
                    {this.props.name}'s Open World Game
                </div>
                <button id="monsterButton" className="hello" onClick={(e) => this.toggleMenu(e)}>
                    Select Your Monster
                </button>
                <div id="monsterMenu">
                    <ul className="monsterMenu hidden" ref="target">
                        {this.props.monsters.map(element => {
                            const name = element[0][1][0];
                            return  <li onClick={(e) => this.props.iClicked(e)} key={name}>{name}</li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    name: React.PropTypes.string,
    monsters: React.PropTypes.array,
    iClicked: React.PropTypes.func,
};

Header.defaultProps = {
    name: 'Stranger'
};

export default Header;
