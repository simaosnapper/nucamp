import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';

export default class ContactComponent extends React.Component {
    static navigationOptions = {
        title: 'Contact'
    };

    render () {
        return (
            <ScrollView>
                <Card title='Contact Information' wrapperStyle={{margin: 20}}>
                    <Text>1 Nucamp Way</Text>
                    <Text>Seattle, WA 98001</Text>
                    <Text style={{marginBottom: 10}}>U.S.A</Text>
                    <Text>Phone: 1-206-555-1234</Text>
                    <Text>Email: camspites@nucamp.co</Text>
                </Card>
            </ScrollView>
        );
    }
}