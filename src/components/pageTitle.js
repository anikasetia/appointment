import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';

class PageTitle extends Component{
    render(){

        const {titleContainer, titleText} = styles

        return (
            <View style = {titleContainer}>
                <Text style = {titleText}>{this.props.titleContent}</Text>
            </View>
        )
    }
}

const styles = {
    titleContainer:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:16
    },
    titleText:{
        fontSize:24,
        fontWeight:"600"
    }
}

export {PageTitle}