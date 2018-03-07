import React from 'react';
import {connect} from "react-redux";
import {ScrollView, Text, View} from "react-native";
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
                    style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, minHeight: 100}}
                    key={i}
                >
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={{color: 'white'}}>{t.item.isCorrect ? "+" : "-"}</Text>

                        <View>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{t.item.category}</Text>
                            <Text style={{marginLeft: 16, fontSize: 16, color: 'white', opacity: 0.8}}>{entities.decode(t.item.question)}</Text>
                        </View>
                    </View>

                    <View style={{alignSelf: 'stretch', backgroundColor: 'gray', height: 0.66, marginTop: 8}}/>
                </View>
            )
        });

        return (
            <ScrollView style={{backgroundColor: '#333333'}}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 28, marginTop: 32, textAlign: 'center'}}>
                        {Strings.t('you_scored', {score: this.props.correctCounter, numberOfQuestions: this.props.answered.length})}
                    </Text>

                    <View style={{marginTop: 8}}>
                        {answered}
                    </View>

                    <Button rounded
                            style={{
                                marginBottom: 16,
                                backgroundColor: '#009933',
                                alignSelf: 'center',
                                padding: 16,
                            }}
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
                        <Text style={{color: 'white', fontWeight: 'bold'}}>{Strings.t('play_again')}</Text>
                    </Button>
                </View>
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
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);