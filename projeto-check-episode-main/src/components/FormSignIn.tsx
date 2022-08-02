import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Button } from './Button';
import { Spinner } from './Spinner';
import { storeEmail } from '../utils/asyncStorage';

import axios from 'axios'

const axiosConfiguration = {
  baseURL: 'https://reqres.in/api'
}

export type FormSignInProps = {
  onGoToHome(): void
}

export const FormSignIn = ({ onGoToHome }: FormSignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const login = () => {
    setIsLoading(true)

    axios
      .create(axiosConfiguration)
      .post('/login', {
        email,
        password
      })
      .then(async () => {
        await storeEmail(email)
        onGoToHome()
      })
      .catch(error => {
        if (error?.response?.data?.error) {
          setErrorMessage(error.response.data.error)
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <View>
       <Text style={styles.label}>E-mail</Text>
        <TextInput 
          style={styles.field} 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" 
          textContentType="emailAddress" 
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput 
          style={styles.field}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true} 
          textContentType="password" 
        />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            
            <Button 
              title="Login" 
              onPress={login}
              disabled={!email || !password} 
            />
          </>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center'
  },
  field: {
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    color: '#fff',
    fontSize: 18,
    height: 40,
    marginBottom: 16,
    textAlign: 'center'
  },
  errorMessage: {
    color: '#ff0000',
    paddingTop: 16,
    textAlign: 'center'
  }
})
