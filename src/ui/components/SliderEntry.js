import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Dimensions, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Text} from "native-base";
import Strings from '../../utils/strings'

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render() {
        const {data: {category, question}} = this.props;

        const uppercaseTitle = category ? (
            <Text
                style={styles.title}
                numberOfLines={2}
            >
                {category.toUpperCase()}
            </Text>
        ) : false;

        return (
            <View
                activeOpacity={1}
                style={styles.slideInnerContainer}
            >
                <View style={styles.shadow}/>
                {/*<View style={styles.imageContainer}>*/}
                {/*<View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}/>*/}
                {/*</View>*/}

                <View style={styles.textContainer}>
                    {uppercaseTitle}

                    <View style={{flex: 1}}>
                        <Text
                            style={styles.subtitle}
                            numberOfLines={2}
                        >
                            {entities.decode(question)}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Button rounded
                                danger
                                style={{
                                    padding: 16
                                }}
                                onPress={() => {
                                    this.props.onClickFalse(this.props.index, this.props.data);
                                }}
                        >
                            <Text style={{fontWeight: 'bold'}}>{Strings.t('button_false')}</Text>
                        </Button>

                        <Button rounded
                                style={{marginLeft: 16, backgroundColor: '#009933', padding: 16}}
                                onPress={() => {
                                    this.props.onClickTrue(this.props.index, this.props.data);
                                }}
                        >
                            <Text style={{fontWeight: 'bold'}}>{Strings.t('button_true')}</Text>
                        </Button>
                    </View>

                </View>


            </View>
        );
    }
}

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD',
    green: '#009933'
};

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.35;
const slideWidth = wp(94);
const itemHorizontalMargin = wp(3);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin;

const entryBorderRadius = 8;

const styles = StyleSheet.create({
    slideInnerContainer: {
        alignSelf: 'center',
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        flex: 4,
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderTopRightRadius: entryBorderRadius,
        borderTopLeftRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 16,
        color: colors.gray,
        fontSize: 20,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});