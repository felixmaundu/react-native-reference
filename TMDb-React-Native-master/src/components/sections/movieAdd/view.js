import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { Button, TextInput } from './../../widgets/'
import styles from './styles'
import ImagePicker from 'react-native-image-picker'

export default class extends Component {

    constructor(props) {
        super(props)

        if(props.isEdit && props.movie) {
            this.state = {
                title: props.movie.title,
                overview: props.movie.overview,
                image: { preview: {uri: props.movie.poster_path }},
            }
        } else {
            this.state = {
                title: '',
                overview: '',
                image: null,
            }
        }

        this.options = {
            title: 'Search Image',
            maxWidth: 640,
            maxHeight: 640,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
    }

    _validateForm() {
        const {title, overview, image} = this.state 
        if(title && overview && image) {
            return true
        } else {
            return false
        }
    }

    _onSubmit() {

        if(this._validateForm()) {
            const {title, overview, image} = this.state 
            if(this.props.isEdit) {
                const movie = this.props.movie.id
                const imageData = this.state.image.data ? { image: this.setState.iamge.data } : {}
                const data = {
                    ...imageData,
                    title: title,
                    overview: overview, 
                }
            } else {
                const data = {
                    title: title,
                    overview: overview,
                    image: image.data,
                }
                this.props.onSubmitMovie(data)
            }
        } else {
            Alert.alert('Error', 'Fill in all the fields.')
        }
    }

    _onImagePickerTapped() {
        ImagePicker.showImagePicker(this.options, (response) => {
            if (response.uri && response.data) {
              let preview = { uri: response.uri };
              let data = 'data:image/jpeg;base64,' + response.data 
              this.setState({
                image: { preview, data }
              });
            }
          });
    }

    _renderTextInput(label, key, placeholder = '') {
        return (
            <TextInput 
                label={label}
                value={this.state[key]}
                onChangeText={ v => this.setState({ [key]: v }) }
                placeholder={placeholder}
            />
        )
    }

    _renderImageInput() {
        const imageUri = this.state.image ? this.state.image.preview : null
        const imageLabel = this.state.image ? 'Pick another image' : 'Pick image *'
        return (
            <View style={{marginTop: 20}}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this._onImagePickerTapped()}>
                    <Image source={imageUri} style={styles.image} resizeMode={'cover'} />
                    <Text style={styles.imageText}>{imageLabel}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
 
                <View style={{paddingTop: 40, padding: 20}}>
                    { this._renderTextInput('Movie Title: *', 'title', 'Traveling to the future.') }
                </View>

                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                    <TextInput  
                        label={'Overview: *'} 
                        value={this.state.overview} 
                        onChangeText={ overview => this.setState({ overview }) } 
                        placeholder={'32'}/>
                </View>
                
                <View style={{ paddingHorizontal: 20, paddingBottom: 40}}>
                    { this._renderImageInput() }
                </View>

                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                    <Button label={'Save'.toUpperCase()} onPress={() => this._onSubmit()} isFetching={this.props.isFetching} 
                    />
                </View>
            </View>
        )
    }
}

//functional component
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
// import { Button, TextInput } from './../../widgets/';
// import styles from './styles';
// import ImagePicker from 'react-native-image-picker';

// const Form = (props) => {
// const [title, setTitle] = useState(props.isEdit && props.movie ? props.movie.title : '');
// const [overview, setOverview] = useState(props.isEdit && props.movie ? props.movie.overview : '');
// const [image, setImage] = useState(props.isEdit && props.movie ? { preview: {uri: props.movie.poster_path } } : null);
// const options = {
// title: 'Search Image',
// maxWidth: 640,
// maxHeight: 640,
// storageOptions: {
// skipBackup: true,
// path: 'images'
// }
// };
// const validateForm = () => {
//     if (title && overview && image) {
//         return true;
//     } else {
//         return false;
//     }
// }

// const onSubmit = () => {
//     if (validateForm()) {
//         if (props.isEdit) {
//             const movie = props.movie.id;
//             const imageData = image.data ? { image: image.data } : {};
//             const data = {
//                 ...imageData,
//                 title: title,
//                 overview: overview, 
//             }
//         } else {
//             const data = {
//                 title: title,
//                 overview: overview,
//                 image: image.data,
//             }
//             props.onSubmitMovie(data);
//         }
//     } else {
//         Alert.alert('Error', 'Fill in all the fields.');
//     }
// }

// const onImagePickerTapped = () => {
//     ImagePicker.showImagePicker(options, (response) => {
//         if (response.uri && response.data) {
//           let preview = { uri: response.uri };
//           let data = 'data:image/jpeg;base64,' + response.data;
//           setImage({ preview, data });
//         }
//       });
// }

// const renderTextInput = (label, key, placeholder = '') => {
//     return (
//         <TextInput 
//             label={label}
//             value={key}
//             onChangeText={ v => {
//                 if (key === 'title') {
//                     setTitle(v);
//                 } else if (key === 'overview') {
//                     setOverview(v);
//                 }
//             } }
//             placeholder={placeholder}
//         />
//     )
// }

// const renderImageInput = () => {
//     const imageUri = image ? image.preview : null;
//     const imageLabel = image ? 'Pick another image' : 'Pick image *';
//     return (
//         <View style={{marginTop: 20}}>
//             <TouchableOpacity style={styles.imageContainer} onPress={onImagePickerTapped}>
//                 <Image source={imageUri} style={styles.image} resizeMode={'cover'} />
               
