import { 
    SET_DOCTOR_ORDER,
    SET_APPOINTMENT_DETAILS,
    SET_CURRENT_FLOW,
    SET_ID_IMAGE
  } from '../constants'
const initialState = {
    currentFlow:"",
    images:[],
    appointmentDetials:{},
    idImage : ""
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {

    case SET_DOCTOR_ORDER:{
        return{
            ...state,
            images:[...state.images, action.payload]
        }
    }

    case SET_APPOINTMENT_DETAILS:{
        return{
            ...state,
            appointmentDetials:action.payload
        }
    }

    case SET_CURRENT_FLOW:{
        return{
            ...state,
            currentFlow:action.payload
        }
    }

    case SET_ID_IMAGE:{
        return{
            ...state,
            idImage:action.payload
        }
    }

    default:
      return state
  }
}