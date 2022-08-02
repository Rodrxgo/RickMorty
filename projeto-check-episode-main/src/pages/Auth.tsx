import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackActions } from '@react-navigation/native'

import { FormSignIn } from '../components/FormSignIn';
import { FormSignUp } from '../components/FormSignUp';
import { StatusBar } from 'expo-status-bar';

enum MODE {
  SIGNIN = 'SIGNIN',
  REGISTER = 'REGISTER'
}

export default function Auth({ navigation }: any) {
  const [actualMode, setActualMode] = useState(MODE.SIGNIN)

  const isSignInMode = actualMode === MODE.SIGNIN

  const handleGoToHome = () => {
    navigation.dispatch(
      StackActions.replace('Home')
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />

        <View style={styles.mode}>
          <TouchableOpacity 
            style={isSignInMode ? styles.modeButtonBordered : styles.modeButton}
            onPress={() => setActualMode(MODE.SIGNIN)}>
            <Text style={styles.modeText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={!isSignInMode ? styles.modeButtonBordered : styles.modeButton}
            onPress={() => setActualMode(MODE.REGISTER)}>
            <Text style={styles.modeText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {isSignInMode ? (
          <FormSignIn onGoToHome={handleGoToHome} />
        ): (
          <FormSignUp onGoToHome={handleGoToHome} />
        )}

        <StatusBar style="light" backgroundColor="#18173f" translucent={false} />
      </ScrollView>
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
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  mode: {
    flexDirection: 'row',
    marginVertical: 32
  },
  modeButton: {
    flex: 1,
    padding: 8
  },
  modeButtonBordered: {
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 8
  },
  modeText: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})
