import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
  FlatList
} from 'react-native';

import firebase from 'firebase';
import SplashScreen from '../components/SplashScreen';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Colors from '../assets/Colors';
import MatchPreview from '../components/MatchPreview';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      error: '',
      userid: firebase.auth().currentUser.uid,
      loading: true,
      keys: null,
      requests: null,
      text: '',
      requests : null,
    });
  }

  componentWillMount(){

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

  match(key){
    const {userid, users} = this.state;
    var ref = firebase.database().ref('users').child(userid).child('matches');
    ref.child(key).set(1);
    let updates = {};
    updates['/users/'+userid+'/karmapoints'] = users[userid]['karmapoints']+100;
    firebase.database().ref().update(updates);
  }

  decline(key){
    const {userid} = this.state;
    var ref = firebase.database().ref('users').child(userid).child('matches');
    ref.child(key).set(0);
  }

  render() {
    const {loading, data, keys, users} = this.state;
    if(this.state.keys == null ){
      return false;
    }
    //console.log(this.state.keys);
    //console.log("YYYYYYYYYYYYYYYYYY"+this.state.data)
    if(loading){
      return <SplashScreen/>;
    }
    return (
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

        <ScrollView>
            <View style={styles.cardContainer}>
            
              <FlatList
                  
                  data={this.state.keys == null ? [] : Object.keys(this.state.keys).map(key => {
                    return this.state.request[key];
                  })}
                  renderItem={({ item }) => (
                      
                      <MatchPreview item={item} />
                  )}
                  keyExtractor={(item, index) => index}
              />

            </View>
            
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  topCard : {
    width: '100%',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  bottomCard : {
    padding: 10,
    height:270,
    width:'100%',
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent: 'center',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  orange:{
    width:55,
    height:55,
    borderWidth:6,
    borderColor:'rgb(246,190,66)',
    borderWidth:4,
    borderRadius:55,
    marginTop:-15
  },
  green:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:3,
    borderColor:'#01df8a',
  },
  red:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:3,
    borderColor: Colors.sunsetOrange,
  },
  bottomItemCard: {
    position: 'absolute',
    bottom: 30,
    paddingLeft: 10,
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