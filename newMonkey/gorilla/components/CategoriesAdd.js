import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
import {useState, useEffect} from "react"
import { addCategory, setCurrCat } from '../App.js';

function AddCategory(props){
    return(
        <Modal visible = {props.visibleA} animationType = "slide">
          <View style = {styles.buttons}>
            <View style={styles.backButton}>
              <Button
                color = "red"
                title = "cancel"
                onPress={props.onCancelA}
              />
            </View>
              <View style = {styles.confirmButton}>
                <Button
                  title = "Confirm Creation"
                  color= "green" 
                  style = {styles.addButton}
                  width = "40%"
                  onPress={addCategory}
                />
              </View>
          </View>

          <View style = {styles.appContainer}>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Category to Create
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder ="ex. groceries" 
                  onChangeText={setCurrCat}
                />
              </View>
            </View>
        </Modal>
        
    )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    flex: 2,
  },
  buttons: {
    flexDirection: "row",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  backButton:{
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  confirmButton:{
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 30,
  },
  textStyle:{
    fontSize: 14,
    fontFamily: "normal",
    color: "black",
  },
  box:{
    paddingBottom: 10,
  }
});
export default AddCategory;