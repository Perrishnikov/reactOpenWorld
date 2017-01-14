import React from 'react';
import { Action } from './Action';

export class Body extends React.Component {
    getActions() {
        const actions = this.props.activeMonster.filter(element => {
            return element[0][0].toUpperCase() === 'ACTIONS';
        });
        return [...actions];
    }
    monsterBody() {
        console.log('monsterBody');
        return (
            <Action actions={this.getActions()} />
        );
    }
    homeBody() {
        console.log('homeBody');
        return (
            <p>Nothing to see yet!</p>
        );
    }
    render() {
        return (
            <div className="body-wrap">{this.props.activeMonster !== undefined ? this.monsterBody() : this.homeBody()}</div>
        );
    }
}

Body.propTypes = {
    activeMonster: React.PropTypes.array,
};
