import {Navigate} from "react-router-dom" ;
import { getAuthToken } from "../../localStorage";

import React from 'react'

const PrivateNavigates = ({children}) => {
    const auth = getAuthToken();
  return  auth ? children : <Navigate to='/'></Navigate>
}

export default PrivateNavigates
