import React, { Component } from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import { PARTNERS } from '../shared/partners';
import { ListItem, Card } from 'react-native-elements';

const Mission = () => (
    <Card
        title={"Our Mission"}>
        <Text>We present a curated database of the best campsites in the vast woods and 
            backcountry of the World Wide Web Wilderness. We increase access to adventure 
            for the public while promoting safe and respectful use of resources. 
            The expert wilderness trekkers on our staff personally verify each campsite to make 
            sure that they are up to our standards. We also present a platform for campers to share 
            reviews on campsites they have visited with each other.</Text>
    </Card>
);

export default class AboutComponent extends Component {
    static navigationOptions = {
        title: 'About Us'
    };

    constructor(props) {
        super(props);
        this.state = {
            PARTNERS
        };
    }

    render() {
        const renderPartner = ({ item }) => (
            <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
        );
        return (
            <ScrollView>
                <Mission />
                <Card
                    title={'Community Partners'}>
                    <FlatList 
                        data={this.state.PARTNERS}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}