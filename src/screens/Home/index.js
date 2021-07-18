import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Fonts} from '../../common';
import styles from './styles';
import {PowerIcon} from '../../../assets/power.svg';
import PhoneIcon from '../../../assets/phone.svg';
import ToolsIcon from '../../../assets/tools.svg';
import ArticleIcon from '../../../assets/article.svg';
import ChevronIcon from '../../../assets/chevron.svg';

import {SvgXml} from 'react-native-svg';
import {State} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';

const logo = require('../../../assets/car_logo.png');

const {width} = Dimensions.get('window');

const options = [
  {
    icon: PowerIcon,
    title: 'Start your engine',
    screen: null,
  },
  {
    icon: ToolsIcon,
    title: 'Car inspection',
    screen: 'Details',
  },
  {
    icon: ArticleIcon,
    title: 'Documentation',
    screen: null,
  },
  {
    icon: PhoneIcon,
    title: 'Emergency',
    screen: null,
  },
];

const myCars = [
  {
    plate: 'WXD 1234',
    model: '2017 Honda Civic',
    connected: 1,
    image: require('../../../assets/2017_honda_civic.png'),
  },
  {
    plate: 'WMI 1234',
    model: '2017 Honda CR-V',
    connected: 1,
    image: require('../../../assets/2017_honda_crv.png'),
  },
  {
    plate: 'WMI 1234',
    model: '2017 Honda CR-V',
    connected: 0,
    image: require('../../../assets/2017_honda_crv.png'),
  },
];

const Home = () => {
  const carouselRef = useRef();
  const animationRef = useRef();
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(0);

  const _onPressOption = item => {
    const {screen} = item;
    switch (screen) {
      case 'Details':
        navigation.navigate('Details', {data: item});
        break;
      default:
        break;
    }
    if (item?.screen) {
    } else {
      Alert.alert(item.title);
    }
  };

  const _onBeforeSnapToItem = () => {
    if (animationRef?.current) {
      animationRef.current.slideOutLeft();
      //   animationRef.current.slideInLeft();
    }
  };

  const _onChangeCar = index => {
    if (carouselRef?.current) {
      // console.log(carouselRef.current);
      carouselRef.current.snapToItem(index);
    }
  };

  const _onSnapToItem = index => {
    if (animationRef?.current) {
      //   animationRef.current.slideOutLeft();
      animationRef.current.slideInLeft();
    }
    setSelectedCar(index);
  };

  const _renderOptionIcon = index => {
    switch (index) {
      case 0:
        return <SvgXml xml={PowerIcon} fill="#C62828" />;
      case 1:
        return <SvgXml xml={ToolsIcon} fill="#29B6F6" />;
      case 2:
        return <SvgXml xml={ArticleIcon} fill="#673AB7" />;
      case 3:
        return <SvgXml xml={PhoneIcon} fill="#C62828" />;
      default:
        return null;
    }
  };
  const _renderOption = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={() => {
          _onPressOption(item);
        }}>
        <View style={styles.cardContainer}>
          <View style={{flex: 1}}>
            {/* <PhoneIcon width={10} height={10} /> */}
            {_renderOptionIcon(index)}
          </View>
          <Text allowFontScaling={false} style={styles.cardText}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderCarItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={
            index === 0
              ? {
                  height: 270,
                  marginRight: -120,
                  ...Platform.select({
                    ios: {
                      height: 300,
                    },
                  }),
                }
              : {
                  height: 210,
                  marginRight: -120,
                  marginBottom: index > 0 && 30,
                  ...Platform.select({
                    ios: {height: 250},
                  }),
                }
          }>
          <Image
            source={item.image}
            style={{
              height: index === 0 ? '100%' : '100%',
              width: index === 0 ? '100%' : '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <View style={styles.headerWrapper}>
          <Text allowFontScaling={false} style={styles.title}>
            Hello Faris
          </Text>
          <Text allowFontScaling={false} style={styles.subtitle}>
            Have a nice drive
          </Text>
        </View>
        <View style={styles.logoWrapper}>
          <Image
            source={logo}
            style={{resizeMode: 'contain', width: '100%', height: '100%'}}
          />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: '1%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {options.map(_renderOption)}
      </View>
      <View style={{flex: 1}}>
        <Animatable.View
          ref={animationRef}
          animation="slideInLeft"
          delay={100}
          duration={500}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 1,
            ...Platform.select({
              ios: {top: 40, left: 20},
            }),
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: '#000',
              fontSize: 18,
              fontFamily: Fonts.MontserratBold,
              ...Platform.select({
                ios: {
                  fontSize: 20,
                },
              }),
            }}>
            {myCars[selectedCar].plate}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: '#000',
              fontWeight: 'normal',
              fontSize: 16,
              ...Platform.select({ios: {fontSize: 18}}),
            }}>
            {myCars[selectedCar].model}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: myCars[selectedCar].connected ? '#66BB6A' : '#F57C00',
              fontWeight: 'normal',
              fontSize: 12,
              marginVertical: 5,
              ...Platform.select({ios: {fontSize: 14}}),
            }}>
            {myCars[selectedCar].connected
              ? 'Connection successful'
              : 'Connection failed'}
          </Text>
        </Animatable.View>
        <Carousel
          ref={carouselRef}
          data={myCars}
          renderItem={_renderCarItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={_onSnapToItem}
          inactiveSlideOpacity={0}
          onBeforeSnapToItem={_onBeforeSnapToItem}
          lockScrollWhileSnapping
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginHorizontal: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert('Add new car');
          }}>
          <View
            style={{
              backgroundColor: '#D32F2F',
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 7,
              marginBottom: 50,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: '#FFF',
                fontFamily: Fonts.MontserratRegular,
                fontSize: 14,
              }}>
              Add new car
            </Text>
          </View>
        </TouchableOpacity>
        <Pagination
          carouselRef={carouselRef}
          tappableDots={true}
          activeDotIndex={selectedCar}
          dotsLength={myCars.length}
          containerStyle={{
            paddingTop: 7,
          }}
          dotContainerStyle={{marginHorizontal: 3}}
          dotStyle={{
            width: 13,
            height: 13,
            borderRadius: 10,
            backgroundColor: '#757575',
          }}
          inactiveDotStyle={{
            width: 13,
            height: 13,
            borderRadius: 10,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#757575',
          }}
          inactiveDotScale={1}
        />
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          {selectedCar > 0 && selectedCar <= myCars.length - 1 && (
            <TouchableOpacity
              onPress={() => {
                _onChangeCar(selectedCar - 1);
              }}>
              <SvgXml
                xml={ChevronIcon}
                fill="#9E9E9E"
                style={{
                  transform: [{rotate: '180deg'}],
                  marginHorizontal: 10,
                }}
              />
            </TouchableOpacity>
          )}
          {selectedCar < myCars.length - 1 && (
            <TouchableOpacity
              onPress={() => {
                _onChangeCar(selectedCar + 1);
              }}>
              <SvgXml xml={ChevronIcon} fill="#9E9E9E" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;
