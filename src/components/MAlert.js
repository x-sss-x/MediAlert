import React from 'react'
import { Alert, Text } from 'native-base'

const MAlert = ({status,msg}) => {
  return (
    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status} >
        <Alert.Icon/>
           <Text fontWeight={"semibold"} px={"4"}>{msg}</Text>
    </Alert>
  )
}

export default MAlert