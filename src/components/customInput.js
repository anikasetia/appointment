import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

class CustomText extends Component{
    static propTypes = {
        content: PropTypes.string.isRequired,
        textStyles: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({})
        ]).isRequired,
        buttonStyles: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({}),
          ]).isRequired,
    }

    render = () => {
        const {textStyles, buttonStyles, content, children} = this.props;
        return(
            <TouchableOpacity>
                <Text style={textStyles}>{content}</Text>
                <Text>{children}</Text>
            </TouchableOpacity>
        )
    }
}
export {CustomText};