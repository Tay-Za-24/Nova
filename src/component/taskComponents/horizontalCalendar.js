import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../store/dateSlice';
import Moment from 'moment';
import { ScreenHeight, ScreenWidth } from '../../util/helper';
import moment from 'moment';
import { selectUser } from '../../store/userSlice';
import { getTasks } from '../../services/taskService';

const { width, height } = Dimensions.get('window');

const HorizontalCalendar = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const {userID} = useSelector(selectUser)

  useEffect(() => {
    const unsubscribe = getTasks(userID, (tasks) => {
      const extractedDates = tasks.map((task) => task.date);
      setDates(extractedDates);
      setDefaultDate();
    });

    return () => unsubscribe();
  }, []);

  const setDefaultDate = () => {
    const today = moment();
    const formattedToday = today.format('YYYY-MM-DD');
    dispatch(setDate(formattedToday));
  };

  const onDateSelected = (date) => {
    if (date) {
      const formattedDate = Moment(date).format('YYYY-MM-DD');
      dispatch(setDate(formattedDate));
      setSelectedDate(date);
    }
  };

  const markedDates = dates.map((date) => ({
    date: Moment(date).toDate(),
    lines: [
      {
        color: '#457b9d',
      },
    ],
  }));

  // useEffect(() => {
  //   console.log('Tasks:', tasks);
  //   console.log('Selected Date:', selectedDate);
  //   console.log('Marked Dates:', markedDates);
  // }, [tasks, selectedDate]);

  return (
    <View>
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 50 }}
        daySelectionAnimation={{
          type: 'border',
          duration: 100,
          borderWidth: 1,
          borderHighlightColor: '#457b9d',
        }}
        style={[styles.calendar, { width }]}
        calendarHeaderStyle={{ color: '#457b9d', fontSize: 20 }}
        calendarColor={'#f8f9fb'}
        dateNumberStyle={{ color: '#83b0e1' }}
        dateNameStyle={{ color: '#83b0e1' }}
        highlightDateNumberStyle={{ color: '#457b9d' }}
        highlightDateNameStyle={{ color: '#457b9d' }}
        disabledDateNameStyle={{ color: '#457b9d' }}
        disabledDateNumberStyle={{ color: '#457b9d' }}
        dayContainerStyle={styles.container}
        onDateSelected={onDateSelected}
        selectedDate={selectedDate}
        startingDate={new Date()}
        markedDates={markedDates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 150,
    paddingTop: 30,
    paddingLeft: '3%',
    paddingRight: '3%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#83b0e1',
    borderWidth: 1,
  },
  icon: {
    opacity: 0,
  },
  container: {
    width: ScreenWidth * 0.13,
    height: ScreenHeight * 0.07,
    borderRadius: 10,
  },
});

export default HorizontalCalendar;