import React from 'react';
import {Row, Col} from 'reactstrap';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {PREDEFINED_BUILDING_COLORS} from '../../../../../constants';

class ColorOptions extends React.Component {
    handleMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    };

    handleMouseEnter = (event) => {
        this.props.onFocus(this.props.option, event);
    };

    handleMouseMove = (event) => {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    };

    render() {
        const {option} = this.props;
        // console.log('Option prop: ', this.props);
        return (
            <div className={this.props.className} style={{padding: '2px'}}
                 onMouseDown={this.handleMouseDown}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseMove={this.handleMouseMove}
            >
                <Row className="ml-1 mr-0 pr-0">
                <Col xs="3" style={{backgroundColor: option.color, borderRadius: '2px'}}>
                </Col>
                <Col xs="9" style={{color: '#000000'}}>
                    {option.name}
                </Col>
            </Row>
            </div>
        );
    }
}

class ColorValue extends React.Component{
    render() {
        const {value} = this.props;
        // console.log('Value prop: ', this.props);
        return (
            <div className="Select-value" title={value.name}>
                <Row className="pt-0 pb-0 pl-2">
                    <Col xs="3" className="mt-1 mb-1" style={{backgroundColor: value.color, borderRadius: '2px'}}>
                    </Col>
                    <Col xs="9" style={{color: '#000000'}}>
                        {value.name}
                    </Col>
                </Row>
            </div>
        );
    };
}


const WallsColourDropdown = ({ input, label, disabled, meta: { touched, error }, options = PREDEFINED_BUILDING_COLORS }) => (
    <Select
        {...input}
        value={input.value || ''}
        optionComponent={ColorOptions}
        options={options}
        valueComponent={ColorValue}
        multi={false}
        valueKey="color"
        labelKey="name"
        clearable={false}
        searchable={false}
        onChange={(value) => input.onChange(value.color)}
        onBlur={() => input.onBlur(input.value)}
        disabled={disabled ? true : false}
    />
);

export default WallsColourDropdown;