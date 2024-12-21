import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Button, View, SafeAreaView, Pressable, ScrollView, TouchableWithoutFeedback} from 'react-native';

export default function LogoutModal({modalState = useState(false), navigation, logout}) {
  const [modalVisible, setModalVisible] = modalState;
  return (
    <SafeAreaView style={styles.centeredView}>
        <Modal 
        onRequestClose={() => setModalVisible(false)} //perintah menutup modal
        visible={modalVisible} // mengatur modal muncul
        animationType='fade' // untuk mengatur animasi modal
        transparent={true} // untuk mengatur transparansi modal
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

            <View style={styles.modalView}>
              <Text style={styles.modalText}>Konfirmasi Logout</Text>
              <View style={{flexDirection: 'row', gap: 30}}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button color={'red'} title="Logout" onPress={() => {setModalVisible(false); logout(); navigation.navigate('Home')}} />
              </View>
            </View>
        </Modal>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginVertical: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'justify',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
});