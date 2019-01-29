import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux'
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';
import {
    setImages,
    setIdImage
} from '../actions';

var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
}

class CameraScreen extends Component{

    state = {
        flashMode:RNCamera.Constants.FlashMode.off,
        flashModeName:'Off',
        
    }

    //depending on the current flow (determine melon ripeness, ground spot )
    //(basically task of the camera in the given context) the function saves the image url in the appropriate location in 
    //the application's store (refer categoriesDataReducer)

    takePicture = async () => {
        try {
            //setting image qulity and dimensions
            const options = { quality: 1.0, base64: true, width:1080, height:1920 };
          const data = await this.camera.takePictureAsync(options);
          
          if(this.props.appData.currentFlow == "fromAppointment"){
            this.props.setImages(data.uri);
        }
        else{
            this.props.setIdImage(data.uri);
        }
        this.props.navigation.pop()

        } catch (err) {
          // console.log('err: ', err);
        }
      };

      
    //nav bar
    static navigationOptions = {
        title: 'Take pictures',
        headerStyle: {
            backgroundColor: 'rgb(222,105,143)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },
      }

      //changing flash mode
    toggleFlash = () => {
        console.log("switch flash mode")
        if(this.state.flashMode == RNCamera.Constants.FlashMode.auto){
            this.setState({
                flashMode:RNCamera.Constants.FlashMode.on,
                flashModeName:'On'
            })
        }
        else if(this.state.flashMode == RNCamera.Constants.FlashMode.on){
            this.setState({
                flashMode:RNCamera.Constants.FlashMode.off,
                flashModeName:'Off'
            })
        }
        else if(this.state.flashMode == RNCamera.Constants.FlashMode.off){
            this.setState({
                flashMode:RNCamera.Constants.FlashMode.auto,
                flashModeName:'Auto'
            })
        }
    }   
    
    //same as take picture function 

      openGallery = () => {
        console.log("gallery button clicked");
        ImagePicker.launchImageLibrary(options, (response) => {
            if(response.uri){
                console.log(response.uri);
                    if(this.props.appData.currentFlow == "fromAppointment"){
                        this.props.setImages(response.uri);
                    }
                    else{
                        this.props.setIdImage(response.uri);
                    }
                    this.props.navigation.pop()    
                }
            else{
                console.log(response);
            }
            
        });
    }

    render(){
        console.log(this.props);

        return(
            <View style = {styles.cameraContainer}>
                <RNCamera 
                    ref={cam => {
                        this.camera = cam;
                      }}
                    style = {styles.cameraPart} 
                    // type={RNCamera.Constants.Type.back}
                    
                    flashMode={this.state.flashMode}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    
                />
                <View style = {styles.settingsPanel}>
                    <View style = {styles.panelLeft}>
                    <TouchableOpacity onPress = {this.openGallery}>
                        <Icon name = "photo" style = {styles.panelIcons}/>
                    </TouchableOpacity>

                    {/* <TouchableOpacity>
                        <Ionicons name = "md-settings" style = {styles.panelIcons}/>
                    </TouchableOpacity> */}
                    </View>
            
                    <View style = {styles.panelRight}>
                    <TouchableOpacity style = {{alignSelf:'flex-end', marginRight:20, flexDirection:'row'}} onPress = {this.toggleFlash}>
                        <Ionicons name = "md-flash" style = {styles.panelIcons}/>
                        <Text>{this.state.flashModeName}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.cameraControlPanel}>
                    <TouchableOpacity onPress = {this.takePicture}>
                        <Entypo name = "circle" style = {{fontSize:70, color:'rgb(222,105,143)'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
      appData: state.appData
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
        setImages: (value) => dispatch(setImages(value)),
        setIdImage: (value) => dispatch(setIdImage(value))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CameraScreen)

const styles = StyleSheet.create({
    cameraContainer:{
        flex:1
    },
    cameraPart:{
        flex:80
    },
    settingsPanel:{
        flex:5,
        backgroundColor:'rgb(235,235,235)',
        flexDirection:"row"
    },
    cameraControlPanel:{
        flex:15,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    panelIcons:{
        padding:2,
        fontSize:25,
        marginLeft:10,
        color:'rgb(85,85,85)'
    },
    panelLeft:{
        flexDirection:'row',
        width:'80%',
    },
    panelRight:{
        width:'20%',
    }
})