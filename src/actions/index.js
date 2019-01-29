import {
    SET_DOCTOR_ORDER,
    SET_APPOINTMENT_DETAILS,
    SET_CURRENT_FLOW,
    SET_ID_IMAGE
} from '../constants'

export function setImages(imageUri){
    return{
      type:SET_DOCTOR_ORDER,
      payload:imageUri
    }
  }

export function setAppointmentDetails(appointmentDetials){
    return {
        type:SET_APPOINTMENT_DETAILS,
        payload:appointmentDetials
    }
}

export function setFlow(currentFlow){
    return {
        type:SET_CURRENT_FLOW,
        payload:currentFlow
    }
}

export function setIdImage(imageUri){
    return {
        type:SET_ID_IMAGE,
        payload:imageUri
    }
}