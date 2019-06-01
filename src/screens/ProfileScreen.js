import React from "react";
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

import JobPreview from '../components/JobPreview';
import SplashScreen from '../components/SplashScreen';
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from '../assets/Colors';

const { width, height } = Dimensions.get("window");

export default class ProfileScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      userid: firebase.auth().currentUser.uid,
      name: '',
      karmapoints: 0,
      description: '',
      loading: true,
      matches: null
    })
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => { 
      const {userid} = this.state;
    firebase.database().ref('users/').child(userid).once('value')
      .then((snapshot) => {
        this.setState({
          name: snapshot.child('name').val(),
          karmapoints: snapshot.child('karmapoints').val(),
          description: snapshot.child('description').val(),
      })
      });
    firebase.database().ref('requests').orderByChild('userid').equalTo(userid).once('value')
    .then((snapshot) => {
      this.setState({
        matches: snapshot.val(),
        loading: false,
      })
    });
    });
    const {userid} = this.state;
    firebase.database().ref('users/').child(userid).once('value')
      .then((snapshot) => {
        this.setState({
          name: snapshot.child('name').val(),
          karmapoints: snapshot.child('karmapoints').val(),
          description: snapshot.child('description').val(),
      })
      });
    firebase.database().ref('requests').orderByChild('userid').equalTo(userid).once('value')
    .then((snapshot) => {
      this.setState({
        matches: snapshot.val(),
        loading: false,
      })
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  renderHeader = () => {
    const { karmapoints } = this.state;
    const imageUrl = 'https://www.welt.de/img/vermischtes/mobile166641813/3792501637-ci102l-w1024/CRESTED-BLACK-MACAQUE.jpg';
    return (
    <View style={styles.headerWrapper}>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <View style={styles.profileImage} >
            <Image
              style={{width:100, height:100}}
              source={require('../assets/hasso.jpg')} />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5
          }}
        >
        <Image style={{height:25, width:150}} source={require('../assets/rating.png')}  />
          <View
            style={{
              marginTop:10,
              borderWidth: 1,
              width: "100%",
              marginLeft: 1,
              alignItems: "center",
              borderRadius: 10,
              padding:5,
              borderColor: Colors.weldonBlue,
            }}
          >
            <TouchableOpacity>
              <Text style={{color: Colors.weldonBlue }} onPress={() => {this.props.navigation.navigate('Edit')}}>Edit Profile</Text>
            </TouchableOpacity>
            
          </View>
        </View>
        
      </View>
        
    </View>  
    );
  };

  renderJobPreview({ item }){
      return <JobPreview item = {item} />;
  }
  
  returnKey(item){
      return item.toString();
  }

  render() {
    if(this.state.loading){
      return <SplashScreen/>;
    }

    //if abfrage ob eigene anfragen ansonsten keine akriven anzeigen
    const { name, description } = this.state;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.listContainer}>
        <View style={styles.infoField}>
            <Text style={{fontSize: 14, fontWeight:'bold'}}>{ name }</Text>
            <Text>{description}</Text>
        </View>

        <FlatList
          data = {this.state.matches == null ? [] : Object.keys(this.state.matches).map(key => {
            return this.state.matches[key];
          })}
          keyExtractor={this.returnKey}
          renderItem={this.renderJobPreview}
        />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  gridImgContainer: {
    padding: 1,
    backgroundColor: "#CCC"
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.5,
    borderWidth: 1,
    marginRight: 10,
    borderColor: Colors.weldonBlue,
    overflow:'hidden',
  },
  image: {
    height: width * 0.33,
    width: width * 0.33
  },
  headerWrapper : {
      marginTop:20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 10,
  },
  listContainer : {
    flex: 1,
  },
  infoField : {
    padding:20,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor : Colors.weldonBlue,
    borderBottomWidth:1,
  },
  newRequest : {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'grey',
    height: 150,
  },
  requestLeft : {
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    flex: 1,

},
requestRight : {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    flex: 1,
},
});