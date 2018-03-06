import I18n from 'react-native-i18n';


I18n.translations = {
    en: {
        menu_title: 'Welcome to the Trivia Challenge',
        menu_challenge: 'You will be presented with 10 True or Falsue questions',
        menu_can_you_score: 'Can you score 100%?',
        menu_begin_button: 'BEGIN',
        generic_error: 'Something went wrong. Please try again!',
        retry: 'Retry',
        play_again: 'PLAY AGAIN?',
        you_scored: 'You scored\n{{score}} / {{numberOfQuestions}}',
        button_true: 'True',
        button_false: 'False',
    }
};

I18n.fallbacks = true;
export default I18n;