import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DropDown from './index';
import styles from './style';

const Item = props => (
    <View>
        {
            (props.items !== undefined) ? (
                <DropDown
                    title={props.title}
                    id={props.id}
                    items={props.items}
                    openItems={props.openItems}
                    titleStyle={props.titleStyle}
                    onChange={(id, title) => {
                        props.onChange(id, title);
                    }}
                />
            ) : (
                <View
                    style={[styles.p1]}
                    onLayout={(event) => {
                        if (props.onLayout !== undefined) {
                            props.onLayout(event.nativeEvent.layout);
                        }
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[props.item, (Platform.OS === 'ios') ? ({ height: 25 }) : (null)]}
                        onPress={() => {
                            props.onChange(props.id, props.title, props.drop);
                        }}
                    >
                        {
                            (props.drop) ? (
                                <View style={styles.pr1}>
                                    <View style={[styles.caret, (props.droped) ? ({ transform: [{ rotateZ: '135deg' }] }) : ({ transform: [{ rotateZ: '-45deg' }] })]}></View>
                                </View>
                            ) : (null)
                        }
                        <Text style={[styles.item, props.text]}>{props.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    </View>
);

export default Item;
