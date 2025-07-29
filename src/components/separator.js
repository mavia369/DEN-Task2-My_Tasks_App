import React from 'react'
import { View, StyleSheet } from 'react-native'

const Separator = (props) => {
  return (
    <View style={[styles.separator, { borderBottomColor: props.color }]} />
  )
}

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    marginVertical:5
  },
})

export default Separator