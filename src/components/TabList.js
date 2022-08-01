import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import Capsule from './Capsule'
import moment from 'moment'

const TabList = ({TimeList,TabletList,CurrentDate,onPress}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
                        <View
                          style={{
                            paddingVertical: 0,
                            paddingHorizontal: 18,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            height: 60,
                            marginTop: 10,
                            borderLeftColor: TimeList.isSkip
                              ? "#FF6C87"
                              : TimeList.isRemind && !TimeList.isSkip
                              ? "#01EEBC"
                              : "#A9A9A9",
                            borderLeftWidth: 4,
                          }}
                        >
                          <Capsule
                            color={
                              TimeList.isSkip
                                ? "#FF6C87"
                                : TimeList.isRemind && !TimeList.isSkip
                                ? "#01EEBC"
                                : "#A9A9A9"
                            }
                            size={35}
                          />
                          <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                              {TabletList.TName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: "#626262",
                                marginTop: 4,
                              }}
                            >
                              {TabletList.Quantity} {TabletList.Condition}
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: TimeList.isSkip
                                ? "#FF6C87"
                                : TimeList.isRemind && !TimeList.isSkip
                                ? "#01EEBC"
                                : "#A9A9A9",
                            }}
                          >
                            {console.log()}
                            {(moment(new Date(CurrentDate.replace(/-/g,"/")+" "+TimeList.Time)).format("LT"))}
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
  )
}

export default TabList