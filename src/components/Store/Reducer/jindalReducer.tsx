import ActionTypes from "../AppConstants/ActionTypes";

const initialState = {
  isOtpVerified: false,
};

const JindalReducer = (state: any = initialState, action: any) => {
  console.log(action?.type, "jindalreducer");
  switch (action?.type) {
    case ActionTypes?.SET_OTP_VERIFIED:       
      return {
        ...state,
        isOtpVerified: action.payload,
      };
    default:
      return state;
  }
};


export default JindalReducer;
