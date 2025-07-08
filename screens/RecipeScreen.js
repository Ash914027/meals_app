import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
const dishes = [
  {
    name: 'Bruschetta',
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    instructions: 'Toast bread, top with diced tomatoes, garlic, basil, and olive oil.',
    time: '15 mins',
    steps: [
      'Slice the baguette into 1/2-inch pieces.',
      'Brush each slice with olive oil.',
      'Toast in oven at 180°C until golden brown.',
      'Dice tomatoes and mix with minced garlic, basil, olive oil, salt.',
      'Top each toast with the tomato mixture.',
      'Serve immediately while warm.'
    ]
  },
  {
    name: 'Grilled Chicken',
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=400&q=80',
    instructions: 'Marinate chicken, grill until cooked through.',
    time: '40 mins',
    steps: [
      'Clean and pat dry chicken breasts.',
      'In a bowl, mix olive oil, lemon juice, garlic, pepper, and salt.',
      'Marinate chicken for at least 30 minutes.',
      'Preheat grill to medium-high heat.',
      'Grill chicken 6–8 minutes per side until juices run clear.',
      'Let rest for 5 minutes before serving.'
    ]
  },
  {
    name: 'Chocolate Cake',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80',
    instructions: 'Bake chocolate sponge, layer with frosting.',
    time: '1 hr',
    steps: [
      'Preheat oven to 175°C (350°F).',
      'Mix flour, cocoa powder, baking powder and salt.',
      'In another bowl, cream butter and sugar, then beat in eggs.',
      'Add dry ingredients alternately with milk to wet mixture.',
      'Pour batter into greased cake pan.',
      'Bake for 35–40 minutes or until toothpick comes out clean.',
      'Cool, frost with chocolate frosting.'
    ]
  }
];


const RecipeScreen = () => {
  const route = useRoute();
  const { dish } = route.params;
  const steps = dish.steps || [];

  const [currentStep, setCurrentStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    animateStep();
  }, [currentStep]);

  useEffect(() => {
    setCurrentStep(0);
  }, [dish]);

  const animateStep = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!steps || steps.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{dish.name}</Text>
        <View style={styles.instructionCard}>
          {Array.isArray(steps) && steps.length > 0 ? (
            steps.map((step, idx) => (
              <Text key={idx} style={styles.stepText}>
                {idx + 1}. {step}
              </Text>
            ))
          ) : (
            <Text style={styles.stepText}>No steps available for this recipe.</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dish.name}</Text>

      <Animated.View style={[styles.instructionCard, { opacity: fadeAnim }]}>
        <Text style={styles.stepNumber}>Step {currentStep + 1} of {steps.length}</Text>
        <Text style={styles.stepText}>{steps[currentStep]}</Text>
      </Animated.View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={handlePrev}
          disabled={currentStep === 0}
          style={[styles.button, currentStep === 0 && styles.disabledBtn]}
        >
          <Text style={styles.btnText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentStep === steps.length - 1}
          style={[styles.button, currentStep === steps.length - 1 && styles.disabledBtn]}
        >
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#181818',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffa502',
    textAlign: 'center',
    marginBottom: 24,
  },
  instructionCard: {
    backgroundColor: '#232323',
    borderRadius: 14,
    padding: 20,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#ffa502',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffbe76',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 18,
    color: '#f1f2f6',
    lineHeight: 26,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ffa502',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  btnText: {
    textAlign: 'center',
    color: '#181818',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledBtn: {
    backgroundColor: '#555',
  },
});

export default RecipeScreen;
