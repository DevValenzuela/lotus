import {Platform, StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bgImage: {
    flex: 1,
  },
  containerForm: {
    backgroundColor: 'rgba(102,0,102,0.69)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 500
  },
  label: {
    fontSize: 14,
    color: '#00FFFF',
    paddingLeft: 3,
    marginTop: 10,
    marginBottom: 3,
  },
  inputText: {
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    paddingHorizontal: Platform.OS == 'ios' ? 15 : 10,
    paddingVertical: Platform.OS == 'ios' ? 15 : 5,
    margin: 3,
  },
  textareaContainer: {
    height: 120,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#330066',
    color: '#330066',
    borderRadius: 5,
    marginVertical: 5,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#333',
    padding: 10,
  },
  containerCalendar: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  btnActions: {
    opacity: 0.8,
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: '#660066',
    padding: Platform.OS == 'ios' ? 15 : 10,
    borderRadius: 20,
    width: '100%',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  checkBoxActive: {
    backgroundColor: '#3C0065',
    color: '#ffffff',
    borderRadius: 5,
    marginHorizontal: 4,
    textAlign: 'center',
    lineHeight: 50,
    width: 50,
    height: 50,
  },
  checkBox: {
    backgroundColor: '#D5D5D5',
    color: '#3C0065',
    borderRadius: 5,
    marginHorizontal: 4,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
  },
  btnSubmit: {
    padding: Platform.OS == 'ios' ? 15 : 10,
    backgroundColor: '#3C0065',
    borderRadius: 10,
  },
  btnSubmitxt: {
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  symbol:{
    position: 'absolute',
    right: 3,
    backgroundColor: '#330066',
    padding: 12,
    top: 1,
    color: '#ffffff'
  },
  error:{
    backgroundColor: '#3C0065',
    color: '#fff',
    width: '98%',
    padding: 10,
    textAlign: 'center',
    borderRadius: 10
  }
});
