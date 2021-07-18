import React from 'react';
import {View, Text} from 'react-native';
import {Fonts} from '../../common';

const About = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontFamily: Fonts.MontserratSemiBold,
          fontSize: 30,
          color: '#BDBDBD',
        }}>
        Coming Soon
      </Text>
    </View>
  );
};

export default About;
