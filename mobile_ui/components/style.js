import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    w100: {
        width: '100%'
    },

    dFlex: {
        display: 'flex'
    },

    row: {
        flexDirection: 'row'
    },

    noWrap: {
        flexWrap: 'nowrap'
    },

    alignItemsCenter: {
        alignItems: 'center',
    },

    p1: {
        padding: 5,
        width: '100%',
    },

    p2:{
        height: 70,
        borderTopColor: 'lightgrey',
        borderTopWidth: 1,
        alignSelf: 'center',
        // borderBottomColor: 'grey',
        // borderBottomWidth: 1,
        // marginBottom:0,
    },

    overflowHidden: {
        overflow: 'hidden',
    },

    font: {
        paddingLeft: 0,
        fontSize: 21,
        marginTop: 0,
        width: '100%',
        // fontWeight: 'bold',
        color: '#424242',
    },
    item: {
        paddingLeft: 20,
        fontSize: 18,
        marginTop: 0,
        width: '100%',
        color: '#424242',
    },
    border:{
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        marginBottom: 30,
    },

    caret: {
        width: 10,
        height: 10,
        borderLeftWidth: 2,
        borderLeftColor: 'grey',
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        borderStyle: 'solid',
        left: 350,
    }
});

export default styles;
