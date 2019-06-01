import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import Colors from "../assets/Colors";
import { withNavigation } from "react-navigation";

class ChatPreview extends React.Component {

    showJob(){
        this.props.navigation.push('Match', { itemId : this.props.item.title})
    }
    
    render(){
        if(this.props.item == null){
            return false;
        }
        return (
            <TouchableOpacity onPress={() => this.showJob()} style={styles.productContainer}>
                <View style={styles.productLeft}>
                    <Image
                        style={{width: 150, height: 150}}
                        source={require('../assets/user.png')}
                    />
                </View>
                <View style={styles.productRight}>
                    <Text style={styles.productTitle}>{this.props.item.title.charAt(0).toUpperCase() + this.props.item.title.slice(1)}</Text>
                    <Text style={styles.productAdress}>Contact Now!</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    productContainer : {
        flex: 1,
        height: 150,  
        borderRadius: 15,
        flexDirection: 'row',
        marginTop: 10,
        overflow: 'hidden',
        
    },
    productLeft : {
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#f6f9f9',
        flex: 1,

    },
    productRight : {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f6f9f9',
        flex: 1,
    },
    productTitle : {
        color: Colors.stormcloud,
        fontFamily: 'Roboto',
        fontSize: 18,
    },
    productAdress : {
        color: Colors.stormcloud,
        fontFamily: 'Roboto',
        fontSize: 14,

    },
    productPrice : {
        color: Colors.stormcloud,
        fontFamily: 'Roboto',
        fontSize: 14,
    },
});

export default withNavigation(ChatPreview);