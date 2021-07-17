import React from 'react';
import {StyleSheet} from 'react-native';
import {Fonts} from '../../common';

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerContainer: {padding: 20, flexDirection: 'row'},
  headerWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: '#000',
    fontFamily: Fonts.MontserratBold,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Fonts.MontserratLight,
    color: '#9E9E9E',
  },
  logoWrapper: {
    width: 60,
    height: 60,
  },
  cardContainer: {
    width: 180,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginVertical: 5,
    padding: 15,
    ...shadow,
  },
  cardText: {
    fontSize: 17,
    fontFamily: Fonts.MontserratRegular,
  },
});

export default styles;
