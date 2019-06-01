import React from 'react';
import firebase from 'firebase'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Component
} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { isCompletionStatement } from '@babel/types';
import Colors from '../assets/Colors';

export default class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            email : '',
            password : '',
            error: '',
        })
    }

    loginUser = (email,password) => {
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch((err) => this.setState({error: 'Login failed:\n' + err})) // err ist scheinbar kein String und kann alleine nicht dargestellt werden
        
    }

    onSignUp = () => {
      this.props.navigation.push('SignUp');
    }
    
    render() {
        return (
        <View style={styles.container}> 
          <View style={{justifyContent:'center', alignItems: 'center', marginTop: 10, borderRadius:40, overflow:'hidden'}}>
            <Image
              style={styles.strech}
              source={require('../assets/fairleihen.png')}
              /> 
          </View>
          <View style={styles.loginContainer} >
            <View style={styles.headerContainer}>
            
                
            </View>
            <TextInput 
                style={styles.input}
                placeholder='Email' 
                onChangeText= {(email)=> this.setState({email})}
            />

            <TextInput 
                style={styles.input}
                placeholder='Password' 
                secureTextEntry={true} 
                onChangeText= {(password)=> this.setState({password})}
            />      
            <Text>{this.state.error}</Text>

            <View style={styles.loginContainer}>
              <TouchableOpacity style={styles.loginItem}>
                <Text onPress={()=> this.loginUser('test@test.de', '123456') } 
                style={{textAlign:'center', fontSize: 18, color:Colors.weldonBlue}}>Login! </Text>
              </TouchableOpacity>
           </View>

            <View style={styles.signUpItem}>
              <Text style={{textAlign:'center'} }>Not registered yet? <Text onPress={()=> this.onSignUp()} style={{fontWeight:'bold'}}>Sign Up! </Text></Text>   
            </View>

           

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
      marginTop: 0
    },
    loginItem : {
      padding: 20,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: '#ddd'
    },
    headerContainer : {
      marginTop: 30,
      marginBottom: 50,
    },
    text:{
      fontSize:20,
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
      justifyContent:'center'
    },
    strech :{
      marginTop:50,
      width: 200,
      height: 200,
    }
  });
  