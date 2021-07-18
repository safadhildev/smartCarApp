import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import {SvgXml} from 'react-native-svg';

import BackIcon from '../../../assets/back.svg';
import ChevronIcon from '../../../assets/chevron.svg';
import {Fonts} from '../../common';

const carRedTop = require('../../../assets/car_red_top.png');

const {width} = Dimensions.get('window');

const sample = [
  {
    description: 'FIRST ITEM',
    wheelSize: `16"`,
    tyreSize: '215/55R16',
    frontTyre: {
      remainingKpa: 224,
      totalKpa: 240,
      remainingPsi: 32,
      totalPsi: 35,
    },
    backTyre: {
      remainingKpa: 218,
      totalKpa: 240,
      remainingPsi: 30,
      totalPsi: 35,
    },
    image: null,
  },
  {
    description: 'FIRST ITEM',
    wheelSize: `16"`,
    tyreSize: '215/55R16',
    frontTyre: {
      remainingKpa: 224,
      totalKpa: 240,
      remainingPsi: 32,
      totalPs1: 35,
    },
    backTyre: {
      remainingKpa: 218,
      totalKpa: 240,
      remainingPsi: 30,
      totalPsi: 35,
    },
    image: null,
  },
];

const styles = StyleSheet.create({
  labelText: {
    fontFamily: Fonts.MontserratBold,
    color: '#757575',
    fontSize: 14,
  },
  text: {
    fontFamily: Fonts.MontserratSemiBold,
    color: '#424242',
    fontSize: 18,
    marginVertical: 0,
    marginTop: 5,
  },
  swipeText: {
    fontFamily: Fonts.MontserratSemiBold,
    color: '#BDBDBD',
    fontSize: 18,
  },
});

const slideOut = {
  from: {
    translateX: 0,
  },
  to: {
    translateX: Platform.OS === 'ios' ? 205 : 195,
  },
};

const fadeOut = {
  from: {
    opacity: 1,
    translateX: Platform.OS === 'ios' ? 205 : 200,
  },
  to: {
    opacity: 0,
    translateX: Platform.OS === 'ios' ? 205 : 200,
  },
};

const Details = () => {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [cIndex, setCIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animationSeq, setAnimationSeq] = useState(0);

  const _getData = async () => {
    try {
      setData(sample);
    } catch (e) {
      console.log({e});
    }
  };

  useEffect(() => {
    _getData();
  }, []);

  const _onBack = () => {
    navigation.goBack();
  };

  const _onSnapToItem = index => {
    setCIndex(index);
  };

  const _onBeforeSnapToItem = () => {
    setCIndex(0);
  };

  const _renderProgress = (remaining, total) => {
    const remainingPercentage = (remaining / total) * 100;

    return (
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: 5,
          backgroundColor: '#BDBDBD',
          marginVertical: 5,
          borderRadius: 10,
        }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            width: `${remainingPercentage}%`,
            height: 5,
            backgroundColor: '#66BB6A',
            borderRadius: 10,
          }}></View>
      </View>
    );
  };

  const _renderCard = ({
    remainingKpa,
    totalKpa,
    remainingPsi,
    totalPsi,
    title,
  }) => {
    return (
      <View
        style={{
          width: 240,
          marginTop: 30,
          padding: 15,
          backgroundColor: '#FFF',
          borderRadius: 10,
        }}>
        <Animatable.Text
          animation={cIndex === 0 ? 'slideInRight' : 'slideInLeft'}
          style={styles.labelText}>
          {title}
        </Animatable.Text>

        <Animatable.View
          animation={cIndex === 0 ? 'slideInRight' : 'slideInLeft'}>
          {_renderProgress(remainingKpa, totalKpa)}
        </Animatable.View>
        <Animatable.Text
          animation={cIndex === 0 ? 'slideInRight' : 'slideInLeft'}
          style={styles.text}>
          {remainingKpa} / {totalKpa} Kpa
        </Animatable.Text>
        <Animatable.Text
          animation={cIndex === 0 ? 'slideInRight' : 'slideInLeft'}
          style={styles.text}>
          {remainingPsi} / {totalPsi} Psi
        </Animatable.Text>
      </View>
    );
  };

  const _renderItem = ({item, index}) => {
    switch (index) {
      case 0:
        return (
          <View style={{flex: 1}}>
            <Animatable.View
              animation={animationSeq === 1 && 'slideInLeft'}
              style={{
                paddingLeft: 20,
                paddingTop: 30,
                opacity: animationSeq == 0 ? 0 : 1,
              }}>
              <Animatable.View animation={cIndex === 0 && 'slideInRight'}>
                <Text style={styles.labelText}>Tyre Details</Text>
                <Text style={styles.text}>Wheel Size: {item.wheelSize}</Text>
                <Text style={styles.text}>Tyre Size: {item.tyreSize}</Text>
              </Animatable.View>
              <View style={{marginTop: 20}}>
                {_renderCard({
                  remainingKpa: item.frontTyre.remainingKpa,
                  remainingPsi: item.frontTyre.remainingPsi,
                  totalKpa: item.frontTyre.totalKpa,
                  totalPsi: item.frontTyre.totalPsi,
                  title: 'Front Tyre Pressure',
                })}
              </View>
              <View style={{marginTop: 60}}>
                {_renderCard({
                  remainingKpa: item.backTyre.remainingKpa,
                  remainingPsi: item.backTyre.remainingPsi,
                  totalKpa: item.backTyre.totalKpa,
                  totalPsi: item.backTyre.totalPsi,
                  title: 'Rear Tyre Pressure',
                })}
              </View>
              <Animatable.View
                animation={cIndex === 0 && 'slideInRight'}
                style={{
                  marginTop: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SvgXml
                  xml={ChevronIcon}
                  fill="#BDBDBD"
                  style={{transform: [{rotate: '180deg'}], marginRight: 5}}
                />
                <Text style={[styles.swipeText]}>Swipe for right side</Text>
              </Animatable.View>
            </Animatable.View>
            <Animatable.View
              ref={animationRef}
              animation={_animateBySeq()}
              duration={1000}
              onAnimationEnd={event => {
                if (animationSeq === 0) setAnimationSeq(1);
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                ...Platform.select({ios: {left: 10}}),
              }}>
              <Image
                source={carRedTop}
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
              />
            </Animatable.View>
          </View>
        );
      case 1:
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: -200,
              }}>
              <Image
                source={carRedTop}
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                paddingRight: 20,
                paddingTop: 30,
                right: 0,
              }}>
              <Animatable.View animation={cIndex === 1 && 'slideInLeft'}>
                <Text style={styles.labelText}>Tyre Details</Text>
                <Text style={styles.text}>Wheel Size: {item.wheelSize}</Text>
                <Text style={styles.text}>Tyre Size: {item.tyreSize}</Text>
              </Animatable.View>
              <View style={{marginTop: 20}}>
                {_renderCard({
                  remainingKpa: item.frontTyre.remainingKpa,
                  remainingPsi: item.frontTyre.remainingPsi,
                  totalKpa: item.frontTyre.totalKpa,
                  totalPsi: item.frontTyre.totalPsi,
                  title: 'Front Tyre Pressure',
                })}
              </View>
              <View style={{marginTop: 60}}>
                {_renderCard({
                  remainingKpa: item.backTyre.remainingKpa,
                  remainingPsi: item.backTyre.remainingPsi,
                  totalKpa: item.backTyre.totalKpa,
                  totalPsi: item.backTyre.totalPsi,
                  title: 'Rear Tyre Pressure',
                })}
              </View>
              <Animatable.View
                animation={cIndex === 1 && 'slideInLeft'}
                style={{
                  marginTop: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.swipeText]}>Swipe for left side</Text>
                <SvgXml
                  xml={ChevronIcon}
                  fill="#BDBDBD"
                  style={{marginLeft: 5}}
                />
              </Animatable.View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const _animateBySeq = () => {
    switch (animationSeq) {
      case 0:
        return 'fadeInUp';
      case 1:
        return slideOut;
      case 2:
        return fadeOut;
      default:
        return 'fadeOut';
    }
  };

  return (
    <View style={{flex: 1}}>
      <>
        <TouchableOpacity
          onPress={() => {
            _onBack();
          }}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            ...Platform.select({
              ios: {
                top: 10,
                left: 20,
              },
            }),
          }}>
          <SvgXml xml={BackIcon} />
        </TouchableOpacity>
        <Animatable.Text
          animation={animationSeq === 1 && 'fadeIn'}
          style={{
            position: 'absolute',
            marginTop: 50,
            marginHorizontal: 20,
            fontSize: 32,
            fontFamily: Fonts.MontserratBold,
            opacity: animationSeq === 1 ? 1 : 0,
          }}>
          Tyre Air Pressure
        </Animatable.Text>
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={_onSnapToItem}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onBeforeSnapToItem={_onBeforeSnapToItem}
          containerCustomStyle={{paddingVertical: 50, marginTop: 30}}
          lockScrollWhileSnapping
        />
      </>
    </View>
  );
};

export default Details;
