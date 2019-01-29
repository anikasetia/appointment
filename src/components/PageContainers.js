import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

class PageContainer extends Component{
    render = () => {
        const {containerStyle} = styles;
        const {children} = this.props
        return(
            <KeyboardAvoidingView enabled behavior="position" keyboardVerticalOffset={keyboardVerticalOffset}>
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss} accessible = {false} style = {{flex:1}}>
                    <ScrollView>
                        <View style = {containerStyle}>
                            {children}
                        </View>
                    </ScrollView>    
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const styles = {
    containerStyle : {
        flex:1,
        paddingTop:8,
        paddingRight:8,
        paddingBottom:8,
        paddingLeft:8,
        marginBottom:48
    }
}

export {PageContainer}