import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeEmail = async (email: string | null) => {
  try {
    await AsyncStorage.setItem('@email', email || '')
  } catch (e) {
    console.log(e)
  }
}

export const getEmail = async () => {
  try {
    return await AsyncStorage.getItem('@email') || ''
  } catch(e) {
    return ''
  }
}

export const storeEpisodesChecked = async (email: string, ids: number[]) => {
  try {
    const jsonValue = JSON.stringify(ids)
    await AsyncStorage.setItem(`@episodes_ids_${email}`, jsonValue)
  } catch (e) {
    console.log(e)
  }
}

export const getEpisodesCheckedFromStorage = async (email: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@episodes_ids_${email}`)
    return (jsonValue != null ? JSON.parse(jsonValue) : [])
  } catch(e) {
    return []
  }
}