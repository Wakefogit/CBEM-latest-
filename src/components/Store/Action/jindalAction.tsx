import ActionTypes from "../AppConstants/ActionTypes";

const setOtpVerified = (payload: any) => {
  const action = {
    type: ActionTypes?.SET_OTP_VERIFIED,
    payload
  } 
  return action;
};

export  {setOtpVerified};
