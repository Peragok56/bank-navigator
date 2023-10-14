// React / React-Native
import React, { FC, memo, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Modal, PanResponder, Animated, Platform } from "react-native";
// Type
import { IBottomSheet } from "./BottomSheet.type";

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

const BottomSheet: FC<IBottomSheet> = ({
    opened,
    children,
    closeModal
}) => {

    const [sheetHeight, setSheetHeight] = useState<number>(0);
    const translateY = new Animated.Value(0);
    const sheetRef = useRef<View>(null);

    const handleSheetLayout = () => {
        if (sheetRef.current) {
            sheetRef.current.measure((_x, _y, width, height) => {
                setSheetHeight(height);
            });
        }
    };

    useEffect(() => {
        if (opened) {
            handleSheetLayout();
        }
    }, [opened]);

    const SWIPE_VELOCITY = -100

    const MIN_SWIPE_DISTANCE = sheetHeight * 0.5;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState: any) => {
            if (gestureState.dy > 0) {
                translateY.setValue(gestureState.dy);
            } else {
                translateY.setValue(0);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > MIN_SWIPE_DISTANCE) {
                closeModal();
            } else {
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    const animatedStyle = {
        transform: [{ translateY: translateY }],
    };

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={opened}
            style={styles.container}
        >

            <Animated.View {...panResponder.panHandlers} style={[styles.modalContainer, animatedStyle]} ref={sheetRef} onLayout={handleSheetLayout}>
                <View style={styles.hair}/>
                {children}
            </Animated.View>
        </Modal>
    )
}

export default memo(BottomSheet)

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        backgroundColor: '#00000030',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    modalContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        paddingBottom: 72,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        position: 'absolute',
        bottom: 0,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: .7,
        shadowRadius: 5,
        elevation: Platform.OS === 'android' ? 5 : 0,
        minHeight: 300
    },
    hair: {
        width: 75,
        opacity: .4,
        height: 3,
        borderRadius: 12,
        backgroundColor: 'gray',
        top: 10,
        position: 'absolute',
    },
    modalContent: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        width: '95%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
})