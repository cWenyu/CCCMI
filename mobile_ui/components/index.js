import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import Item from './Item';
import styles from './style';

const conf = {
    start: 500,
    end: 100,
    state: true
};

export default class DropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title || '',
            items: this.props.items || [],
            heightItem: 0,
            heightAnimationDrop: new Animated.Value(0),
            open: false,
            droped: false,
            openItems: this.props.openItems || true
        };

        this.onChangeItem = this.onChangeItem.bind(this);
        this.onLayoutItem = this.onLayoutItem.bind(this);
    }

    static Item = Item;

    UNSAFE_componentWillReceiveProps = props => {
        let { heightItem, heightAnimationDrop } = this.state;
        if(conf.state){
            this.setState({
                title: props.title || '',
                items: props.items || [],
                openItems: props.openItems || true
            });
        }

        if(!props.openItems){
            setTimeout(()=>{
                Animated.timing(
                    heightAnimationDrop,
                    {
                        toValue: heightItem,
                        duration: 1,
                        easing: Easing.linear
                    }
                ).start(()=>{
                    if(conf.state){
                        this.setState({open: false, droped: false});
                    }
                });
            }, conf.start);
        }else{
            if(conf.state){
                this.setState({openItems: props.openItems});
            }
        }
    };

    UNSAFE_componentWillMount = () => {
        conf.state = true;
    };

    componentWillUnmount = () => {
        conf.state = false;
    };

    startAnimation = () => {
        let { droped, heightItem, heightAnimationDrop, items } = this.state;
        if(droped){
            this.setState({open: false});
            Animated.timing(
                heightAnimationDrop,
                {
                    toValue: heightItem,
                    duration: conf.start,
                    easing: Easing.linear
                }
            ).start(()=>{
                if(conf.state){
                    this.setState({openItems: false});
                }
            });
        }else{
            let height = ((items.length + 1) * heightItem);
            Animated.timing(
                heightAnimationDrop,
                {
                    toValue: height,
                    duration: conf.start,
                    easing: Easing.linear
                }
            ).start(()=>{
                if(conf.state){
                    this.setState({open: true, openItems: true});
                }
            });
        }
        if(conf.state){
            this.setState({droped: !droped});
        }
    };

    onChangeItem = (id, drop) => {
        let { onChange } = this.props;
        if(drop){
            this.startAnimation();
        }else {
            onChange(id);
        }
    };

    onLayoutItem = (height) => {
        let { heightAnimationDrop } = this.state;
        if(conf.state){
            this.setState({open: false});
        }
        Animated.timing(
            heightAnimationDrop,
            {
                toValue: height,
                duration: conf.end,
                easing: Easing.linear
            }
        ).start(()=>{
            if(conf.state){
                this.setState({openItems: false});
            }
        });
        if(conf.state){
            this.setState({heightItem: height});
        }
    };

    render(){
        let { items, title, heightAnimationDrop, droped, open, openItems } = this.state;
        let { id, onChange, titleStyle } = this.props;

        return(
            <View style={[styles.w100, (!open)?(styles.overflowHidden):(null)]}>
                {
                    (items !== undefined && items.length > 0)?(
                        <Animated.View
                            style={[styles.w100, {height: (!open)?(heightAnimationDrop):('auto')}]}
                        >
                            <Item
                                id={id}
                                title={title}
                                item={[styles.p1,styles.p2, styles.dFlex, styles.alignItemsCenter, styles.row, styles.noWrap]}
                                drop={true}
                                openItems={openItems}
                                droped={droped}
                                text={[styles.font, titleStyle]}
                                onChange={(idItem, drop)=>{
                                    this.onChangeItem(idItem, drop);
                                }}
                                onLayout={(event)=>{
                                    let { x, y, width, height } = event;
                                    this.onLayoutItem(height);
                                }}
                            />
                            <View style={[styles.px2]}>
                                {
                                    items.map((item, index) => {
                                        return(
                                            <Item
                                                key={index}
                                                id={item.id}
                                                item={styles.p1}
                                                title={item.title}
                                                openItems={openItems}
                                                drop={false}
                                                open={open}
                                                titleStyle={titleStyle}
                                                items={item.items}
                                                onChange={(idItem, title)=>{
                                                    onChange(idItem, title);
                                                }}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>
                    ):(
                        <View style={[styles.w100, styles.px2]}>
                            <Item
                                id={id}
                                title={title}
                                openItems={openItems}
                                item={styles.p1}
                                drop={false}
                                onChange={(idItem)=>{
                                    onChange(idItem);
                                }}
                            />
                        </View>
                    )
                }
            </View>
        )
    }
};
