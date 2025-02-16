const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    margin: 10,
  },
  question: {
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: '700',
    color: '#000000',
  },
  example: {
    fontSize: 14,
    marginBottom: 10,
    color: '#888',
    letterSpacing: 1,
    color: 'gray',
  },
  btn: {
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    width: '50%',
    alignSelf: 'flex-end',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  result: {
    fontSize: 18,
    marginVertical: 10,
  },

  loggerText: {
    borderWidth: StyleSheet.hairlineWidth,
    padding:5
  },

  clearBtn: {
    margin: 5,
    alignItems: 'flex-start',
  },
  clearTxt: {
    fontSize: 15,
    color: 'blue',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});

export default styles;
