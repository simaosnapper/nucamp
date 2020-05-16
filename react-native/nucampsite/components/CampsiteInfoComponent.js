import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet,
    Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text))
};

const shareCampsite = (title, message, url) => {
    Share.share({
        title: title,
        message: `${title}: ${message} ${url}`,
        url: url
    },{
        dialogTitle: 'Share ' + title
    });
};

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

function RenderComments({comments}) {
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating
                    imageSize={10}
                    startingValue={+item.rating}
                    readonly
                    style={{
                        alignItems: 'flex-start',
                        paddingVertical: '5%'
                    }}    
                />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

function RenderCampsite({campsite, favorite, markFavorite, onShowModal}) {
    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    const view = React.createRef();

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(5000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + campsite.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => favorite ?
                                console.log('Already set as a favorite') : markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            return true;
        }
    });

    if (campsite) {
        return (
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={campsite.name}
                    image={{uri: baseUrl + campsite.image}}>
                    <Text style={{margin: 10}}>
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => favorite ? 
                                console.log('Already set as a favorite') : markFavorite()}
                        />
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            style={styles.cardItem}
                            onPress={() => onShowModal()}
                        />
                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#5637DD'
                            style={styles.cardItem}
                            raised
                            reverse
                            onPress={() => shareCampsite(campsite.name, campsite.description, baseUrl + campsite.image)} 
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        };
    }

    static navigationOptions = {
        title: 'Campsite Information'
    };

    toggleModal = () => this.setState({ showModal: !this.state.showModal })

    markFavorite = campsiteId => this.props.postFavorite(campsiteId);

    handleComment = campsiteId => this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text)

    resetForm = () => this.setState({
        rating: 5,
        author: '',
        text: ''
    });

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={this.toggleModal}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating 
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={rating => this.setState({ rating })}
                            style={{paddingVertical: 10}}
                        />
                        <Input 
                            placeholder='Author'
                            leftIconContainerStyle={{paddingRight: 10}}
                            leftIcon={<Icon
                                name='user-o'
                                type='font-awesome'
                            />}
                            onChangeText={author => this.setState({ author })}
                            value={this.state.author}
                        />
                        <Input
                            placeholder="Comment"
                            leftIconContainerStyle={{paddingRight: 10}}
                            leftIcon={<Icon
                                name='comment-o'
                                type='font-awesome'
                            />}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                        />
                        <View style={{margin: 10}}>
                            <Button onPress={() => {
                                this.handleComment(campsiteId);
                                this.resetForm();
                                this.toggleModal();
                            }}
                            color="#5637DD"
                            title="Submit" />
                        </View>
                        <View style={{margin: 10}}>
                            <Button onPress={this.toggleModal} color="#808080" title="Cancel" />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
