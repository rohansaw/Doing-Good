import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import Colors from "../assets/Colors";

export default class JobPreview extends React.Component {

    state = {
        id : 0,
        title: "Test",
        location: "Stahnsdorferstraße 144B",
        distance: 0,
    }



    showJob(){
    }
    
    render(){
        this.showJob();
        return (
            <TouchableOpacity onPress={() => this.showJob()} style={styles.productContainer}>
                <View style={styles.productLeft}>
                    <Image
                        style={{width: 150, height: 150}}
                        source={{uri: 'https://www.welt.de/img/vermischtes/mobile166641813/3792501637-ci102l-w1024/CRESTED-BLACK-MACAQUE.jpg'}}
                    />
                </View>
                <View style={styles.productRight}>
                    <Text style={styles.productTitle}>{this.props.item.title}</Text>
                    <Text style={styles.productAdress}>{this.props.item.description}</Text>
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
        marginLeft: 20,
        marginRight: 20,
        overflow: 'hidden',
        
    },
    productLeft : {
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: Colors.beige,
        flex: 1,

    },
    productRight : {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.beige,
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
