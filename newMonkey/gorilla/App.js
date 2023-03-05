//import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const categories = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <View style={styles.appContainer}>

      <View style={styles.homeButton}>
        <Button
          title = "Home"
        />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Text>"Testing"</Text>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 35,
    paddingLeft: 25,
  },
  scrollView: {
    backgroundColor: '#8e8d96',
    marginHorizontal: 20,
    flexDirection: 'column',
  }
});
