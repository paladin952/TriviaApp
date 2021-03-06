import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions, Text} from "react-native";
import {Button, Card, Container, Content, Header, Icon} from "native-base";
import {connect} from "react-redux";
import * as questionActions from "../../redux/actions/questions";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry, {itemWidth, sliderWidth} from "../components/SliderEntry";
import {NavigationActions} from 'react-navigation'
import Strings from '../../utils/strings'
import colors from "../../utils/colors";

class QuestionPage extends React.Component {

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
                this.onAnswerClicked(true, item, index);
            }}
            onClickFalse={(index, item) => {
                this.onAnswerClicked(false, item, index);
            }}
        />);
    };

    render() {

        if (this.props.networkError) {
            return (
                <View style={styles.bgContainer}>
                    <Text style={styles.errorText}>
                        {Strings.t('network_problem')}
                    </Text>
                </View>
            )
        } else if (this.props.genericError) {
            return (
                <View style={styles.bgContainer}>
                    <Text style={styles.errorText}>
                        {Strings.t('something_went_wrong')}
                    </Text>
                </View>
            )
        }

        if (this.props.loading) {
            return (
                <View style={styles.loadingIndicatorContainer}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={styles.bgContainer}>
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
                    layout={'stack'}
                    activeAnimationOptions={{
                        friction: 4,
                        tension: 40
                    }}
                    scrollEnabled={false}
                    useScrollView={false}
                />

                <Pagination
                    dotsLength={this.props.questions.length}
                    activeDotIndex={this.props.currentIndex}
                    containerStyle={styles.dotsContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.dot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingIndicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 4,
        marginHorizontal: 1
    },
    dotsContainer: {
        paddingVertical: 1
    },
    errorText: {
        alignSelf: 'center',
        textAlign: 'center',
        padding: 16,
        color: colors.white,
        fontSize: 26
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    bgContainer: {
        flex: 1,
        backgroundColor: colors.bg,
        paddingVertical: 30
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
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
});

const mapStateToProps = state => {
    return {
        loading: state.ui.loading,
        genericError: state.ui.genericError,
        questions: state.questions.questions,
        currentIndex: state.questions.currentQuestionIndex,
        networkError: state.ui.networkError,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchQuestions: () => dispatch(questionActions.fetchQuestions()),
        answer: (response, item, index) => dispatch(questionActions.answer(response, item, index))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);