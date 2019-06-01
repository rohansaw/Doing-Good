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
import MatchPreview from '../components/MatchPreview';
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
          <View style={{flex:1}}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="🔍 Search"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                style={styles.search}
              />
              <Picker
                selectedValue="Category"
                style={{height: 50, width: 300, fontSize: 11}}>
                <Picker.Item label="Category" value="Category" />
                <Picker.Item  label="Haushalt" value="Haushalt" />
                <Picker.Item label="Kueche" value="Küche" />
              </Picker>
            </View>   
          </View>
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
                    <MatchPreview item={item} />
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
    search : {
      width: 65 + "%",
      padding: 10,
      margin: 20,
      backgroundColor: '#F5F5F5',
      color: Colors.grey,
      borderRadius: 10,
      fontSize:16
    },
    searchIcon : {
      padding: 10,
    },
    searchContainer : {
      flex: 1,
      flexDirection: "row",
      width:"100%",
      marginLeft: 10,
      marginRight: 10,
      alignContent: 'center',
      textAlign: 'center',
      alignItems: 'center'
    }
  });
  
