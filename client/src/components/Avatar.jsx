import React from 'react';
import { default as BoringAvatar } from 'boring-avatars';

export default function Avatar({ name, variant, size, square }) {
  return <BoringAvatar size={size} name={name} variant={variant} square={square} colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']} />;
}
