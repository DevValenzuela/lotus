import {Platform, StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  dateTitle: {
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#660066',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 10,
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  contentSearch: {
    flexDirection: 'row',
    padding: 10,
  },
  searchIcon: {
    width: 22,
    height: 22,
    right: 20,
    top: '45%',
    position: 'absolute',
    zIndex: 999,
  },
  txtSearch: {
    paddingVertical: Platform.OS == 'ios' ? 15 : 8,
    paddingHorizontal: Platform.OS == 'ios' ? 15 : 10,
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 40,
    color: '#330066',
    fontSize: 14,
  },
  iconActions:{
    width: 20
  }
});
