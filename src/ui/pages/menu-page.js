import React from 'react';
import {StyleSheet} from "react-native";
import Strings from '../../utils/strings';
import {Button, Container, Content, Header, Text} from "native-base";
import {connect} from "react-redux";
import * as Actions from "../../redux/actions/ui";
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation'
import * as questionActions from "../../redux/actions/questions";
import colors from "../../utils/colors";

class MenuPage extends React.Component {

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.title}>
                        {Strings.t('menu_title')}
                    </Text>

                    <Text style={styles.message}>
                        {Strings.t('menu_challenge')}
                    </Text>

                    <Text style={styles.message}>
                        {Strings.t('menu_can_you_score')}
                    </Text>

                    <Button rounded
                            style={styles.button}
                            onPress={() => {
                                this.props.reset();
                                this.props.navigation.navigate('Questions')
                            }}
                    >
                        <Text style={{fontWeight: 'bold'}}>{Strings.t('menu_begin_button')}</Text>
                    </Button>
                </Content>
            </Container>
        )
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.bg
    },
    title: {
        color: colors.white,
        fontSize: 32,
        textAlign: 'center',
    },
    message: {
        color: colors.white,
        fontSize: 24,
        textAlign: 'center',
    },
    button: {
        backgroundColor: colors.green,
        alignSelf: 'center',
        padding: 16
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => dispatch(questionActions.reset()),
    };
};

export default connect(null, mapDispatchToProps)(MenuPage);


