import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  bgImage: {
    flex: 1,
  },
  dateTitle: {
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#562A8C',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  btnAdd: {
    width: '90%',
    backgroundColor: '#660066',
    borderRadius: 10
  },
  btnTxtAdd: {
    color: '#ffffff',
    padding: 10,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
});
