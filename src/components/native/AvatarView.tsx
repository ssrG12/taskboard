import React from 'react';
import { requireNativeComponent, ViewStyle, StyleProp } from 'react-native';

interface AvatarViewProps {
  name: string;
  style?: StyleProp<ViewStyle>;
}

// Importar el componente nativo
const NativeAvatarView = requireNativeComponent<AvatarViewProps>('AvatarView');

export const AvatarView: React.FC<AvatarViewProps> = ({ name, style }) => {
  return <NativeAvatarView name={name} style={style} />;
};