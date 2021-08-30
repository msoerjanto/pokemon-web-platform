import React from 'react';
const PageControl = ({ changePage }) => {
    return (<button onClick={() => changePage(0)}>
        Page Control
    </button>)
};
export default PageControl;