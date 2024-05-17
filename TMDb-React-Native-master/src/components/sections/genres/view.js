import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './styles'
import { GenreCell } from './../../widgets/'

import * as GenresActions from './../../../redux/genres/actions'

class Genres extends Component {

    componentDidMount() {
        this.props.fetchGenresList()
    }

    _onGenreTapped(genre) {
        this.props.onGenreTapped(genre)
    }

    _renderItem({ item }) {
        return ( 
            <GenreCell 
                genre={item}
                onGenrePress={ v => this._onGenreTapped(v) } 
            />
        )
    }

    _renderActivityIndicator() {
        if(!this.props.isFetching) {
            return null
        }
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
                <ActivityIndicator size={'large'} color={'white'} animating={true} />
            </View>
        )
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.list}
                    renderItem={ value => this._renderItem(value) }
                    keyExtractor={ (item, i) => 'cell' + item.id }
                    extraData={this.props}
                    numColumns={1}
                    style={{paddingTop: 0}}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                { this._renderActivityIndicator() }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.genres.isFetching,
        list: state.genres.list,
    }
} 

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGenresList: () => {
            dispatch(GenresActions.fetchGenresList())
        },
        onGenreTapped: (genre) => {
            dispatch(GenresActions.setItem(genre))
            Actions.movies({ title: genre.name })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres)



//functional component 
// import React, { useEffect } from 'react';
// import { View, FlatList, ActivityIndicator } from 'react-native';
// import { connect } from 'react-redux';
// import GenresActions from '../../Stores/Genres/Actions';
// import * as Actions from '../../Navigation/Actions';
// import GenreCell from './GenreCell';

// const Genres = ({ fetchGenresList, isFetching, list, onGenreTapped }) => {
//   useEffect(() => {
//     fetchGenresList();
//   }, []);

//   const renderSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: '86%',
//           backgroundColor: '#CED0CE',
//           marginLeft: '14%',
//         }}
//       />
//     );
//   };

//   const renderItem = ({ item }) => {
//     return (
//       <GenreCell
//         genre={item}
//         onGenrePress={(v) => onGenreTapped(v)}
//       />
//     );
//   };

//   const renderActivityIndicator = () => {
//     if (!isFetching) {
//       return null;
//     }
//     return (
//       <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
//         <ActivityIndicator size={'large'} color={'white'} animating />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={list}
//         renderItem={renderItem}
//         keyExtractor={(item, i) => `cell${item.id}`}
//         extraData={this.props}
//         numColumns={1}
//         style={{ paddingTop: 0 }}
//         ItemSeparatorComponent={renderSeparator}
//       />
//       {renderActivityIndicator()}
//     </View>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     isFetching: state.genres.isFetching,
//     list: state.genres.list,
//   };
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     fetchGenresList: () => {
//       dispatch(GenresActions.fetchGenresList());
//     },
//     onGenreTapped: (genre) => {
//       dispatch(GenresActions.setItem(genre));
//       Actions.movies({ title: genre.name });
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Genres);
