//Action Constructor
import React from 'react';

export class Action extends React.Component {


    // <div className="half container container-action">
    //     <div className="section-action-button">
    //         {/* <div id={this.props.} className="button button-next">Next Action</div> */}
    //     </div>
    //     <div className="section-action-title">
    //         Current
    //     </div>
    //     <div className="section-action-window">
    //         <ul>
    //             <li>None</li>
    //         </ul>
    //     </div>
    // </div>


    render() {
        const incoming = this.props.actions[0];
        console.log(incoming);
        return (
            <div className="half container container-action">
                <div className="section-action-button">
                    <div id={'hello'} className="button button-next">Next Action</div>
                </div>
                <div className="section-action-title">
                    Current
            </div>
                <div className="section-action-window">
                    <ul>
                        <li>None</li>
                    </ul>
                </div>
            </div>
        );
    }
}

Action.propTypes = {
    actions: React.PropTypes.array,
};
