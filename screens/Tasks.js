import React, {Component} from 'react';
import {
    View,
    ToastAndroid,
    FlatList,
    Image,
    Linking,
    Alert
} from 'react-native';
import { Button } from "react-native-material-ui";
import ImagePicker from 'react-native-image-picker';
import MyText from "../components/MyText";
import API from "../components/API";
import Background from "../components/Background";

export default class Tasks extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/task.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            isRefreshing: false,
            page: 2,
            canLoad: true
        }
    }

    componentDidMount() {
        this.loadData(() => {});
    }

    loadData(cb) {
        API.getTasks((tasks) => {
            this.setState({ tasks });
            cb();
        });
    }

    onRefresh() {
        this.setState({
            isRefreshing: true
        });

        this.loadData(() => {
            this.setState({
                isRefreshing: false,
                page: 2,
                canLoad: true
            });
        });
    }

    removeTask(id) {
        let { tasks } = this.state;
        new Promise((resolve, reject) => {
            let new_tasks;
            new_tasks = tasks.forEach((task, index) => {
                if(task.id !== id) {
                    return task;
                }

                if(index + 1 === tasks.length) {
                    resolve(new_tasks);
                }
            });
        }).then((new_tasks) => {
            this.setState({
                tasks: new_tasks
            });
        });
    }

    imagePicker(id) {
        let options = {
            title: 'Select Task Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
                let source = 'data:image/jpeg;base64,' + response.data;
                API.taskSubmit({
                    image: source
                }, id, (resp) => {
                    if(resp.status) {
                        ToastAndroid.show('Task submitted', ToastAndroid.SHORT);
                        this.removeTask(id);
                    } else {
                        ToastAndroid.show('There was some error, please try again in some time', ToastAndroid.SHORT);
                    }
                });
            }
        });
    }

    fetchTasks() {
        let { tasks, page, canLoad } = this.state;
        if(canLoad) {
            API.getTasks((resp) => {
                if(resp.error) {
                    ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                } else {
                    if(resp.length > 0) {
                        this.setState({
                            tasks: page === 2 ? resp : [...tasks, ...resp],
                            page: page + 1
                        });
                    } else {
                        this.setState({
                            canLoad: false
                        });
                    }
                }
            }, page);
        }
    }

    render() {
        return <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Background/>
            <View style={{ flex: 1, padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../assets/images/task.png')}
                        style={{ height: 20, width: 20 }}
                    />
                    <MyText style={{ color: 'black', fontSize: 18, margin: 5 }}> Today's Tasks </MyText>
                    <Image
                        source={require('../assets/images/task.png')}
                        style={{ height: 20, width: 20 }}
                    />
                </View>

                <View style={{ height: 20 }} />

                <FlatList
                    data={this.state.tasks}
                    keyExtractor={(item, index) => {
                        return item.id
                    }}
                    renderItem={({item}) => {
                        return <View style={{ padding: 10, backgroundColor: 'white', elevation: 5 }}>
                            <MyText style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>{item.name}</MyText>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Button
                                    text={'Upload'}
                                    raised
                                    accent
                                    style={{ container: { flex: 1 } }}
                                    onPress={() => {
                                        this.imagePicker(item.id);
                                    }}
                                />
                                <View style={{ width: 10 }} />
                                <Button
                                    text={'Info'}
                                    raised
                                    style={{ container: { flex: 1 } }}
                                    onPress={() => {
                                        Alert.alert(item.name, item.instructions, [
                                            { text: 'Cancel', style: 'cancel' },
                                            { text: 'Open', onPress: () => {
                                                    if(item.link.length > 0) {
                                                        Linking.openURL(item.link);
                                                    } else {
                                                        ToastAndroid.show('There is no link', ToastAndroid.SHORT);
                                                    }
                                                } }
                                        ]);
                                    }}
                                />
                            </View>
                        </View>
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 10 }} />
                    }}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefreshing}
                    onEndReached={() => {
                        this.fetchTasks();
                    }}
                    onEndThreshold={0}
                />
            </View>
        </View>
    }
} 