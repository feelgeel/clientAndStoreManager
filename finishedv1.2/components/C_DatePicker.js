import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useFormikContext } from "formik";
import moment from 'moment';
import C_text from "./C_Text";
import colors from "../config/colors";
import DateTimePicker from '@react-native-community/datetimepicker';
import C_Button from "./C_Button";
import C_ErrorMessage from "./C_ErrorMessage";
function C_DatePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const [date, setDate] = useState("");
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if(selectedDate){
      let daMonth=selectedDate.getMonth()
      let daDate=selectedDate.getDate()
      let daYear=selectedDate.getFullYear()
      let newDate=`${daDate}-${daMonth}-${daYear}`
      setDate(newDate);
      
console.log( newDate)
      setFieldValue(name,newDate)
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  
  return (
    <View >
   
    <View style={styles.card}>
    <C_text> {date.toLocaleString()}</C_text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date} 
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
       <C_Button title="set perimation Date" 
    width="40%"
    onPress={showDatepicker}
    />
    </View>
    {/* <C_ErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
  flexDirection:"row",
  alignItems: "center",
  justifyContent: "space-between"
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default C_DatePicker;
