import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {GlobalText} from 'components/texts/GlobalText';
import {FontWeight} from 'types/components/GlobalText.type';
import {COLOR, TRANSPARENCY_HEX_COLOR} from 'configs/colors';
import {ms} from 'react-native-size-matters';
import PrimaryButton from 'components/buttons/PrimaryButton';

const LandingAuth = () => {
  return (
    <ImageBackground
      source={require('assets/images/landing.png')}
      imageStyle={styles.backgroundImage}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <GlobalText
            size={ms(18)}
            color={COLOR.WHITE}
            type={FontWeight._700}
            textAlign="center">
            Empower Ocean Beyond Limits
          </GlobalText>
          <GlobalText
            size={ms(16)}
            color={COLOR.WHITE}
            type={FontWeight._500}
            textAlign="center">
            Elevate your maritime experience with our Adaptive Offshore
            Solutions
          </GlobalText>
        </View>
        <View style={styles.content}>
          <PrimaryButton title="Login" />
          <PrimaryButton
            title="Register"
            color={COLOR.DARK_TEXT}
            backgroundColor={COLOR.LIGHT_BACKGROUND}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LandingAuth;

const styles = StyleSheet.create({
  backgroundImage: {
    opacity: 0.95,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 0.25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLOR.CYAN_BLUE + TRANSPARENCY_HEX_COLOR._70,
    paddingHorizontal: ms(16),
    paddingTop: ms(12),
    paddingBottom: ms(20),
  },
  content: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});
