import {COLOR} from 'configs/colors';
import type {TextProps} from 'react-native';

export enum FontWeight {
  _100 = 'Thin',
  _100I = 'ThinItalic',
  _200 = 'ExtraLight',
  _200I = 'ExtraLightItalic',
  _300 = 'Light',
  _300I = 'LightItalic',
  _400 = 'Regular',
  _400I = 'Italic',
  _500 = 'Medium',
  _500I = 'MediumItalic',
  _600 = 'SemiBold',
  _600I = 'SemiBoldItalic',
  _700 = 'Bold',
  _700I = 'BoldItalic',
  _800 = 'ExtraBold',
  _800I = 'ExtraBoldItalic',
  _900 = 'Black',
  _900I = 'BlackItalic',
}

export type TTextAlign = 'left' | 'auto' | 'right' | 'center' | 'justify';

export interface IGlobalText extends TextProps {
  color?: COLOR;
  size?: number;
  type?: FontWeight;
  textAlign?: TTextAlign;
}
