import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {Fonts} from '.';

const styles = StyleSheet.create({
  container: {
    height: 0,
  },
  background: {
    position: 'absolute',
    height: 80,
    right: 0,
    left: 0,
    zIndex: 1,
    bottom: -45,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000',
  },
  shape: {
    display: 'flex',
    width: 170,
    height: 200,
    backgroundColor: '#FFF',
    borderRadius: 200,

    transform: [{scaleX: 3}, {rotate: '0deg'}],
  },
  navContainer: {
    flex: 1,
    // backgroundColor: '#000',
    position: 'absolute',
    height: 95,
    right: 0,
    zIndex: 2,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftNav: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 100,
    // backgroundColor: '#000',
    marginTop: 10,
    // paddingHorizontal: 20,
  },
  centerNav: {
    flex: 1,
    alignItems: 'center',
  },
  rightNav: {
    flex: 1,
    borderTopRightRadius: 100,
    alignItems: 'center',
    marginTop: 10,
    // paddingHorizontal: 20,
  },
  centerNavText: {
    fontFamily: Fonts.MontserratRegular,
    marginTop: 25,
    fontSize: 16,
  },
  leftNavText: {
    fontFamily: Fonts.MontserratRegular,
    marginTop: 30,
    fontSize: 16,
    marginLeft: 20,
  },
  sideNavText: {
    fontFamily: Fonts.MontserratRegular,
    marginTop: 30,
    fontSize: 16,
    marginRight: 20,
  },
  activeBorder: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: '50%',
    alignSelf: 'center',
  },
  centerActive: {
    width: 50,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 5,
  },
});

const Tab = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  console.log({state});

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const _activeLine = () => {
    if (state?.index === 0) {
      return null;
    }
    if (state?.index === 1) {
      return (
        <Svg height="100" width="100">
          <Line x1="0" y1="0" x2="100" y2="100" stroke="red" strokeWidth="2" />
        </Svg>
      );
    }
    if (state?.index === 2) {
      return null;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.shape}></View>
      </View>
      <View style={styles.navContainer}>
        <View style={styles.activeBorder}>
          {state?.index === 0 && (
            <View
              style={{
                position: 'relative',
                width: 50,
                height: 4,
                borderRadius: 10,
                backgroundColor: '#C62828',
                left: -155,
                top: 11,
                transform: [{rotate: '-10deg'}],
              }}></View>
          )}
          {state?.index === 1 && (
            <View
              style={{
                position: 'relative',
                left: '-50%',
                width: 50,
                height: 4,
                borderRadius: 10,
                backgroundColor: '#C62828',
              }}></View>
          )}
          {state?.index === 2 && (
            <View
              style={{
                position: 'relative',
                width: 50,
                height: 4,
                borderRadius: 10,
                backgroundColor: '#C62828',
                left: 105,
                top: 10,
                transform: [{rotate: '10deg'}],
              }}></View>
          )}
        </View>
        <TouchableOpacity
          style={styles.leftNav}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View>
            <Text
              style={[
                styles.leftNavText,
                state?.index === 0 && {
                  fontFamily: Fonts.MontserratBold,
                  fontSize: 16,
                },
              ]}>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.centerNav}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <View>
            {state?.index === 1 && <View></View>}
            <Text
              style={[
                styles.centerNavText,
                state?.index === 1 && {
                  fontFamily: Fonts.MontserratBold,
                  fontSize: 16,
                },
              ]}>
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightNav}
          onPress={() => {
            navigation.navigate('About');
          }}>
          <View>
            {state?.index === 2 && <View></View>}
            <Text
              style={[
                styles.sideNavText,
                state?.index === 2 && {
                  fontFamily: Fonts.MontserratBold,
                  fontSize: 16,
                },
              ]}>
              Locate Us
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tab;
