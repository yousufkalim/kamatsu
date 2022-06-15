import { View, Modal as MModal, Text, Pressable } from "react-native"
import React from "react"

import CloseIcon from "../../assets/svg/close.svg"
import { styles } from "./styles"

const Modal = ({
  modalVisible,
  setModalVisible,
  title = "Title",
  showHeader = true,
  children
}) => {
  return (
    <MModal transparent visible={modalVisible}>
      <View style={styles.modalView}>
        <View style={styles.centeredView}>
          {showHeader && (
            <>
              <View style={styles.header}>
                <Pressable onPress={() => setModalVisible(false)}>
                  <CloseIcon height={24} width={24} />
                </Pressable>
              </View>
              <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
              </View>
            </>
          )}
          {children}
        </View>
      </View>
    </MModal>
  )
  {
  }
}

export default Modal
