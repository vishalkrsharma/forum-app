import React from 'react';
import { default as BoringAvatar } from 'boring-avatars';

export default function Avatar({ name, variant }) {
  return <BoringAvatar size={40} name={name} variant={variant} colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']} />;
}
