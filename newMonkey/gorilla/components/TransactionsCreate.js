import {StyleSheet, Text, View, Button, Modal, props, TextInput,Font} from 'react-native'
import {useState, useEffect} from "react"
function CreateTransaction(props){
  const [dataLoading, setDataLoading] = useState(true);
  const [cat, setCat] = useState([]); // array that holds name list
  const [currCat, setCurrCat] = useState(undefined); // for text input box
  const [money, setMoney] = useState([]); // array that holds name list
  const [currMoney, setCurrMoney] = useState(undefined); // for text input box
  const [date, setDate] = useState([]); // array that holds name list
  const [currDate, setCurrDate] = useState(undefined); // for text input box
  const [note, setNote] = useState([]); // array that holds name list
  const [currNote, setCurrNote] = useState(undefined); // for text input box


  const db = SQLite.openDatabase("categories.db"); 

  useEffect(() => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "CREATE TABLE IF NOT EXISTS categories";
      sqlcmd += "  (id INTEGER PRIMARY KEY AUTOINCREMENT,";
      sqlcmd += "   cat TEXT),";
      sqlcmd += "   money INTEGER,";
      sqlcmd += "   date TEXT,";
      sqlcmd += "   note TEXT)";
      tx.executeSql(sqlcmd);
    });

    db.transaction(tx => {
      let sqlcmd = "SELECT * FROM categories";
      tx.executeSql(sqlcmd, [],
        (_, resultSet) => {
          setName(resultSet.rows._array);  // results returned
        }
      );
    });

    setDataLoading(false);
     
  }, []);
  
  if (dataLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading categories...</Text>
      </View>
    );
  }

  const addCategory = () => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "INSERT INTO categories (name) values (?)";
      tx.executeSql(sqlcmd, [currName],
          (_, resultSet) => {
          let existingName = [...name];
          existingName.push({ id: resultSet.insertId, name: currName});
          setName(existingName);
        })
    });
  }

  const showCategories = () => {
    return name.map((assObj) => {
      return (
        <View key={assObj.id} style={styles.row}> 
          <Text>{assObj.name}</Text>


        </View>
      );
    });
  };


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
                <Button  title = "Confirm Creation" color= "green" style = {styles.addButton} width = "40%" onPress = {addCategory}> </Button>
              </View>
          </View>

          <View style = {styles.appContainer}>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Category to Create
                </Text>
                <TextInput 
                  value = {currName}
                  style = {styles.textInput} 
                  placeholder = "ex. groceries" 
                  onChangeText = {setCurrName}
                />
              </View>
              <View style = {styles.column}>{showCategories()}</View>
 
            </View>
        </Modal>
        
    )
  function handleCat(enteredCatText){
    setCatVisible(enteredCatText);
  }
  function handleMon(enteredMonText){
    setMonVisible(enteredMonText);
  }
  function handleDate(enteredDateText){
    setDateVisible(enteredDateText);
  }
  function handleNote(enteredNoteText){
    setNoteVisible(enteredNoteText);
  }
  

  
    return(
        <Modal visible = {props.visibleT} animationType = "slide">
          <View style = {styles.appContainer}>
            <View style = {styles.buttons}>
              <View style={styles.backButton}>
                <Button
                  color = "red"
                  title = "cancel"
                  onPress={props.onCancelT}
                />
              </View>
              <View style = {styles.confirmButton}>
                <Button title = "Confirm Transaction" color= "green" style = {styles.addButton} width = "40%"> </Button>
              </View>
            </View>
            
            <View style = {styles.appContainer}>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Category
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder ="ex. groceries" 
                  onChangeText={handleCat}
                />
              </View>
                <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Money Amount  
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. 100.49" 
                  onChangeText={handleMon}
                />
              </View>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Date
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. 03/06/2023" 
                  onChangeText={handleDate}
                />
              </View>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Note
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. dinner party" 
                  onChangeText={handleNote}
                />
              </View>  
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
export default CreateTransaction;