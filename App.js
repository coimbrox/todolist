import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function App() {
  //salvo a lista
  const [task, setTask] = useState(['Gabriel', 'Dany', 'Maria']);
  //salvo o imput
  const [newTask, setNewTask] = useState('');





  return (
    <>
      <View style={styles.container}>

        <View style={styles.Body}>
          <FlatList styles={styles.FlatList}
            data={task}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Text>{item} </Text>}

          />
        </View>
        <View style={styles.Form}>
          <TextInput
            style={styles.Input}
            placeholderTextColor="#999"
            autoCorrect={true}
            placeholder="Adicione Uma Tarefa"
            maxLength={50}
          />
          <TouchableOpacity style={styles.Button}>
            <Ionicons name="ios-add" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#128c7e',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
  Body: {
    flex: 1,
    backgroundColor: "#dcf8c6",

  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#128c7e",
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#075e54",
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#34b7f1",
    borderRadius: 4,
    marginLeft: 10,
  },
  FlatList: {
    flex: 1,
    marginTop: 25,

  }
});
