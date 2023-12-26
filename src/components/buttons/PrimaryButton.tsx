import React from 'react';
import {
  type ColorValue,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  type DimensionValue,
} from 'react-native';
import {COLOR} from 'configs/colors';
import {ms} from 'react-native-size-matters';
import {GlobalText} from 'components/texts/GlobalText';
import {FontWeight} from 'types/components/GlobalText.type';

type StyleProps = {
  backgroundColor?: COLOR | ColorValue;
  width?: DimensionValue | number;
  borderColor?: COLOR | ColorValue;
};

interface Props extends TouchableOpacityProps, StyleProps {
  title?: string;
  component?: React.ReactNode;
  color?: COLOR;
}

const PrimaryButton = ({
  backgroundColor = COLOR.PRIMARY_BLUE,
  title,
  color = COLOR.WHITE,
  style,
  width = '100%',
  component,
  borderColor,
  ...props
}: Props) => {
  const styles = useStyles({backgroundColor, width, borderColor});
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.button, style]}
      {...props}>
      {component ?? (
        <GlobalText
          textAlign="center"
          size={16}
          type={FontWeight._600}
          color={color}>
          {title}
        </GlobalText>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const useStyles = (styleProps: StyleProps) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: ms(4),
      borderRadius: ms(12),
      paddingVertical: ms(8),
      borderWidth: styleProps.borderColor ? 1 : 0,
      ...styleProps,
    },
  });
