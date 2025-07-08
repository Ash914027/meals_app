import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Add this import at the top if not already

// Categories
const categories = [
  { name: 'Appetizers', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', description: 'Start your meal right' },
  { name: 'Main Courses', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=400&q=80', description: 'Hearty and filling' },
  { name: 'Desserts', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80', description: 'Sweet treats' },
  { name: 'Drinks', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80', description: 'Refresh yourself' },
  { name: 'Salads', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1510626176961-4bfb7f66d610?auto=format&fit=crop&w=400&q=80', description: 'Fresh and healthy' },
  { name: 'Soups', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=400&q=80', description: 'Warm and comforting' },
  { name: 'Snacks', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', description: 'Quick bites' },
  { name: 'Seafood', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', description: 'From the sea' },
  { name: 'Pasta', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=400&q=80', description: 'Italian classics' },
  { name: 'Pizza', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1548365328-9c6db5c1bfc5?auto=format&fit=crop&w=400&q=80', description: 'Cheesy goodness' },
  { name: 'Grill', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1603079842306-b2b0ae9ec107?auto=format&fit=crop&w=400&q=80', description: 'Grilled to perfection' },
  { name: 'Vegan', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1529692236671-f1e0f142b1a4?auto=format&fit=crop&w=400&q=80', description: 'Plant-based' },
  { name: 'Breakfast', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1587731346680-0cfb3a3f4fd1?auto=format&fit=crop&w=400&q=80', description: 'Start your day' },
  { name: 'Asian', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1598515214219-c3b92c0e0a4a?auto=format&fit=crop&w=400&q=80', description: 'Oriental flavors' },
  { name: 'Mexican', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1598514982756-c6f9e8dbb95c?auto=format&fit=crop&w=400&q=80', description: 'Spicy and vibrant' },
  { name: 'BBQ', route: 'Dishlist', image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb30?auto=format&fit=crop&w=400&q=80', description: 'Smoky and bold' },
];

const numColumns = 4;
const cardSize = (Dimensions.get('window').width - 40) / numColumns - 10;

function Welcome() {
  const navigation = useNavigation();
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  return (
    <View style={[styles.container, darkTheme ? styles.darkContainer : styles.lightContainer]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <MaterialCommunityIcons
          name={darkTheme ? 'weather-sunny' : 'weather-night'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      <Text style={[styles.title, darkTheme ? styles.darkText : styles.lightText]}>
        Categories of Dishes
      </Text>

      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, darkTheme ? styles.darkCard : styles.lightCard]}
            onPress={() => navigation.navigate(item.route, { category: item.name })}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={[styles.cardText, darkTheme ? styles.darkText : styles.lightText]}>
              {item.name}
            </Text>
            <Text style={[styles.cardDesc, darkTheme ? styles.darkText : styles.lightText]}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
        numColumns={numColumns}
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Welcome;
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },

  darkContainer: { backgroundColor: '#181818' },
  lightContainer: { backgroundColor: '#f2f2f2' },

  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  darkText: { color: '#FF9800' },
  lightText: { color: '#333' },

  cardContainer: { paddingHorizontal: 10, paddingBottom: 20 },

  card: {
    borderRadius: 16,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: cardSize,
    height: cardSize + 30,
    padding: 8,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#232323',
    borderColor: '#FF9800',
    shadowColor: '#FF9800',
  },
  lightCard: {
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    shadowColor: '#999',
  },
  cardImage: {
    width: cardSize - 24,
    height: cardSize - 40,
    resizeMode: 'cover',
    marginBottom: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
  themeToggle: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FF9800',
    borderRadius: 8,
  },
  toggleText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
  },
});
