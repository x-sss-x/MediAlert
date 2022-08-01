import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Box,Text } from 'native-base';

const DateTab = ({CurrentDate,date,onPress}) => {
    const parseDate = new Date(date).getDate();

  return (
    <TouchableOpacity
                    onPress={onPress}
                  >
                    <Box
                      borderWidth={date == CurrentDate ? 3 : 0}
                      borderColor={"text.success"}
                      height={30}
                      width={30}
                      borderRadius={50}
                      alignItems={"center"}
                      justifyContent={"center"}
                      marginX={"1.5"}
                      bg={"bg.pri"}
                    >
                      <Text fontWeight={"bold"}>{parseDate}</Text>
                    </Box>
                  </TouchableOpacity>
  )
}

export default DateTab