const express = require('express');
const router = express.Router();

// Mock features data
const features = [
  {
    id: 1,
    title: 'Advanced Airflow Control',
    description: 'Precision-engineered aerodynamics ensure smooth, constant airflow and superior containment with reduced energy consumption.',
    icon: 'Wind'
  },
  {
    id: 2,
    title: 'Maximum Safety Compliance',
    description: 'Exceeds ASHRAE 110 containment standards. Built with chemically resistant interiors and high-visibility sashes.',
    icon: 'ShieldCheck'
  },
  {
    id: 3,
    title: 'Energy Efficiency',
    description: 'Eco-conscious variable air volume (VAV) integration effectively reduces lab facility HVAC loads by up to 50%.',
    icon: 'Zap'
  },
  {
    id: 4,
    title: 'Smart Monitoring System',
    description: 'Real-time velocity tracking, automated sash positioning, and intelligent alarm systems integrated with your building\'s BMS.',
    icon: 'Activity'
  }
];

// GET /api/features
router.get('/features', (req, res) => {
  res.json({ success: true, count: features.length, data: features });
});

// POST /api/contact
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please provide name, email, and message' });
  }

  // Simulate contact form saving
  console.log('Received contact submission:', { name, email, message });
  
  res.status(201).json({ 
    success: true, 
    message: 'Thank you for your interest. Our sales team will evaluate your req and contact you shortly.' 
  });
});

module.exports = router;
