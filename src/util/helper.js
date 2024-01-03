import Constants from 'expo-constants'; 
import { Dimensions } from 'react-native'; 
import moment from 'moment';

export const StatusBarHeight = Constants.statusBarHeight; 
export const ScreenWidth = Dimensions.get('screen').width; 
export const ScreenHeight = Dimensions.get('screen').height; 

export const getDaysOfWeek = () => {
    const daysOfWeek = [];
  
    const startDate = moment().startOf('week');
    const endDate = moment().endOf('week');
  
    for (let currentDay = startDate.clone(); currentDay.isSameOrBefore(endDate); currentDay.add(1, 'days')) {
      const formattedDate = currentDay.format('YYYY-MM-DD');
      const dayOfWeek = currentDay.format('ddd');
      daysOfWeek.push({ date: formattedDate, day: dayOfWeek, count : 0 });
    }
  
    return daysOfWeek;
  };

  export const getDatesofWeek = () => {
    const datesOfWeek = [];

    const startDate = moment().startOf('week');
    const endDate = moment().endOf('week');
    
    for (let currentDay = startDate.clone(); currentDay.isSameOrBefore(endDate); currentDay.add(1, 'days')) {
      const formattedDate = currentDay.format('YYYY/MM/DD');
      datesOfWeek.push(formattedDate);
    }
  
    return datesOfWeek;
  }

