import React from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { PARTNERS } from '../shared/partners';

export default class AboutComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partners: PARTNERS
        };
    }

    static navigationOptions = {
        title: 'About'
    };

    render () {
        const renderPartner = ({item}) => {
            if (item) {
                return (
                    <ListItem
                        title={item.name}
                        subtitle={item.description}
                        leftAvatar={{ source: require('./images/bootstrap-logo.png')}}
                    />
                );
            }
            return <View />
        }
        return (
            <ScrollView>
                <Card title="Our Mission">
                    <Text>
                        We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
                    </Text>
                </Card>
                <Card title="Community Partners">
                    <FlatList
                        data={this.state.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}