import React from 'react';

export class Body extends React.Component {

    render() {
        return (
            // <div>{this.props.activeMonster}</div>
            null
        );
    }
}

Body.propTypes = {
    activeMonster: React.PropTypes.array,
};

Body.defaultProps = {
    name: 'Stranger'
};
