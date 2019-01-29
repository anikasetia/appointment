import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, SafeAreaView, Alert, Modal, TouchableHighlight, KeyboardAvoidingView, ScrollView, Platform, Image} from 'react-native';
import {CustomText, PageContainer, IconImage, PageTitle} from '../components';
import {Dropdown} from 'react-native-material-dropdown';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {MKTextField, MKColor, mdl, MKButton} from 'react-native-material-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {setAppointmentDetails, setFlow} from '../actions'

var cities = require('../data/citiesData.json');
var stateCodeMap = require('../data/stateCode.json');
var imagefile = require('../assets/scan.png');

const AppointmentDateTextfield = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Appointment Date')
  .withStyle({height: 48,  // have to do it on iOS
    marginTop: 10,})
  .withTextInputStyle({flex: 1, color:'#000'})
  .withFloatingLabelFont({
    fontSize: 14,
    fontWeight: '200',
    color:'gray'
  })
  .build();


  const Notes = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Notes')
  .withStyle({height: 150,  // have to do it on iOS
    marginTop: 10, borderWidth:1, padding:8, borderColor:'lightgray'})
  .withTextInputStyle({flex: 1, color:'#000'})
  .withFloatingLabelFont({
    fontSize: 14,
    fontWeight: '200',
    color:'gray'
  })
  .withKeyboardType("default")
  .build();

  const ColoredRaisedButton = MKButton.coloredButton()
  .withAccent(true)
  .withText('Next')
  .build();



class RequestAppointment extends Component{

    static navigationOptions = {
        title: 'Appointment',
        headerStyle: {
            backgroundColor: 'rgb(235,82,129)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },
      }

      state = {
        clinicLocation:"Sunnyvale, California",
        examTypes:["a", "b", "c", "d"],
        appointmentNotes:"",
        data : [{value:"banana"},{value:"mango"},{value:"orange"},{value:"pear"}, {value:"peach"}],
        examData: [{value:"MRI"}, {value:"X-RAY"}, {value:"Mammogram"}],
        selectedExam:"",
        modalVisible:false,
        selectedDate:"",
        appointmentTime:[{value:"9am - 10am"}, {value:"10am-11am"}, {value:"11am-12pm"}, {value:"12pm-1pm"}, {value:"1pm-2pm"},, {value:"2pm-3pm"}, , {value:"3pm-4pm"},, {value:"4pm-5pm"}],
        selectedAppointmentTime:"",
        doctorsOrder:this.props.appData.images
    }

    populateCities = () => {
        //console.log(cities)
        toAddData = []
        cities.cities.map(function(items){
            //console.log(items.city + ", "  +items.state)
            toAddData.push({value:items.city + ", "  +items.state})
        });
        this.setState({
            data:toAddData
        })
    }

    getLocation = () => {
        //console.log(cities.cities.length);
        var location = navigator.geolocation.getCurrentPosition(position => {
            const location = JSON.stringify(position);
            var lat = JSON.parse(location).coords.latitude;
            var long = JSON.parse(location).coords.longitude;
            
            fetch('http://dev.virtualearth.net/REST/v1/Locations/'+lat+','+long+'?includeEntityTypes=Address,Neighborhood,AdminDivision1,AdminDivision2&includeNeighborhood=0&include=ciso2&key=AvrCrL8ErQyZffZcv-_yY2-ZmOKwPhpbR_pkFbd9oJyC6f1WS84O6oA8JSJmkCo9')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.resourceSets[0].resources[0].address.locality)
                console.log(stateCodeMap[responseJson.resourceSets[0].resources[0].address.adminDistrict])
                var locationString = responseJson.resourceSets[0].resources[0].address.locality + ", " + stateCodeMap[responseJson.resourceSets[0].resources[0].address.adminDistrict];
                this.setState({
                    clinicLocation:locationString
                })
              })
              .catch((error) => {
                console.error(error);
              });

          },
          error => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    toUserDetailsPage = () => {
        this.props.setAppointmentDetails({
            dateRequested:this.state.selectedDate,
            timeRequested:this.state.selectedAppointmentTime,
            clinicLocation:this.state.clinicLocation,
            selectedExam:this.state.selectedExam,
            appointmentNotes:this.state.appointmentNotes
        })
        this.props.navigation.push('UserDetail')
    }

    toCameraScreen = () => {
        this.props.setFlow("fromAppointment");
        this.props.navigation.push('CameraScreen');
    }

    render(){
        return (
               <PageContainer>
                        <SafeAreaView style={[{ backgroundColor: '#6a51ae' }]}>
                            <StatusBar
                            barStyle="light-content"
                            backgroundColor="rgb(222,105,143)"
                            />
                        </SafeAreaView>
                        <IconImage />
                        <PageTitle titleContent  = {"Request an appointment"} />

                        <Dropdown label = "Clinic Location" data = {this.state.data} value = {this.state.clinicLocation} onChangeText = {(value) => {console.log(value); this.setState({clinicLocation:value})}}/>

                        <Dropdown label = "Exam type" data = {this.state.examData} onChangeText = {(value) => {this.setState({selectedExam:value})}}/>
                        
                        <Modal 
                            transparent={true}
                            visible = {this.state.modalVisible}
                        >
                            <View 
                                style = {{
                                    flex:1,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    backgroundColor:"rgba(0,0,0,0.5)"
                                }}
                            >

                                <Calendar onDayPress={(day) => { this.setState({selectedDate:day.month + "/" + day.day + "/" + day.year, modalVisible:false});}}/>

                            </View>
                        </Modal>
                        <View style = {{flexDirection:"row", marginTop:16, marginBottom:16}}>
                            <AppointmentDateTextfield onFocus = {() => {this.setState({modalVisible:true})}} value = {this.state.selectedDate} editable = {false} style = {{flex:8, height:48}}/>
                            <TouchableOpacity onPress = {() => {this.setState({modalVisible:true})}} style = {{flex:2, justifyContent:"center", alignItems:"center"}}><MaterialCommunityIcons name = "calendar" style = {{fontSize:24}}/></TouchableOpacity>
                        </View>

                        <Dropdown label = "Appointment Time" data = {this.state.appointmentTime} onChangeText = {(value) => {this.setState({selectedAppointmentTime:value})}}/>

                        <Notes multiline={true} numberOfLines = {5} onChangeText = {(value) => {this.setState({appointmentNotes:value})}}/>
                        <View style = {{flexDirection:'row', marginTop:16, marginBottom:16}}>
                            
                            <Text style = {{fontSize:16, flex:8, justifyContent:"center", alignItems:"center"}}>Have a doctor's order? Send us pics</Text>
                            <TouchableOpacity style = {{justifyContent:"center", alignItems:"center", flex:2}} onPress = {() => {this.toCameraScreen()}}>
                                <MaterialCommunityIcons name = "camera" style = {{fontSize:36}}/>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <ScrollView horizontal = {true} style = {{marginBottom:16}}>
                                {this.props.appData.images.map(function(imageUrl, index){
                                    return(<Image key = {index} source = {{uri: imageUrl}} style = {{height:192, width:108, marginLeft:8}}/>)
                                })}
                                {(this.props.appData.images.length > 0)? <View style = {{height:192, width:108, marginLeft:8, justifyContent:"center", alignItems:"center"}}><Text>Tap the camera to add more images</Text></View>:<View />}
                            </ScrollView>
                        </View>
                        
                        <ColoredRaisedButton onPress = {() => {this.toUserDetailsPage()}}/>

                    </PageContainer>
        )
    }

    componentDidMount = () =>{
        console.log(this.props.appData);
        this.populateCities()
        this.getLocation()
        
    }
}

function mapStateToProps (state) {
    return {
      appData: state.appData
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
        setAppointmentDetails: (value) => dispatch(setAppointmentDetails(value)),
        setFlow:(value) => dispatch(setFlow(value))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequestAppointment)