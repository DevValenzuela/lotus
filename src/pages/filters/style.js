import {StyleSheet} from 'react-native';

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
    padding: 10,
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
    top: 20,
    position: 'absolute',
    zIndex: 999,
  },
  txtSearch: {
    padding: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 40,
    color: '#330066',
    fontSize: 14,
  },
});
