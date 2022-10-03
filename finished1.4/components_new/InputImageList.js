import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ImageInput from './ImageInput';

function InputImageList({imageUris=[],onremoveImage,onAddImage}) {
const scrollView=useRef()
    
    return (
    <View>

        <ScrollView ref={scrollView} horizontal 
        onContentSizeChange={()=>scrollView.current.scrollToEnd()}>

            <View style={styles.container}>
                {imageUris.map(uri=>(<View key={uri} style={styles.image}>
                        <ImageInput
                            imageUri={uri}
                            onChangeImage={() => onremoveImage(uri)}
                            />
                        </View>))}
                <ImageInput onChangeImage={uri=>onAddImage(uri)} />
            </View>
        </ScrollView>
    </View>
 );
}
const styles = StyleSheet.create({
container:{
flexDirection:"row"
}
})
export default InputImageList;