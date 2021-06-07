import {StyleSheet} from 'react-native';
    
const StyleGlobal = StyleSheet.create({
    container:{
        paddingHorizontal:15,
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#303030'
        
    },
    buttonLogin: {
        borderRadius: 10,
        alignItems: "center",
        width:'33.33%',
        backgroundColor: "#303030",
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 30,
    },
    buttonLoginText:{
        fontSize:16,
        fontWeight:'bold',
        color:'white',
        textTransform:'uppercase',
    }
});
export default StyleGlobal;