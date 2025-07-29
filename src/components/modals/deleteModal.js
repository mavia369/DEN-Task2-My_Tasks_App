import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native"
import * as colors from '../../utilities/colors'
import { Button } from "react-native-paper";

const DeleteModal = (props) => {
  return (
    <Modal
      visible={props.showDelModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => props.setShowDelModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => props.setShowDelModal(false)}>
        <View style={styles.modalBackground}>
          {/* To prevent closing when tapping inside the modal*/}
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 20 }}>Are you sure you want to delete this task?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                <Button
                  labelStyle={styles.buttonLabel}
                  onPress={() => props.setShowDelModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  style={{ backgroundColor: colors.danger }}
                  labelStyle={[styles.buttonLabel, { color: colors.primaryLight }]}
                  onPress={() => { props.setShowDelModal(false); props.onConfirmDelete(); }}
                >
                  Confirm
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  modalContent: {
    padding: 24,
    backgroundColor: colors.primaryLight,
    borderRadius: 30,
    elevation: 10,
  },

  buttonLabel: {
    fontSize: 15,
    paddingHorizontal: 20,
    color: colors.buttonColor,
  },
});

export default DeleteModal;