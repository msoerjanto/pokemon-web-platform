import React from 'react';
import Context from './Context';

const withContext = Wrapped => {
    return props => {
        return (
            <Context.Consumer>
                {context => <Wrapped {...props} context={context} />}
            </Context.Consumer>
        )
    }
}

export default withContext;