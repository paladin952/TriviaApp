import React from 'react';
import {connect} from "react-redux";
import {ScrollView, Text, View, StyleSheet} from "react-native";
import {Button} from "native-base";
import {NavigationActions} from 'react-navigation'
import Strings from "../../utils/strings";


const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class ResultPage extends React.Component {

    render() {
        let answered = this.props.answered.map((t, i) => {
            return (
                <View
                    style={styles.answeres}
                    key={i}
                >
                    <View>
                        <Text style={styles.category}>{t.item.category}</Text>
                        <Text style={styles.question}>{entities.decode(t.item.question)}</Text>
                        <Text style={{color: t.isCorrect ? colors.green : colors.red}}>{t.isCorrect ? Strings.t('correct') : Strings.t('wrong')}</Text>
                    </View>

                    <View style={styles.line}/>
                </View>
            )
        });

        return (
            <ScrollView style={styles.bg}>
                <View>
                    <Text style={styles.title}>
                        {Strings.t('you_scored', {score: this.props.correctCounter, numberOfQuestions: this.props.answered.length})}
                    </Text>

                    <View style={{marginTop: 8}}>
                        {answered}
                    </View>

                    <Button rounded
                            style={styles.playAgainButton}
                            onPress={() => {
                                this.props.navigation.dispatch(NavigationActions.reset(
                                    {
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({routeName: 'Menu'})
                                        ]
                                    }));
                            }}
                    >
                        <Text style={styles.playAgainText}>{Strings.t('play_again')}</Text>
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

export const colors = {
    red: 'red',
    bg: '#333333',
    green: '#009933'
};

const styles = StyleSheet.create({
    line: {
        alignSelf: 'stretch',
        backgroundColor: 'gray',
        height: 0.66,
        marginTop: 8
    },
    answeres: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        minHeight: 100
    },
    category: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    question: {
        marginLeft: 16,
        fontSize: 16,
        color: 'white',
        opacity: 0.8
    },
    bg: {
        backgroundColor: colors.bg
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 32,
        textAlign: 'center'
    },
    playAgainText: {
        color: 'white',
        fontWeight: 'bold'
    },
    playAgainButton: {
        marginBottom: 16,
        backgroundColor: colors.green,
        alignSelf: 'center',
        padding: 16,
    }
});


const mapStateToProps = state => {
    return {
        loading: state.ui.loading,
        genericError: state.ui.genericError,
        answered: state.questions.answered,
        correctCounter: state.questions.correctCounter
    }
};
const mapDispatchToProps = dispatch => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);