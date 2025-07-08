import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const dishes = [
  // Appetizers
  {
    name: 'Bruschetta',
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Toast bread, top with diced tomatoes, garlic, basil, and olive oil.',
    time: '15 mins',
  },
  {
    name: 'Stuffed Mushrooms',
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    instructions: 'Fill mushrooms with cheese and herbs, bake until golden.',
    time: '25 mins',
  },
  // Main Courses
  {
    name: 'Grilled Chicken',
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=400&q=80',
    instructions: 'Marinate chicken, grill until cooked through.',
    time: '40 mins',
  },
  {
    name: 'Beef Stroganoff',
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Cook beef with mushrooms and onions, serve with creamy sauce over noodles.',
    time: '50 mins',
  },
  // Desserts
  {
    name: 'Chocolate Cake',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80',
    instructions: 'Bake chocolate sponge, layer with frosting.',
    time: '1 hr',
  },
  {
    name: 'Fruit Tart',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80',
    instructions: 'Fill tart shell with custard, top with fresh fruits.',
    time: '45 mins',
  },
  // Drinks
  {
    name: 'Lemonade',
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    instructions: 'Mix lemon juice, sugar, and water. Serve chilled.',
    time: '5 mins',
  },
  {
    name: 'Mojito',
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    instructions: 'Muddle mint, lime, sugar, add soda and ice.',
    time: '7 mins',
  },
  // Salads
  {
    name: 'Caesar Salad',
    category: 'Salads',
    image: 'https://source.unsplash.com/featured/?salad',
    instructions: 'Chop lettuce, mix with croutons, parmesan & Caesar dressing.',
    time: '10 mins',
  },
  {
    name: 'Greek Salad',
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    instructions: 'Combine tomatoes, cucumber, olives, feta, and olive oil.',
    time: '12 mins',
  },
  // Soups
  {
    name: 'Tomato Soup',
    category: 'Soups',
    image: 'https://source.unsplash.com/featured/?tomato-soup',
    instructions: 'Boil tomatoes, blend, and simmer with herbs.',
    time: '25 mins',
  },
  {
    name: 'Chicken Noodle Soup',
    category: 'Soups',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    instructions: 'Simmer chicken, add noodles and vegetables.',
    time: '35 mins',
  },
  // Snacks
  {
    name: 'Nachos',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    instructions: 'Layer chips with cheese and toppings, bake until melted.',
    time: '10 mins',
  },
  {
    name: 'Popcorn',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    instructions: 'Pop corn kernels, season as desired.',
    time: '5 mins',
  },
  // Seafood
  {
    name: 'Grilled Salmon',
    category: 'Seafood',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Season salmon, grill until flaky.',
    time: '20 mins',
  },
  {
    name: 'Shrimp Scampi',
    category: 'Seafood',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Sauté shrimp with garlic, butter, and lemon.',
    time: '15 mins',
  },
  // Pasta
  {
    name: 'Spaghetti Carbonara',
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=400&q=80',
    instructions: 'Cook pasta, toss with eggs, cheese, and pancetta.',
    time: '25 mins',
  },
  {
    name: 'Penne Arrabbiata',
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=400&q=80',
    instructions: 'Cook penne, toss with spicy tomato sauce.',
    time: '20 mins',
  },
  // Pizza
  {
    name: 'Margherita Pizza',
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1548365328-9c6db5c1bfc5?auto=format&fit=crop&w=400&q=80',
    instructions: 'Top dough with tomato, mozzarella, and basil. Bake.',
    time: '30 mins',
  },
  {
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1548365328-9c6db5c1bfc5?auto=format&fit=crop&w=400&q=80',
    instructions: 'Add pepperoni and cheese to dough, bake until golden.',
    time: '30 mins',
  },
  // Grill
  {
    name: 'BBQ Ribs',
    category: 'Grill',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Slow-cook ribs, finish on grill with BBQ sauce.',
    time: '2 hrs',
  },
  {
    name: 'Grilled Vegetables',
    category: 'Grill',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Slice veggies, grill until tender.',
    time: '20 mins',
  },
  // Vegan
  {
    name: 'Vegan Buddha Bowl',
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    instructions: 'Combine grains, veggies, and plant protein in a bowl.',
    time: '25 mins',
  },
  {
    name: 'Vegan Chili',
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    instructions: 'Simmer beans, tomatoes, and spices.',
    time: '40 mins',
  },
  // Breakfast
  {
    name: 'Pancakes',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Mix batter, cook on griddle, serve with syrup.',
    time: '20 mins',
  },
  {
    name: 'Omelette',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Beat eggs, cook with fillings of choice.',
    time: '10 mins',
  },
  // Asian
  {
    name: 'Chicken Fried Rice',
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    instructions: 'Stir-fry rice with chicken, veggies, and soy sauce.',
    time: '25 mins',
  },
  {
    name: 'Vegetable Stir Fry',
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    instructions: 'Sauté mixed vegetables with Asian sauces.',
    time: '15 mins',
  },
  // Mexican
  {
    name: 'Tacos',
    category: 'Mexican',
    image: 'https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=400&q=80',
    instructions: 'Fill tortillas with meat, veggies, and salsa.',
    time: '20 mins',
  },
  {
    name: 'Guacamole',
    category: 'Mexican',
    image: 'https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=400&q=80',
    instructions: 'Mash avocados, mix with onion, tomato, lime, and cilantro.',
    time: '10 mins',
  },
  // BBQ
  {
    name: 'Pulled Pork',
    category: 'BBQ',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    instructions: 'Slow-cook pork, shred and mix with BBQ sauce.',
    time: '6 hrs',
  },
  {
    name: 'BBQ Chicken Wings',
    category: 'BBQ',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    instructions: 'Grill wings, toss with BBQ sauce.',
    time: '35 mins',
  },
];

function Dishlist({ route }) {
  const { category } = route.params;
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [time, setTime] = useState('');

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.category === category &&
      dish.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.dishCard}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.dishName}>{item.name}</Text>
      <Text style={styles.timeText}>⏱ {item.time}</Text>
      <Text style={styles.instructions}>{item.instructions}</Text>

      <TouchableOpacity style={styles.favoriteBtn}>
        <AntDesign name="hearto" size={20} color="#ff4757" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cookBtn}
        onPress={() => navigation.navigate('RecipeScreen', { dish: item })}
      >
        <Text style={styles.cookBtnText} onPress={() => navigation.navigate('RecipeScreen', { dish: item })}>
        Start Cooking</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.time}>🕒 {time}</Text>
      <Text style={styles.title}>Dishes in: {category}</Text>
      <TextInput
        style={styles.search}
        placeholder="Search dish..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredDishes}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No dishes found.</Text>}
      />
    </View>
  );
}

export default Dishlist;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#181818', paddingTop: 20 },
  time: { textAlign: 'center', fontSize: 14, color: '#ffa502', marginBottom: 5 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 10, color: '#ffa502' },
  search: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#232323',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ffa502',
    color: '#fff',
  },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  dishCard: {
    backgroundColor: '#232323',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#ffa502',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    paddingBottom: 10,
    position: 'relative',
  },
  image: { width: '100%', height: 180, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  dishName: { fontSize: 18, fontWeight: '600', color: '#ffa502', marginTop: 10 },
  timeText: { fontSize: 13, color: '#ffbe76', marginTop: 4 },
  instructions: { fontSize: 13, color: '#dfe4ea', marginTop: 4, paddingHorizontal: 10, textAlign: 'center' },
  favoriteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#181818cc',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  cookBtn: {
    marginTop: 10,
    backgroundColor: '#ffa502',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cookBtnText: { color: '#181818', fontWeight: '600', fontSize: 14 },
  empty: { textAlign: 'center', fontSize: 16, color: '#ffa502', marginTop: 50 },
});