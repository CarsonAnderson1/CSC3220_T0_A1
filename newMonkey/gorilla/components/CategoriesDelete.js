import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
export default function Delete(props){
    return(
        <Modal visible = {props.visibleD} animationType = "slide">
          <Button title = "back" onPress = {props.onCancelD} color = 'grey'> </Button>
        </Modal>
        
    )
};
