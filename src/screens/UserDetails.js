import React, {Component} from 'react';
import {View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Modal, Image} from 'react-native';
import {PageContainer, IconImage, PageTitle} from '../components';
import {MKTextField, MKButton} from 'react-native-material-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {connect} from 'react-redux';
import {setFlow} from '../actions';

const FirstName = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('First name')
  .withStyle({height: 48,  // have to do it on iOS
    marginTop: 16, flex:1})
  .withTextInputStyle({flex: 1, color:'#000'})
  .withFloatingLabelFont({
    fontSize: 14,
    fontWeight: '200',
    color:'gray'
  })
  .build();

  const LastName = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Last name')
  .withStyle({height: 48,  // have to do it on iOS
    marginTop: 16, marginLeft:16, flex:1})
  .withTextInputStyle({flex: 1, color:'#000'})
  .withFloatingLabelFont({
    fontSize: 14,
    fontWeight: '200',
    color:'gray'
  })
  .build();

  const DateOfBirth = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Date of Birth')
  .withStyle({height: 48,  // have to do it on iOS
    marginTop: 16, flex:8})
  .withTextInputStyle({flex: 1, color:'#000'})
  .withFloatingLabelFont({
    fontSize: 14,
    fontWeight: '200',
    color:'gray'
  })
  .build();

  const ColoredRaisedButton = MKButton.coloredButton()
  .withStyle({
      marginTop:48
  })
  .withAccent(true)
  .withText('Request Appointment')
  .build();


class UserDetail extends Component{

    static navigationOptions = {
        title: 'User Details',
        headerStyle: {
            backgroundColor: 'rgb(235,82,129)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },
      }

      state = {
          isModalVisible:false,
          selectedDate:""
      }


    toCameraScreen = () => {
        this.props.setFlow('fromUserDetail')
        this.props.navigation.push('CameraScreen')
    }

    render(){
        console.log(this.props.appData)
        return(
            <PageContainer>
                    <IconImage />
                    <PageTitle titleContent  = {"Fill in your info"} />

                    <View style = {{flexDirection:"row", marginTop:16}}>
                        <Text style = {{flex:8}}>Scan an ID</Text>
                        <TouchableOpacity style = {{justifyContent:"center", alignItems:"center", flex:2}} onPress = {() => {this.toCameraScreen()}}>
                                <MaterialCommunityIcons name = "camera" style = {{fontSize:36}}/>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {console.log(this.props.appData)}
                        {(this.props.appData.idImage != "") ?<Image source = {{uri: this.props.appData.idImage}} style = {{height:192, width:108}} />:<View />}
                    </View>


                    <View style = {{flexDirection:"row"}}>
                        <FirstName />
                        <LastName />
                    </View>
                    <View style = {{flexDirection:"row"}}>
                        <DateOfBirth editable = {false} value = {this.state.selectedDate}/>
                        <TouchableOpacity style = {{justifyContent:"center", alignItems:"center", flex:2}} onPress = {() => {this.setState({isModalVisible:true})}}>
                                <MaterialCommunityIcons name = "calendar" style = {{fontSize:36}}/>
                        </TouchableOpacity>
                    </View>
                    <Modal 
                            transparent={true}
                            visible = {this.state.isModalVisible}
                        >
                            <View 
                                style = {{
                                    flex:1,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    backgroundColor:"rgba(0,0,0,0.5)"
                                }}
                            >

                                <Calendar onDayPress={(day) => { this.setState({selectedDate:day.month + "/" + day.day + "/" + day.year, isModalVisible:false});}}/>

                            </View>
                        </Modal>
                        <ColoredRaisedButton />

            </PageContainer>
            
        )
    }
}

function mapStateToProps (state) {
    return {
      appData: state.appData
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
        setFlow:(value) => dispatch(setFlow(value))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserDetail)
