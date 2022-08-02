import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Button } from './Button';
import { Spinner } from './Spinner';
import { storeEmail } from '../utils/asyncStorage';

import axios from 'axios'

const axiosConfiguration = {
  baseURL: 'https://reqres.in/api'
}

export type FormSignUpProps = {
  onGoToHome(): void
}

export const FormSignUp = ({ onGoToHome }: FormSignUpProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const register = () => {
    setIsLoading(true)

    axios
      .create(axiosConfiguration)
      .post('/register', {
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

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput 
          style={styles.field}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true} 
          textContentType="password" 
        />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            
            <Button 
              title="Cadastrar" 
              onPress={register}
              disabled={!email || !password || password !== confirmPassword} 
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
