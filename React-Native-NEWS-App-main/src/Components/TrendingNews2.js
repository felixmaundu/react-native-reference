import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, View, Image, Text, TouchableOpacity} from 'react-native';
import config from '../../config/config';

const TrendingNews = ({navigation}) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${config.API_KEY}`,
    )
      .then(res => res.json())
      .then(response => {
        setNews(response.articles);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      {news.length === 0 ? (
        <ActivityIndicator color="black" size="large" />
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {news.map((news, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('WebView', {
                  url: news.url
              })}>
            <View style={{margin: 10}}>
              <Image
                source={{uri: `${news.urlToImage}`}}
                style={{height: 200, width: 200, borderRadius: 10}}
              />
              <Text style={{width: 200, textAlign: 'justify'}}>
                {news.title}
              </Text>
            </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TrendingNews;
