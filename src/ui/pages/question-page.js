import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions, Text} from "react-native";
import {Button, Card, Container, Content, Header, Icon} from "native-base";
import {connect} from "react-redux";
import * as questionActions from "../../redux/actions/questions";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry, {itemWidth, sliderWidth} from "../components/SliderEntry";
import {NavigationActions} from 'react-navigation'

class QuestionPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        };
    }

    componentDidMount() {
        this.props.fetchQuestions();
    }

    onAnswerClicked = (response, item, index) => {
        this.carousel.snapToNext();
        this.props.answer(response, item, index);

        if (index === this.props.questions.length - 1) {
            this.props.navigation.dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'ResultPage'})
                    ]
                }));
        }
    };

    renderItem = ({item, index}) => {
        return (<SliderEntry
            data={item}
            index={index}
            onClickTrue={(index, item) => {
                console.warn("clicked");
                this.onAnswerClicked(true, item, index);
            }}
            onClickFalse={(index, item) => {
                console.warn("clicked");
                this.onAnswerClicked(false, item, index);
            }}
        />);
    };

    render() {
        if (this.props.loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#333333"}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={styles.exampleContainer}>
                <Carousel
                    ref={(ref) => {
                        this.carousel = ref;
                    }}
                    data={this.props.questions}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={1}
                    enableMomentum={false}
                    activeSlideAlignment={'start'}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    activeAnimationType={'spring'}
                    layout={'tinder'}
                    activeAnimationOptions={{
                        friction: 4,
                        tension: 40
                    }}
                    scrollEnabled={false}
                    useScrollView={false}
                    scrollToIndex={{animated: true, index: this.state.index}}
                />

                <Pagination
                    dotsLength={this.props.questions.length}
                    activeDotIndex={this.props.currentIndex}
                    containerStyle={{
                        paddingVertical: 1
                    }}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 4,
                        marginHorizontal: 1
                    }}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        )
    }
}

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        flex: 1,
        backgroundColor: '#333333',
        paddingVertical: 30
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});

const mapStateToProps = state => {
    return {
        loading: state.ui.loading,
        genericError: state.ui.genericError,
        questions: state.questions.questions,
        currentIndex: state.questions.currentQuestionIndex
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchQuestions: () => dispatch(questionActions.fetchQuestions()),
        answer: (response, item, index) => dispatch(questionActions.answer(response, item, index))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);