import React from 'react';
import {GlobalText} from 'components/texts/GlobalText';
import {FontWeight} from 'types/components/GlobalText.type';
import {COLOR} from 'configs/colors';

type Props = {
  title: string;
  size?: number;
};

export const AuthTitle = ({title, size = 28}: Props) => (
  <GlobalText type={FontWeight._800} size={size} textAlign="center">
    {title}
  </GlobalText>
);

export const InputTitle = ({title}: Props) => (
  <GlobalText type={FontWeight._500} size={16} color={COLOR.NAVY_BLUE}>
    {title}
  </GlobalText>
);
