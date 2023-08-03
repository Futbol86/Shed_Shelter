import React, {Component, useState} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const BracketView = ({ 
    shedComponentNodes, checkedShedComponentNodes, expandedShedComponentNodes,
    doSetCheckedShedComponentNodes, doSetExpandedShedComponentNodes, doSetClickedShedComponentNode
}) => {
    return (
        <div>
            <CheckboxTree
                nodes={shedComponentNodes}
                checked={checkedShedComponentNodes}
                expanded={expandedShedComponentNodes}
                onCheck={
                    checked => {
                        doSetCheckedShedComponentNodes(checked);
                    }
                }
                onExpand={
                    expanded => {
                        doSetExpandedShedComponentNodes(expanded);
                    }
                }
                onClick = {
                    targetNode => {
                        doSetClickedShedComponentNode(targetNode)
                    }
                }
            />
        </div>
    );
}

export default BracketView;