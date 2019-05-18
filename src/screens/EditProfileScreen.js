import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';
import Colors from '../assets/Colors';
import firebase from 'firebase'
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

export default class EditProfileScreen extends React.Component {

    render() {
        return (
        <View style={styles.appContainer}>
          <Text style={styles.header}>Personal information</Text>
          <View
          style={{
          flex: 1,
          fontFamily: 'Roboto',
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          backgroundColor: Colors.weldonBlue,

          }}
          
          >
            <View style={styles.profileImage} >

            </View>

            <TextInput
              style={styles.input}
              color='#b8d8d8'
              placeholder='this.state.name'
              onChangeText= {(name)=> this.setState({name})}
            />

            <TextInput
              style={styles.input}
              placeholder='this.state.email'
              onChangeText= {(email)=> this.setState({email})}
            />
          </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  backgroundColor: {color: '#b8d8d8'},
  appContainer : {
    flex: 1,
    width: '100%',
    height:'100%'
  },

  headerContainer : {
    width: 100 + "%",
    height: 120,
    marginTop:25,
    paddingBottom: 20,
    backgroundColor: Colors.weldonBlue,
  },

  header : {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: Colors.sunsetOrange,
  },

  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.5,
    borderWidth: 1,
    marginRight: 10
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10
  },

  container: {
    flex: 1,
  },

  
});