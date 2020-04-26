import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    Linking
} from 'react-native';
import Background from "../components/Background";
import MyText from "../components/MyText";
import {
    Card
} from 'react-native-material-ui';
import Firebase from 'react-native-firebase';

export default class HowItWorks extends Component {
    componentDidMount() {
        Firebase.analytics().setCurrentScreen('HowItWorks');
    }

    render() {
        let levelData = [
            {
                level: 1,
                people: 5,
                income: 8,
                total: 40
            },
            {
                level: 2,
                people: 25,
                income: 7,
                total: 175
            },
            {
                level: 3,
                people: 125,
                income: 6,
                total: 750
            },
            {
                level: 4,
                people: 625,
                income: 5,
                total: 3125
            },
            {
                level: 5,
                people: 3125,
                income: 4,
                total: '12,500'
            },
            {
                level: 6,
                people: '15,625',
                income: 4,
                total: '62,500'
            },
            {
                level: 7,
                people: '78,125',
                income: 3,
                total: '2,34,375'
            },
            {
                level: 8,
                people: '3,90,625',
                income: 3,
                total: '11,71,875'
            },
            {
                level: 9,
                people: '19,53,125',
                income: 3,
                total: '58,59,375'
            },
            {
                level: 10,
                people: '97,65,625',
                income: 3,
                total: '2,92,96,875'
            }
        ];
        let table = <View>
            <View style={{ backgroundColor: 'black', height: 1, marginTop: 10 }} />
            <View style={{ flexDirection: 'row', paddingVertical: 5, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>Level</MyText></View>
                <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>People</MyText></View>
                <View style={{ flex: 0.5 }}><MyText style={{ color: 'black' }}>Income</MyText></View>
                <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>Total</MyText></View>
            </View>
            <View style={{ backgroundColor: 'black', height: 1 }} />
            <FlatList
                style={{ backgroundColor: 'white' }}
                data={levelData}
                renderItem={({item}) => {
                    return <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>{item.level}</MyText></View>
                        <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>{item.people}</MyText></View>
                        <View style={{ flex: 0.5 }}><MyText style={{ color: 'black' }}>{item.income}</MyText></View>
                        <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>{item.total}</MyText></View>
                    </View>
                }}
                keyExtractor={(item, index) => {
                    return index;
                }}
                ItemSeparatorComponent={() => {
                    return <View style={{ backgroundColor: 'black', height: 1 }} />
                }}
            />
            <View style={{ backgroundColor: 'black', height: 1 }} />
            <View style={{ flexDirection: 'row', paddingVertical: 5, backgroundColor: 'white' }}>
                <View style={{ flex: 2.5 }}><MyText style={{ color: 'black' }}>Total</MyText></View>
                <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>36,641,590</MyText></View>
            </View>
            <View style={{ backgroundColor: 'black', height: 1 }} />
        </View>;
        return <View style={{ flex: 1, padding: 10 }}>
            <Background/>
            <Card
                onPress={() => {
                    Linking.openURL('https://youtu.be/g7WfWylB0CI');
                }}
            >
                <MyText style={{ padding: 10, color: 'black', textAlign: 'center' }}>Click here to watch video</MyText>
            </Card>
            <Card
                onPress={() => {
                    Linking.openURL('http://139.59.66.125/terms');
                }}
            >
                <MyText style={{ padding: 10, color: 'black', textAlign: 'center' }}>Click here to read Terms & Conditions</MyText>
            </Card>
            <ScrollView>
                <MyText style={[ styles.normal ]}>1. Activate Your Account By Collecting 100 Coins With In 30 Days.</MyText>
                <MyText style={[ styles.normal, styles.indented ]}>a. If you fail to collect 100 coins in 30 days, then your ID will be deleted Permanently.</MyText>
                <MyText style={[ styles.normal ]}>2. You are having two wallets "ACTIVE" & "PASSIVE".</MyText>
                <MyText style={[ styles.normal, styles.indented ]}>a. Active Wallet:  Income from your active downlines will be collected.</MyText>
                <MyText style={[ styles.normal, styles.indented ]}>b. Passive Wallet: Income from your passive downlines will be collected.</MyText>
                <MyText style={[ styles.normal ]}>3. We are having 5 * 10 Autofill matrix.</MyText>
                <MyText style={[ styles.normal, styles.indented ]}>a. Means Only 5 persons wil be adjusted in your level 1.</MyText>
                <MyText style={[ styles.normal, styles.indented ]}>b. Level 2 can have only 5*5=25 persons, L 3 : 25*5=125. L4: 125*5=625 …….. So on till L:10</MyText>
                <MyText style={[ styles.normal ]}>4. Monthly closing will be done on 25th on every month.</MyText>
                <MyText style={[ styles.normal, styles.indented ]}>a. 100 Coins will deducted from your earning and distributed in your upline.</MyText>
                <MyText style={[ styles.normal, styles.indented ]}>b. If you don’t have 100 coins in your wallet. Then nothing will be deducted and you will not earn anything from your downlines.</MyText>
                <MyText style={[ styles.normal, styles.indented ]}>c. You have to earn min 100 coins in one month to get monthly income from dowlines.</MyText>

                <MyText style={[ styles.normal, { marginTop: 10 } ]}>Note: Whenever Your Downline Will Activate His/Her Account. Income From That Particular Downline Will Be Transferred From Passive To Active Wallet.</MyText>

                <MyText style={[ styles.normal, { marginTop: 10 } ]}>Joining Income Table:</MyText>

                {table}

                <MyText style={[ styles.normal, { marginTop: 10 } ]}>Monthly Income Table:</MyText>

                {table}

                <MyText style={[ styles.normal, { marginTop: 10 } ]}>For further clarifications please send email to eendeals@gmail.com</MyText>
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    normal: {
        color: 'black'
    },
    indented: {
        paddingLeft: 20
    }
});