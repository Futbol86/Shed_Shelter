import React from 'react';

// const BlankLayout = ({children}) => {
//     return children;    //-- From React 16: Can render array without wrapping element :-)
// };

const BlankLayout = ({children}) => (
    <div className="app flex-row align-items-center">
        {children}
    </div>
);

export default BlankLayout;