import React from 'react';

export class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            monsterName: 'Select Your Monster'
        };
    }

    toggleMenu(e){
        // toggle the UL class="hidden"
        e.preventDefault();
        const target = this.refs.target.classList;
        if(target.value.includes('hidden')){
            target.remove('hidden');
        } else {
            target.add('hidden');
        }
    }

    toggleActive(e){
        // toggle the LI class="active"
        //round up all the list items and remove ACTIVE class
        const children = Array.from(e.target.parentNode.children);
        children.forEach(element => {
            const insideClass = element.classList;
            if(insideClass.value.includes('active')){
                insideClass.remove('active');
            }
        });
        //set the target's class to ACTIVE
        const target = e.target.classList;
        target.add('active');
    }

    handleClick(e){
        const name = e.target.textContent;
        this.props.iClicked(e);
        this.toggleMenu(e);
        this.toggleActive(e);
        this.setState({
            monsterName: name,
        });
    }

    render() {
        return (
            <div className="head-wrap">
                <div className="app-title">
                    {this.props.name}'s Open World Game
                </div>
                <button id="monsterButton" className="hello" onClick={(e) => this.toggleMenu(e)}>
                    {this.state.monsterName}
                </button>
                <div id="monsterMenu">
                    <ul className="monsterMenu hidden" ref="target">
                        {this.props.monsters.map(element => {
                            const name = element[0][1][0];
                            return  <li onClick={(e) => this.handleClick(e)} key={name}>{name}</li>;
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
