import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions, Text} from "react-native";
import {Button, Card, Container, Content, Header, Icon} from "native-base";
import {connect} from "react-redux";
import * as actions from "../../redux/actions/questions";

class QuestionPage extends React.Component {

    componentDidMount() {
        this.props.fetchQuestions();
    }


    render() {
        if (this.props.loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <Container>
                <Content>
                    <View>

                    </View>

                    <Card>
                        <View style={{padding: 16, flex: 1}}>
                            <Text>
                                {JSON.stringify(this.props.questions)}
                            </Text>
                        </View>
                    </Card>

                    <View>

                    </View>
                </Content>
            </Container>
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
        questions: state.questions.questions
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchQuestions: () => dispatch(actions.fetchQuestions())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);