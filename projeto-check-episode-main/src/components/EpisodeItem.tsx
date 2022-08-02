import React from 'react'
import Checkbox from 'expo-checkbox'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"

import { Episode } from "../types/Episode"

export type EpisodeItemProps = {
  episode: Episode
  isChecked: boolean
  onChange(): void
}

export const EpisodeItem = ({ episode, isChecked, onChange }: EpisodeItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <View style={styles.container}>
        <Checkbox value={isChecked} />
        <View style={styles.info}>
          <Text style={styles.name}>{episode.name}</Text>
          <Text style={styles.episode}>{episode.episode}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
  },
  info: {
    marginLeft: 8
  },
  name: {
    color: '#FFF',
    fontWeight: '700'
  },
  episode: {
    color: '#FFF',
    marginTop: 4
  }
})
