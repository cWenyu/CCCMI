import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';


const USERNAME_NOT_EXITS = "Username Not Exist";

const SignUpScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        check_emailtInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidEmail: true,
        isValidPassword: true,
        isPassword: true,
        confirm_secureTextEntry: true,
        isValidInput: true,
        notExistUser: true,
        notExistEmail: true,
        greenTickUser: false,
        greenTickEmail: false,

    });

    const checkUserNameExist = async (val) => {
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('username', val);

            let response = await axios({
                method: 'post',
                url: 'http://cccmi-aquality.tk/aquality_server/useraccount/checkname',
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (response && response.data && response.data.status) {
                if (val.length !== 0 && val.trim().length >= 4) {

                    if (response.data.status === "Username Not Exist") {
                        setData({
                            ...data,
                            username: val,
                            notExistUser: true,
                            greenTickUser: true,
                            isValidUser: true,
                        });
                    } else {
                        setData({
                            ...data,
                            notExistUser: false,
                            greenTickUser: false,
                            isValidUser: true,
                        });
                    }
                } else {
                    setData({
                        ...data,
                        isValidUser: false,
                        greenTickUser: false,
                        notExistUser: true,
                    });
                }

            }

        } catch (e) {
            console.error(e)
        }
    }

    const checkUserEmailExist = async (val) => {
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('email', val);

            let response = await axios({
                method: 'post',
                url: 'http://cccmi-aquality.tk/aquality_server/useraccount/checkemail',
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            const validEmail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            if (validEmail.test(val.trim())) {

                if (response && response.data && response.data.status) {

                    if (response.data.status === "Email Not Exist") {
                        setData({
                            ...data,
                            email: val,
                            greenTickEmail: true,
                            isValidEmail: true,
                            notExistEmail: true,
                        });
                    } else {
                        setData({
                            ...data,
                            greenTickEmail: false,
                            isValidEmail: true,
                            notExistEmail: false,
                        });
                    }
                }

            } else {
                setData({
                    ...data,
                    greenTickEmail: false,
                    isValidEmail: false,
                    notExistEmail: true,
                });
            }

        } catch (e) {
            console.error(e)
        }
    }

    const handlePasswordChange = (val) => {
        const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\$%\^&\*])(?=.{8,})");
        if (strongPassword.test(val.trim())) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        if (val.trim() == data.password.trim()) {
            setData({
                ...data,
                confirm_password: val,
                isPassword: true
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                isPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }


    const handleSignUp = async () => {
        if (data.username.length == 0 || data.email.length == 0 || data.password.length == 0 || data.confirm_password.length == 0) {
            setData({
                ...data,
                isValidInput: false,
            });
        } else {
            if (data.isValidEmail && data.greenTickUser && data.isValidPassword && data.isPassword) {
                try {
                    var bodyFormData = new FormData();
                    bodyFormData.append('username', data.username);
                    bodyFormData.append('email', data.email);
                    bodyFormData.append('password', data.password);

                    let response = await axios({
                        method: 'post',
                        url: 'http://aquality-server.eba-rxqnbumy.eu-west-1.elasticbeanstalk.com/aquality_server/useraccount/register',
                        data: bodyFormData,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })

                    if (response && response.data && response.data.status) {
                        if (response.data.status === "Register Sucess") {
                            navigation.navigate('SignInScreen')
                        }
                    }

                } catch (e) {
                    console.error(e)
                }
            }
        }

    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={styles.text_footer}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onEndEditing={(val) => {
                                checkUserNameExist(val.nativeEvent.text);
                            }}
                        />
                        {data.greenTickUser ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                    {data.notExistUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Username taken.</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Email Address</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onEndEditing={(val) => {
                                checkUserEmailExist(val.nativeEvent.text);
                            }}
                        />
                        {data.greenTickEmail ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidEmail ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Please enter a valid email address.</Text>
                        </Animatable.View>
                    }
                    {data.notExistEmail ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Email taken.</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onEndEditing={(val) => {
                                setData({
                                    ...data,
                                    password: val.nativeEvent.text
                                });
                                handlePasswordChange(val.nativeEvent.text);
                                console.log(val.nativeEvent.text);
                            }}
                        />

                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Passwords must contain:{"\n"}
                                At least 8 characters, one uppercase letter, one lowercase letter, one number digit, special character.{"\n"}
                            </Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password not match.</Text>
                        </Animatable.View>
                    }


                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    {data.isValidInput ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>All fields ablove must be filled.</Text>
                        </Animatable.View>
                    }
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { handleSignUp() }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
}


export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    }
});
