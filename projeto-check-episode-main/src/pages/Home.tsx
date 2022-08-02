import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';

import axios from 'axios'

import { Info } from '../types/Info';
import { Episode } from '../types/Episode';

import { EpisodeItem } from '../components/EpisodeItem';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';
import { getEmail, getEpisodesCheckedFromStorage, storeEmail, storeEpisodesChecked } from '../utils/asyncStorage';
import { StatusBar } from 'expo-status-bar';

type EpisodeList = {
  info: Info
  results: Episode[]
}

export default function Home({ navigation }: any) {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [info, setInfo] = useState<Info>()
  const [episodesCheckedIds, setEpisodesCheckedIds] = useState<number[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const axiosConfiguration = {
    baseURL: 'https://rickandmortyapi.com/api'
  }

  useEffect(() => {
    getEpisodesCheckedFromStorageAsync()
    listEpisodes()
  }, [])

  const listEpisodes = () => {
    setIsLoading(true)

    axios
      .create(axiosConfiguration)
      .get<EpisodeList>('/episode')
      .then(response => {
        setEpisodes(response.data.results)
        setInfo(response.data.info)
      })
      .finally(() => setIsLoading(false))
  }

  const listMoreEpisodes = () => {
    if (info?.next) {
      setIsLoadingMore(true)

      axios
        .get<EpisodeList>(info.next)
        .then(response => {
          setEpisodes([...episodes, ...response.data.results])
          setInfo(response.data.info)
        })
        .finally(() => setIsLoadingMore(false))
    }
  }

  const handleChange = (episodeId: number) => {
    if (episodesCheckedIds.includes(episodeId)) {
      storeEpisodesCheckedAsync(episodesCheckedIds.filter(id => id !== episodeId))
    } else {
      storeEpisodesCheckedAsync([...episodesCheckedIds, episodeId])
    }
  }

  const storeEpisodesCheckedAsync = async (ids: number[]) => {
    await storeEpisodesChecked(await getEmail(), ids)
    setEpisodesCheckedIds(ids)
  }

  const getEpisodesCheckedFromStorageAsync = async () => {
    setEpisodesCheckedIds(await getEpisodesCheckedFromStorage(await getEmail()) || [])
  }

  const logout = async () => {
    await storeEmail(null)
    navigation.dispatch(
      StackActions.replace('Auth')
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>

        <Image style={styles.logo} source={require('../../assets/logo.png')} />

        {isLoading ? <Spinner /> : (
          <>
            {episodes.map(episode => (
              <EpisodeItem
                key={episode.id}
                episode={episode}
                isChecked={episodesCheckedIds.includes(episode.id)}
                onChange={() => handleChange(episode.id)} />
            ))}

            {isLoadingMore ? <Spinner /> : (
              <>
                {info?.next && (
                  <Button title="Carregar mais" onPress={listMoreEpisodes} />
                )}
              </>
            )}
          </>
        )}
        
      </ScrollView>
      <StatusBar style="light" backgroundColor="#18173f" translucent={false} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18173f',
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingTop: 32
  },
  logout: {
    alignSelf: 'flex-end',
    color: '#fff',
    fontSize: 16,
  },
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 32,
  }
})
