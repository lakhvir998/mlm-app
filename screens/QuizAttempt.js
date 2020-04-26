import React, {Component} from 'react';
import {
    View,
    ToastAndroid,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SegmentedControls } from 'react-native-radio-buttons';
import {
    Button
} from 'react-native-material-ui';
import API from "../components/API";
import MyText from "../components/MyText";
import Firebase from 'react-native-firebase';

let timerHandler;

export default class QuizAttempt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            index: 0,
            selected_choice: -1,
            timer: 30.00
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('QuizAttempt');
        AsyncStorage.getItem('quiz_id').then((quiz_id) => {
            API.getQuizQuestions(quiz_id, (resp) => {
                if(resp.questions) {
                    this.setState({
                        questions: resp.questions
                    });
                    this.resetTimer();
                }
            });
        });

        DeviceEventEmitter.addListener('interstitialDidClose', () => {
            ToastAndroid.show('Next question', ToastAndroid.SHORT);
            this.resetTimer();
            let { index } = this.state;
            this.setState({
                index: index + 1,
                selected_choice: -1
            });
        });
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeListener('interstitialDidClose');
    }

    resetTimer() {
        this.setState({
            timer: 30.00
        });
        timerHandler = setInterval(() => {
            let { timer } = this.state;
            timer -= 0.2;

            if(timer <= 0) {
                clearInterval(timerHandler);
                this.submitAnswer();
            } else {
                this.setState({
                    timer: timer
                });
            }
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(timerHandler);
    }

    submitAnswer() {
        clearInterval(timerHandler);
        let { questions, index, selected_choice } = this.state;
        let id = questions[index].quiz_question_attempt_id;
        API.answerQuizQuestion({
            selected_choice: selected_choice,
            time_taken: (30 - this.state.timer)
        }, id, (resp) => {
            if (resp.status) {
                if(resp.correct) {
                    ToastAndroid.show('Answer is correct', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Answer is wrong', ToastAndroid.SHORT);
                }
                if (resp.finish) {
                    ToastAndroid.show('Quiz finished, wait for results', ToastAndroid.SHORT);
                    this.props.screenProps.startInterstitialInterval();
                    this.props.navigation.goBack();
                } else {
                    this.props.screenProps.showInterstitial();
                }
            } else {
                ToastAndroid.show(resp.error, ToastAndroid.SHORT);
            }
        });
    }

    render() {
        let options = [], question = {};
        let { questions, index } = this.state;
        if(questions.length > 0) {
            question = questions[index].question;
            options = [question.choice_1, question.choice_2, question.choice_3, question.choice_4];
        }

        let fill = 0;
        if(30 - this.state.timer !== 0) {
            fill = parseFloat((((30 - this.state.timer) / 30) * 100).toFixed(2));
        }

        return <View style={{ flex: 1, padding: 10 }}>
            <MyText style={{ color: 'black', fontSize: 18, textAlign: 'center' }}>Attempt Quiz</MyText>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <AnimatedCircularProgress
                        ref='circularProgress'
                        size={100}
                        width={10}
                        fill={fill}
                        tintColor="#FD0F0F"
                        backgroundColor="#646301"
                    >
                        {
                            (fill) => (
                                <MyText style={{ textAlign: 'center', paddingHorizontal: 5 }}>
                                    { (30 - this.state.timer).toFixed(2) }
                                </MyText>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <MyText style={{ fontSize: 16, textAlign: 'center' }}>Question:</MyText>
                    <MyText style={{ marginVertical: 10, fontSize: 16, textAlign: 'center' }}>{question.question}</MyText>
                </View>

                <View>
                    <MyText style={{ fontSize: 16, textAlign: 'center', marginVertical: 10 }}>Choices:</MyText>
                    <SegmentedControls
                        options={ options }
                        direction={'column'}
                        tint={'white'}
                        selectedTint= {'black'}
                        backTint= {'#ED752D'}
                        containerStyle={{ borderRadius: 0, borderWidth: 0 }}
                        optionStyle={{ fontSize: 16 }}
                        optionContainerStyle={{ justifyContent: 'center', height: 40 }}
                        selectedOption={ options[this.state.selected_choice - 1] }
                        containerBorderRadius={0}
                        separatorWidth={5}
                        onSelection={(option, index) => {
                            this.setState({
                                selected_choice: index + 1
                            });
                        }}
                    />
                </View>

                <Button
                    text={'Submit'}
                    raised
                    primary
                    style={{ container: { marginTop: 10 } }}
                    onPress={() => this.submitAnswer()}
                />
            </View>
        </View>
    }
} 