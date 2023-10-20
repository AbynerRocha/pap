import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MotiView } from 'moti'
import { backendUrl, useAuth } from '../../contexts/Auth/AuthContext'
import { Controller, useForm } from 'react-hook-form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios, { Axios, AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

type Fields = {
  code: string
}

export default function VerifyEmail() {
  const { user, setUser, authToken } = useAuth()
  const { control, setValue, formState: { errors }, setError, handleSubmit } = useForm<Fields>()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  function handleValidate(code: string) {
    return new Promise((resolve, reject) => {
      axios.post(backendUrl + 'user/auth/verify-email', { code, userId: user?._id }, { headers: { Authorization: authToken } })
        .then(() => {
          setUser({ ...user!, verified: true })

          router.replace('/')
          resolve(true)
        })
        .catch((err: AxiosError<{ error: string, message: string }>) => {
          console.log(err.response);
          
          switch(err.response?.data.error) {
            case 'MISSING_DATA': 
              setError('root', { message: err.response?.data.message })
            
            case 'INVALID_CODE':
              setError('code', { message: err.response?.data.message }, { shouldFocus: true })
              break
            default:
              setError('root', { message: 'Houve um erro desconhecido. Tente novamente mais tarde.'})
              break
          }
        })
    })
  }

  function onSubmit(data: Fields) {
    setIsLoading(true)

    handleValidate(data.code)
    .finally(() => setIsLoading(false))
  }

  return (
    <MotiView
      className='h-screen w-screen items-center justify-center'
      from={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 500
      }}
    >
      <View className='mx-7'>
        <Text className='text-2xl font-bold'>Verifique o seu Email</Text>
        <Text>Digite abaixo o código que foi enviado em seu email {'(' + user?.email + ')'}</Text>
      </View>

      <View className='w-full items-center justify-center'>
        <Controller
          name='code'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Este campo é obrigatório.'
            },
            minLength: 5,
            maxLength: 5,
            validate: (value) => parseInt(value) > 11111 && parseInt(value) < 99999 ? true : 'Código inválido.'
          }}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <View className='w-full justify-center items-center mt-5'>
                <Input
                  keyboardType='number-pad'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className='border rounded-lg border border-neutral-950 w-[80%] h-12 p-2 text-center'
                  placeholder='Digite aqui (xxxxx)'
                />
              </View>
            )
          }}
        />

        <Button
          isLoading={isLoading}
          size='sm'
          className='mt-3'
          onPress={handleSubmit(onSubmit)}
        >
          Verificar
        </Button>

        {errors.root && (
            <MotiView 
              from={{
                opacity: 0
              }}
              animate={{ 
                opacity: 1
              }}
              transition={{
                duration: 600
              }}

              className='w-[70%] flex-row items-center space-x-3 h-fit break-words p-3 rounded-lg border border-red-500 bg-red-600 mt-5'
            >
              <MaterialIcons name="error-outline" size={24} color="white" />
              <Text className='text-sm text-neutral-50 font-semibold mr-6'>{errors.root.message}</Text>
            </MotiView>
          )}
      </View>
    </MotiView>
  )
}