import React from 'react';
import {GlobalText} from 'components/texts/GlobalText';
import {StyleSheet, View} from 'react-native';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {FontWeight} from 'types/components/GlobalText.type';
import {useCurrentNavigation} from 'hooks/useCurrentNavigation';

const Welcome = () => {
  const {navigate} = useCurrentNavigation();

  const onLogout = () => navigate('Landing');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <GlobalText type={FontWeight._800} size={40} textAlign="center">
          Welcome
        </GlobalText>
      </View>
      <PrimaryButton title="Logout" onPress={onLogout} />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  content: {
    flex: 0.4,
    justifyContent: 'center',
  },
});
