import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ButtonProps = {
  title: string
} & TouchableOpacityProps

export const Button = ({ title, ...rest}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...rest} 
      style={styles.button}
      >
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#ed8823',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '700',
    textTransform: 'uppercase'
  }
})
