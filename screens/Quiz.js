import React, {Component} from 'react';
import {
    View,
    Image,
    ToastAndroid,
    AsyncStorage,
    Modal,
    FlatList,
    ScrollView
} from 'react-native';
import {
    Card,
    Button,
    DialogDefaultActions
} from 'react-native-material-ui';
import MyText from "../components/MyText";
import API from '../components/API';
import Spinner from '../components/Spinner';
import Background from "../components/Background";
import Firebase from 'react-native-firebase';

let spinner;
let male = require('../assets/images/man.png');
let female = require('../assets/images/girl.png');
let index = 0, currentIndex = 0;

export default class Quiz extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/quiz.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            rulesModal: false,
            winners: []
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('Quiz');
        API.getQuizWinners((resp) => {
            if(resp.quiz_winners) {
                this.setState({
                    winners: resp.quiz_winners
                });

                if(resp.quiz_winners.length > 0) {
                    index = resp.quiz_winners.length - 1;

                    setInterval(() => {
                        this.refs['winners'].scrollToIndex({
                            index: currentIndex
                        });
                        currentIndex += 1;
                        if(currentIndex > index) {
                            currentIndex = 0;
                        }
                    }, 1500);
                }
            }
        });
    }

    render() {
        return <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
            <Background/>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../assets/images/quiz.png')}
                    style={{ height: 20, width: 20 }}
                />
                <MyText style={{ color: 'black', fontSize: 18, margin: 5 }}> Daily Quiz </MyText>
                <Image
                    source={require('../assets/images/quiz.png')}
                    style={{ height: 20, width: 20 }}
                />
            </View>

            <Card>
                <MyText style={{ color: '#333', margin: 10, textAlign: 'center' }}>Quiz will be available at 12:00 PM</MyText>
            </Card>

            <Image
                source={require('../assets/images/teamwork.png')}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
                resizeMode={'contain'}
            />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={require('../assets/images/top.png')}
                        style={{
                            height: 50,
                            width: 50,
                            top: -25
                        }}
                        resizeMode={'contain'}
                    />

                    <MyText style={{ color: '#333', textAlignVertical: 'center' }}>Win coins every day!</MyText>

                    <Image
                        source={require('../assets/images/bottom.png')}
                        style={{
                            height: 50,
                            width: 50,
                            top: 25
                        }}
                        resizeMode={'contain'}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Button
                    text={'Rules'}
                    raised
                    accent
                    style={{ container: { flex: 1 } }}
                    onPress={() => {
                        this.setState({
                            rulesModal: true
                        })
                    }}
                />
                <View style={{ width: 10 }} />
                <Button
                    text={"Start Quiz"}
                    primary
                    raised
                    style={{ container: { flex: 1 } }}
                    onPress={() => {
                        spinner.loading();
                        API.attemptQuiz((resp) => {
                            spinner.loaded();
                            if(resp.status) {
                                this.props.screenProps.stopInterstitial();
                                AsyncStorage.setItem('quiz_id', resp.quiz_id.toString()).then(() => {
                                    this.props.navigation.navigate('QuizAttempt');
                                });
                            } else {
                                ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                            }
                        });
                    }}
                />
            </View>
            <View style={{ marginVertical: 10 }}>
                <FlatList
                    ref={'winners'}
                    horizontal
                    data={this.state.winners}
                    renderItem={({item}) => {
                        let position = '';
                        if(item.position === 1) {
                            position = '1st';
                        } else if(item.position === 2) {
                            position = '2nd';
                        } else {
                            position = '3rd';
                        }
                        return <View style={{ height: 50, alignItems: 'center', flexDirection: 'row' }}>
                            <Image
                                source={item.user.gender === 'Male' ? male : female}
                                style={{ width: 40, height: 40 }}
                                resizeMode={'contain'}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <MyText style={{ color: 'black' }}>{item.user.name}</MyText>
                                <MyText style={{ color: 'black' }}>{item.user.refer_id}</MyText>
                                <MyText>{position} Place</MyText>
                            </View>
                        </View>
                    }}
                    keyExtractor={(item, index) => {
                        return index;
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ width: 20 }} />
                    }}
                />
            </View>
            <Modal
                visible={this.state.rulesModal}
                onRequestClose={() => {
                    this.setState({
                        rulesModal: false
                    })
                }}
                transparent
                animationType={'slide'}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 300, backgroundColor: 'white', elevation: 7, marginHorizontal: 20 }}>
                        <ScrollView style={{ margin: 20 }}>
                            <MyText style={{ color: 'black' }}>1. Quiz Timings: 12 PM to 12 AM.</MyText>
                            <MyText style={{ color: 'black' }}>2. There will be 10 multiple choice questions.</MyText>
                            <MyText style={{ color: 'black' }}>3. Time limit per answer is 30 seconds.</MyText>
                            <MyText style={{ color: 'black' }}>4. The faster you answer, more you score.</MyText>
                            <MyText style={{ color: 'black' }}>5. 50 point will be deducted for every wrong answer.</MyText>
                            <MyText style={{ color: 'black' }}>6. You can pass the question.</MyText>
                            <MyText style={{ color: 'black' }}>7. You can play only one quiz in one day.</MyText>
                            <MyText style={{ color: 'black' }}>8. Prizes :</MyText>
                            <MyText style={{ color: 'black', marginLeft: 10 }}>a. Gold (5 Winners)</MyText>
                            <MyText style={{ color: 'black', marginLeft: 10 }}>b. Silver (10 Winners)</MyText>
                            <MyText style={{ color: 'black', marginLeft: 10 }}>c. Bronze (20 Winners)</MyText>
                            <MyText style={{ color: 'black' }}>9. How To Claim Prizes:</MyText>
                            <MyText style={{ color: 'black', marginLeft: 10 }}>a. User Must Be “Active” User.</MyText>
                            <MyText style={{ color: 'black', marginLeft: 10 }}>b. User Must Have Completed KYC.</MyText>
                            <MyText style={{ color: 'black' }}>10.	Eendeals reserves the right to change the rules anytime, without any prior notice.</MyText>
                            <MyText style={{ color: 'black' }}>11.	Eendeals reserves the right to cancel/amend the quiz anytime, without any prior notice.</MyText>
                            <MyText style={{ color: 'black' }}>12.	Eendeals reserves the right to refuse/disqualify any user from quiz.</MyText>
                            <MyText style={{ color: 'black' }}>13.	In case of any issue, decision made by management will be final.</MyText>
                        </ScrollView>
                        <DialogDefaultActions
                            actions={['Dismiss']}
                            onActionPress={() => {
                                this.setState({
                                    rulesModal: false
                                });
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <Spinner ref={(spin) => spinner = spin}/>
        </View>
    }
}