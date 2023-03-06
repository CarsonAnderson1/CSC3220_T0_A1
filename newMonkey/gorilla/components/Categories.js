import { ScrollView } from 'react-native';
import { Button, StyleSheet, Text, View, Modal } from 'react-native';

function Categories(props) {
  return (
    <Modal visible={props.visible} animationType="slide">
        <View style={styles.appContainer}>
            <View style={styles.homeButton}>
                <Button
                    title="Home"
                    color='#474745'
                    onPress={props.onCancel}
                />
            </View>

        <View style={styles.title}>
            <Text style={{fontSize: 50}}>SafeSpending</Text>
        </View>

        <View style={styles.rowContainer}>
            <View style={styles.buttonsContainer}>
                <View style={styles.addButton}>
                    <Button
                        title="+"
                        color='#10eb18'
                    />
                </View>

                <View style={styles.removeButton}>
                    <Button
                        title="-"
                        color='#e30707'
                    />
                </View>
        </View>

            <View style={styles.scrollAdjusts}>
                <ScrollView style={styles.scrollView}>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                    <Text style={{fontSize: 30}}>"Testing"</Text>
                </ScrollView>
                </View>
            </View>
        </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row-reverse',
  },
  buttonsContainer: {
    flexDirection: 'column',
  },
  title: {
    alignItems: 'center',
  },
  homeButton: {
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingLeft: 15,
  },
  scrollView: {
    backgroundColor: '#d4d9d6',
    marginHorizontal: 20,
    borderColor: '#080808',
    borderWidth: 2,
  },
  scrollAdjusts: {
    height: 420,
    width: 390,
    paddingTop: 40,
    paddingRight: 10,
    paddingLeft: 40,
  },
  addButton: {
    alignItems: 'flex-end',
    paddingTop: 115,
    paddingRight: 35,
    paddingLeft: 5,
  },
  removeButton: {
    alignItems: 'flex-end',
    paddingTop: 55,
    paddingRight: 35,
    paddingLeft: 5,
  }
});

export default Categories;