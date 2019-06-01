import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import firebase from 'firebase';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ChatPreview from '../components/ChatPreview';
import SplashScreen from '../components/SplashScreen';
import Colors from '../assets/Colors';

export default class MatchesScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      error: '',
      userid: firebase.auth().currentUser.uid,
      loading: true,
      keys: null,
      requests: null,
    });
  }

  componentWillMount() {
   this.focusListener = this.props.navigation.addListener("didFocus", () => { 
    const {userid} = this.state;
    firebase.database().ref('users/').child(userid).child('matches').orderByValue().equalTo(1).once('value')
      .then((snapshot) => {
        this.setState({
          keys: snapshot.val(),
      })
    });
    firebase.database().ref('requests').once('value')
    .then((snapshot) => {
      this.setState({
        requests: snapshot.val(),
        loading: false,
      })
    });
   });
    const {userid} = this.state;
    firebase.database().ref('users/').child(userid).child('matches').orderByValue().equalTo(1).once('value')
      .then((snapshot) => {
        this.setState({
          keys: snapshot.val(),
      })
    });
    firebase.database().ref('requests').once('value')
    .then((snapshot) => {
      this.setState({
        requests: snapshot.val(),
        loading: false,
      })
    });
    console.log('Sollte vorher');
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }
    
    render() {

      if (this.state.loading){
        return <SplashScreen/>;
      }
      if (this.state.keys == null){
        return false;
      }
        return (
        <View style={styles.container}>   
          <View style={styles.loginContainer} >
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Chats</Text>
            </View>
            <ScrollView>
            <View style={styles.cardContainer}>
            
            <FlatList
                
                data={this.state.keys == null ? [] : Object.keys(this.state.keys).map(key => {
                  return this.state.requests[key];
                })}
                renderItem={({ item }) => (
                    <ChatPreview item={item} />
                )}
                keyExtractor={(item, index) => index}
            />
            </View>
            </ScrollView>

          </View>
        </View>
        
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      height:'100%'
    },
    loginContainer : {
      margin: 30,
    },
    loginItem : {
      padding: 20,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: '#ddd'
    },
    headerContainer : {
      marginTop: 10,
      marginBottom: 20,
    },
    header : {
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center', 
      color: Colors.weldonBlue,
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 0,
      borderWidth: 0,
      borderBottomColor: '#ddd',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 20
    },
    inputDesc : {
      backgroundColor: '#fff',
      borderRadius: 0,
      borderWidth: 0,
      borderBottomColor: '#ddd',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 20,
      height: 70,
    },
    bottomContainer : {
      width: '100%',
      position: 'absolute',
      bottom:0,
      
    },
    bottomItem : {
      width: '100%',
      backgroundColor : 'blue',
      height:50,
      justifyContent: 'center'
    },
    signUpItem : {
      textAlign:'center',
      justifyContent:'center',
      
    },
    cardContainer : {
        marginBottom:50,
    },
  });
  
