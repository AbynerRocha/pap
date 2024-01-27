import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Input from '../../components/Input'
import { MotiView, useAnimationState } from 'moti'
import { Accordion, Divider, Menu } from 'native-base'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import BarChart from '../../components/Chart/Bar'


export default function Test() {
  const [show, setShow] = useState(false)

  const data = [
    { value: 1, label: 'Dez/12' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ]

  return (
    <View className='w-full items-center justify-center'>
      <BarChart 
        data={data}
        height={150}
        width={500}
        barWidth={32}
        labelSize={20}
        animated

      />
    </View>
  )
}