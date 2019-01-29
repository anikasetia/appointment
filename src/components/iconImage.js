import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';

var imageFile = require('../assets/scan.png')

class IconImage extends Component{

    render = () => {
        const {iconStyle, titleContainer, titleText} = styles
        return(
            <View style = {titleContainer}>
                <Image source = {imageFile} style = {iconStyle} />
                <Text style = {titleText}>Peninsula Diagnostic Imaging</Text>
            </View>
        )
    }
}

const styles = {
    iconStyle : {
        width:50,
        height:50
    },
    titleContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    titleText:{
        marginLeft:16,
        fontSize:12,
        fontWeight:"bold"
    }
}

export {IconImage}