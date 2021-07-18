import React from 'react';
import {Platform, StyleSheet} from 'react-native';
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
    paddingBottom: 60,
    ...Platform.select({ios: {paddingBottom: 40}}),
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    ...Platform.select({
      ios: {paddingTop: 10, paddingBottom: 10},
    }),
  },
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
    width: 170,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginVertical: 5,
    padding: 15,
    ...shadow,
    ...Platform.select({
      ios: {
        width: 180,
        height: 90,
      },
    }),
  },
  cardText: {
    fontFamily: Fonts.MontserratRegular,
    ...Platform.select({
      ios: {fontSize: 17},
      android: {fontSize: 15},
    }),
  },
});

export default styles;
