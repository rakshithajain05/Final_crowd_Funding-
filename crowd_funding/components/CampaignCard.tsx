import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CampaignCard({ campaign, onPress }) {
  const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `https://api.a0.dev/assets/image?text=${encodeURIComponent(campaign.title)}&aspect=16:9` }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <MaterialCommunityIcons name="tag" size={16} color="#666" />
          <Text style={styles.category}>{campaign.category}</Text>
        </View>
        <Text style={styles.title}>{campaign.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {campaign.description}
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              ${campaign.currentAmount.toLocaleString()} raised
            </Text>
            <Text style={styles.statsText}>
              {progress.toFixed(0)}%
            </Text>
          </View>
          <Text style={styles.daysLeft}>
            {campaign.daysLeft} days left
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 8,
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
    marginTop: 8,
  },
  statsText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  daysLeft: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
});