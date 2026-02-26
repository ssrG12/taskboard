import { useState } from 'react'
import { CameraResult } from '../types'
import { NativeModules, Platform, PermissionsAndroid, Alert } from 'react-native'

const { CameraModule } = NativeModules

export const useCamera = () => {
  const [isLoading, setIsLoading] = useState(false)

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform?.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'Permiso de Cámara',
          message: 'TaskDashboard necesita acceso a la cámara',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        })
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        return false
      }
    }
    return true
  }

  const takePicture = async (): Promise<CameraResult | null> => {
    setIsLoading(true)
    try {
      const hasPermission = await requestCameraPermission()
      if (!hasPermission) {
        Alert.alert('Permiso denegado', 'Necesitas dar permiso de cámara para usar esta función')
        return null
      }
      const result = await CameraModule.takePicture()
      return result
    } catch (error: any) {
      if (error?.code !== 'CAMERA_CANCELLED') {
        Alert.alert('Error', 'No se pudo tomar la foto')
      }
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    takePicture,
  }
}