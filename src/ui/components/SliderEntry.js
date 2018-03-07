import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Text} from "native-base";
import Strings from '../../utils/strings'
import colors from "../../utils/colors";

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

                    <View style={styles.buttonsContainer}>
                        <Button rounded
                                danger
                                style={styles.buttonFalse}
                                onPress={() => {
                                    this.props.onClickFalse(this.props.index, this.props.data);
                                }}
                        >
                            <Text style={styles.buttonText}>{Strings.t('button_false')}</Text>
                        </Button>

                        <Button rounded
                                style={styles.buttonTrue}
                                onPress={() => {
                                    this.props.onClickTrue(this.props.index, this.props.data);
                                }}
                        >
                            <Text style={styles.buttonText}>{Strings.t('button_true')}</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

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
    buttonFalse: {
        marginLeft: 16,
        padding: 16
    },
    buttonTrue: {
        marginLeft: 16,
        backgroundColor: colors.green,
        padding: 16
    },
    buttonText: {
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
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
    textContainer: {
        flex: 4,
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        borderTopRightRadius: entryBorderRadius,
        borderTopLeftRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    title: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: colors.white
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 16,
        color: colors.gray,
        fontSize: 20,
        fontStyle: 'italic'
    }
});