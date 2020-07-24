import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text, View,
  TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform,
  Keyboard, Alert,
  AsyncStorage
} from 'react-native';

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function App() {
  //salvo a lista
  const [task, setTask] = useState([]);
  //salvo o imput e recebe o valor do imput
  const [newTask, setNewTask] = useState('');

  //ADICIONAR e setar o imput como vazio para limpar ele e verificar se tem tarefas iguais 
  async function addTask() {

    if (newTask === "") {
      return;
    }

    const search = task.filter(task => task === newTask);

    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da tarefa Repetido!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask('');

    Keyboard.dismiss();
  }

  // remover tarefa
  async function removeTask(item) {

    Alert.alert(
      "Deletar Tarefa",
      "Tem Certeza que deseja remover esta tarefa?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return;
          },
          style: 'cancel'
        },
        {
          text: "Ok",
          onPress: () => setTask(task.filter(tasks => tasks !== item))
        }
      ],
      { cancelable: false }
    );
    setTask(task.filter(tasks => tasks !== item));

  }
  // dispara  uma função com situação x 
  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    carregaDados();
  }, [])


  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("task", JSON.stringify(task))
    }
    salvaDados();
  }, [task])

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === 'ios'}
      >
        <View style={styles.container}>

          <View style={styles.Body}>
            <FlatList styles={styles.FlatList}
              data={task}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.ContainerView}>
                  <Text style={styles.Texto}> {item} </Text>
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons name="delete-forever"
                      size={25}
                      color="#f64c75" />
                  </TouchableOpacity>
                </View>
              )}

            />
          </View>
          <View style={styles.Form}>
            {/* Adicione uma tarefa  */}
            <TextInput
              style={styles.Input}
              placeholderTextColor="#999"
              autoCorrect={true}
              placeholder="Adicione Uma Tarefa"
              maxLength={50}
              onChangeText={text => setNewTask(text)}
              value={newTask}
            />
            {/* botão add */}
            <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
              <Ionicons name="ios-add" size={25} color="#fff" />
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: "#ece5dd",

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
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#dcf8c6",

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ece5dd",
  },

  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
});
