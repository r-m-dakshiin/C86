import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Platform, SafeAreaView, Switch } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from 'firebase'

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled:false,
      lightThemeEnabled:true,
      profileImage:"",
      name:""
    };
  }


  toggleSwitch(){
    const previous_state = this.state.isEnabled;
    const theme = !this.state.isEnabled ? "Dark" : "Light"
    var updates = {};
    updates[
      "/users/" + firebase.auth().currentUser.uid + "/current_theme"
    ] = theme;
    firebase
    .database()
    .ref()
    .update(updates);
    this.setState({
      isEnabled:!previous_state,
      lightThemeEnabled:previous_state
    })
  }
  
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <View style={styles.container}>
          <Text>Profile</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
