import express from 'express';
import Campaign from '../models/Campaign.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('creator', 'name');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a campaign
router.post('/', protect, async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      creator: req.user._id,
    });
    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('creator', 'name');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Donate to campaign
router.post('/:id/donate', protect, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    const { amount } = req.body;
    campaign.currentAmount += amount;
    await campaign.save();
    
    // Add donation to user's history
    req.user.donations.push({
      campaign: campaign._id,
      amount,
      date: new Date(),
    });
    await req.user.save();
    
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;