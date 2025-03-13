import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function CampaignDetailsScreen({ route, navigation }) {
  const { campaign } = route.params;
  const [donationAmount, setDonationAmount] = useState('');
  const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

  const handleDonate = () => {
    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    toast.success(`Thank you for donating $${amount}!`);
    setDonationAmount('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: `https://api.a0.dev/assets/image?text=${encodeURIComponent(campaign.title)}&aspect=16:9` }}
          style={styles.image}
        />
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <MaterialCommunityIcons name="tag" size={16} color="#666" />
            <Text style={styles.category}>{campaign.category}</Text>
          </View>

          <Text style={styles.title}>{campaign.title}</Text>
          <Text style={styles.creator}>by {campaign.creator}</Text>

          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${progress}%` }]} />
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statAmount}>${campaign.currentAmount.toLocaleString()}</Text>
                <Text style={styles.statLabel}>raised of ${campaign.goalAmount.toLocaleString()}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statAmount}>{campaign.daysLeft}</Text>
                <Text style={styles.statLabel}>days left</Text>
              </View>
            </View>
          </View>

          <View style={styles.donateSection}>
            <TextInput
              style={styles.donateInput}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={donationAmount}
              onChangeText={setDonationAmount}
            />
            <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
              <Text style={styles.donateButtonText}>Donate Now</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>About this project</Text>
          <Text style={styles.description}>{campaign.description}</Text>

          <Text style={styles.sectionTitle}>Updates</Text>
          {campaign.updates.map((update, index) => (
            <View key={index} style={styles.update}>
              <Text style={styles.updateDate}>{update.date}</Text>
              <Text style={styles.updateContent}>{update.content}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    color: '#666',
    marginLeft: 4,
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  creator: {
    color: '#666',
    fontSize: 16,
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  stat: {
    flex: 1,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    color: '#666',
    marginTop: 4,
  },
  donateSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  donateInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    fontSize: 16,
  },
  donateButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  donateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 24,
  },
  update: {
    marginBottom: 16,
  },
  updateDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  updateContent: {
    fontSize: 16,
    color: '#444',
  },
});