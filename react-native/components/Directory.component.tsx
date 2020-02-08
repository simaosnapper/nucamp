import React from "react";
import { FlatList, Image } from "react-native";
import { ListItem } from "react-native-elements";
import { styles } from './styles';
import { CAMPSITES } from '../shared/campsites';

export default class Directory extends React.Component<any> {
  state: {
    campsites: any[];
  };
  static navigationOptions = {
    title: 'Directory'
  };

  constructor(props: any) {
    super(props);
    this.state = {
      campsites: CAMPSITES
    }
  }

  render() {
    const { campsites } = this.state;
    return (
      <FlatList
        data={campsites}
        renderItem={this.renderDirectoryItem}
        keyExtractor={(item: any) => item.id.toString()}
      />
    );
  }
  
  renderDirectoryItem = (props: any) => {
    const { item } = props;
    const { navigation } = this.props;
    return (
      <ListItem
        containerStyle={styles.listItem}
        title={item.name}
        subtitle={item.description}
        leftAvatar={{ source:  item.image }}
        onPress={_ => navigation.navigate('CampsiteInfo', { campsiteId: item.id })}
      />
    );
  };
}
