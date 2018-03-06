import React from 'react';
import {connect} from "react-redux";
import {ScrollView, Text, View} from "react-native";
import {Button} from "native-base";
import {NavigationActions} from 'react-navigation'
import * as questionActions from "../../redux/actions/questions";
import Strings from "../../utils/strings";

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class ResultPage extends React.Component {

    render() {
        let answered = this.props.answered.map((t, i) => {
            return (
                <View
                    style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8}}
                    key={i}
                >
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text>{t.item.isCorrect}</Text>
                        <Text style={{marginLeft: 16}}>{entities.decode(t.item.question)}</Text>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'gray', height: 0.66, marginTop: 8}}/>
                </View>
            )
        });

        return (
            <ScrollView>
                <Text>
                    {Strings.t('you_scored', {score: this.props.correctCounter, numberOfQuestions: this.props.answered.length})}
                </Text>

                <View>
                    {answered}
                </View>

                <Button rounded
                        style={{
                            alignSelf: 'center',
                            padding: 16
                        }}
                        onPress={() => {
                            this.props.reset();
                            this.props.navigation.dispatch(NavigationActions.reset(
                                {
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: 'Details'})
                                    ]
                                }));
                        }}
                >
                    <Text>{Strings.t('play_again')}</Text>
                </Button>
            </ScrollView>
        );
    }

}


const mapStateToProps = state => {
    return {
        loading: state.ui.loading,
        genericError: state.ui.genericError,
        answered: state.questions.answered,
        correctCounter: state.questions.correctCounter
    }
};
const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(questionActions.reset())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);