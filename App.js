import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [estado, setEstado] = useState('leitura')
  const [anotacao, setAnotacao] = useState('')

  useEffect(() => {
    // QUando inicializar o app, quero que leia a key 'anotacao'

    (async () => {
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao')
        setAnotacao(anotacaoLeitura)
      }catch(error){

      }
    })();

  },[])

  setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao', anotacao)
    }catch(error){
      console.log(error)
    }

    alert(anotacao)
  }

  function atualizarTexto(){
    setEstado('leitura');
    setData();
  }

  if(estado == 'leitura'){

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>App Anotações</Text>
        </View>
      {
        (anotacao == undefined || null || '')?
        <View style={{padding:20}}>
          <Text style={{opacity:0.3}}>
            Nenhuma anotação encontrada
          </Text>
        </View>
        :
        <View style={{padding:20}}>
          <Text style={styles.notation}>{anotacao} </Text>
        </View>
      }
        <TouchableOpacity style={styles.btnNotation}
          onPress={() => setEstado('atualizando')}
          >
          <Text style={styles.btnNotationTexto}>+</Text>
        </TouchableOpacity>

      </View>
    );

  }else if(estado == 'atualizando'){

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>App Anotações</Text>
        </View>

        <TextInput
          autoFocus={true}
          style={styles.textInput}
          onChangeText={(text)=>{setAnotacao(text)}}
          multiline={true}
          numberOfLines={10}
          value={anotacao}
        ></TextInput>

        <TouchableOpacity style={styles.btnNotationSave}
          onPress={() => atualizarTexto()}
          >
          <Text style={styles.btnNotationTextoSave}>Salvar</Text>
        </TouchableOpacity>

      </View>
    );

  }

  
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex:1
  },

  header:{
    width:'100%',
    padding:20,
    backgroundColor:'#069'
  },

  textHeader:{
    color:'white',
    textAlign:'center',
    fontSize:20
  },

  notation:{
    fontSize:18
  },

  btnNotation:{
    position:'absolute',
    bottom:20,
    right:20,
    width:50,
    height:50,
    backgroundColor:'#069',
    borderRadius:25,
    alignItems:'center'
  },

  btnNotationTexto:{
    color:'white',
    position:'relative',
    textAlign:'center',
    fontSize:25,
    top:4
  },

  btnNotationTextoSave:{
    color:'white',
    position:'relative',
    textAlign:'center',
    fontSize:20,
    top:0
  },

  btnNotationSave:{
    position:'absolute',
    bottom:20,
    right:20,
    width:120,
    padding:7,
    backgroundColor:'#069',
    alignItems:'center',
    borderRadius:20
  },
  textInput:{
    padding:20,
    height:300,
    textAlignVertical:'top'
  }
});
