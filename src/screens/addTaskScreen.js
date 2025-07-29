import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getDBConnection, insertTask } from "../database/db";
import { TextInput, Button, RadioButton } from 'react-native-paper';
import * as colors from '../utilities/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import Toast from "../components/toast";

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [priority, setPriority] = useState('');

  const [date, setDate] = useState('')
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddTask = async () => {
    const finalTitle = title.trim() !== '' ? title : 'Untitled Task';
    const finalDescription = description.trim() !== '' ? description : 'No description';
    const finalDate = date !== '' ? date : 'No date selected';
    const finalPriority = priority !== '' ? priority : 'Not set';

    const db = await getDBConnection();
    await insertTask(db, {
      title: finalTitle,
      description: finalDescription,
      date: finalDate,
      priority: finalPriority
    });

    Toast('Task Added!');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        label="Title"
        value={title}
        mode="outlined"
        multiline={true}
        outlineColor={colors.primaryDark}
        activeOutlineColor={colors.buttonColor}
        onChangeText={setTitle}
        style={styles.textInput}
      />

      <TextInput
        label="Description"
        value={description}
        mode="outlined"
        multiline={true}
        outlineColor={colors.primaryDark}
        activeOutlineColor={colors.buttonColor}
        onChangeText={setdescription}
        style={styles.textInput}
      />

      <Text style={{ marginTop: 14, marginBottom: 4, fontWeight: 'bold', fontSize: 16 }}>Date:</Text>

      <View style={{ alignItems: 'flex-start' }}>
        <Button
          style={{ backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: colors.primaryDark }}
          labelStyle={{ color: colors.primaryDark }}
          onPress={() => setOpenDatePicker(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="calendar" size={20} color={colors.primaryDark} style={{ marginRight: 8 }} />
            <Text style={{ color: colors.primaryDark, fontWeight: 'bold' }}>{date ? `Selected: ${date}` : 'Select Date'}</Text>
          </View>
        </Button>
      </View>

      <DatePicker
        modal
        open={openDatePicker}
        date={selectedDate}
        mode="date"
        buttonColor='deeppink'
        dividerColor='lime'
        onConfirm={(dateValue) => {
          setOpenDatePicker(false);
          setSelectedDate(dateValue);
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const day = dateValue.getDate().toString().padStart(2, '0');
          const month = months[dateValue.getMonth()];
          const year = dateValue.getFullYear();
          const formatted = `${day}-${month}-${year}`;
          setDate(formatted);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />

      <Text style={{ marginTop: 14, marginBottom: 4, fontWeight: 'bold', fontSize: 16 }}>Priority:</Text>

      <RadioButton.Group
        onValueChange={(newValue) => setPriority(newValue)}
        value={priority}
      >
        <View style={{ flexDirection: 'row' }}>
          {['Low', 'Medium', 'High'].map((priority_, index) => (
            <View key={index} style={styles.optionsContainer}>
              <RadioButton value={priority_} color={colors.primaryDark} />
              <Text>{priority_}</Text>
            </View>
          ))}
        </View>
      </RadioButton.Group>

      <View style={{ alignItems: 'flex-end' }}>
        <Button
          style={{ backgroundColor: colors.buttonColor, marginTop: 20 }}
          labelStyle={styles.buttonLabel}
          onPress={handleAddTask}
        >
          Add Task
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLabel: {
    fontSize: 15,
    paddingHorizontal: 20,
    color: colors.primaryLight
  },

  textInput: {
    marginVertical: 5,
  },

  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddTaskScreen;
