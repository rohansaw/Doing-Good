import React from 'react';
import {
  default as Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../assets/Colors';
import firebase from 'firebase'
import SplashScreen from '../components/SplashScreen'
import {TouchableOpacity} from "react-native-gesture-handler";
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';
const { width, height } = Dimensions.get("window");

export default class EditProfileScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      userid: firebase.auth().currentUser.uid,
      email : '',
      name: '',
      password : '',
      error: '',
      loading: true,
      distance: 0
    })
  }

  componentDidMount() {
    const {userid} = this.state;
    firebase.database().ref('users/').child(userid).once('value')
      .then((snapshot) => {
        this.setState({
          name: snapshot.child('name').val(),
          email: snapshot.child('email').val(),
          description: snapshot.child('description').val(),
          distance: snapshot.child('distance').val(),
          loading: false,
        })
      });
  }

  saveChanges() {
    const {userid} = this.state;
    let updates = {};
    updates['/users/'+userid+'/name'] = this.state.name;
    updates['/users/'+userid+'/email'] = this.state.email;
    updates['/users/'+userid+'/description'] = this.state.description;
    updates['/users/'+userid+'/distance'] = this.state.distance;
    firebase.database().ref().update(updates)
      .then((data) => this.props.navigation.pop())
      .catch((err) => this.setState({error: ''+err}))
  }


  openPicker() {
    const options = {
      title: 'Select profile picture',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: source,
        },
          this.cropImage
        );
      }
    });
  }

  cropImage() {
    if (!this.state.image) {
      return Alert.alert('No image', 'Before open cropping only, please select image');
    }

    ImageCropper.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200
    }).then(image => {
      console.log('received cropped image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  render() {
      if (this.state.loading) {
        return <SplashScreen/>;
      }
      return (
        <View style={styles.container}>
          <View style={styles.loginContainer} >
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Personal Information</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text onPress={()=> this.openPicker()}
                      style={{textAlign:'center', fontSize: 12, color: Colors.weldonBlue}}>Change profile picture</Text>
              </TouchableOpacity>
            </View>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              //color='#b8d8d8'
              defaultValue={'' + this.state.name}
              onChangeText= {(name)=> this.setState({name})}
            />
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              defaultValue={'' + this.state.email}
              onChangeText= {(email)=> this.setState({email})}
            />

            <Text>Description</Text>
            <TextInput
              style={styles.input}
              defaultValue={'' + this.state.description}
              onChangeText= {(description)=> this.setState({description})}
            />

            <Text>Search Radius</Text>
            <Slider
              style={{height: 40}}
              minimumValue={1}
              maximumValue={100}
              value={this.state.distance}
              step={1}
              maximumTrackTintColor="#000000"
              onValueChange={value => this.setState({distance: value})}
            />
            <Text>{this.state.distance} km</Text>

            <Text>{this.state.error}</Text>

            <View style={styles.loginContainer}>
              <TouchableOpacity style={styles.loginItem}>
                <Text onPress={()=> this.saveChanges()}
                      style={{textAlign:'center', fontSize: 18, color: Colors.weldonBlue}}>Save!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  //backgroundColor: {color: '#b8d8d8'},
  container : {
    flex: 1,
    width: '100%',
    height:'100%'
  },
  loginContainer : {
    margin: 10,
  },

  loginItem : {
    padding: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.weldonBlue,
  },

  headerContainer : {
    width: 100 + "%",
    height: 40,
    marginTop:25,
    paddingBottom: 20,
    //backgroundColor: Colors.weldonBlue,
  },

  header : {
    //fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.weldonBlue,
    //backgroundColor: Colors.sunsetOrange,
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

  entryTitle : {
    color: '#000',
    fontSize: 18,
    textAlign: 'left',
  },
  
});