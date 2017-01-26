import React, { Component, PropTypes } from 'react';

class MainContainer extends Component {
    // constructor (props){
    //     super(props);
    // }

    render() {
        const { children } = this.props;
        return (
            <main>
                {children}
                {/*ToDo: create a separete component for this*/}
                <div className="google-map">
                    <img src="http://placehold.it/450x450" alt="placehoder for google map" />
                </div>
            </main>
        );
    }
}

MainContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainContainer;
