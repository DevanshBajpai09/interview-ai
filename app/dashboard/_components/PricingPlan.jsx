const PricingPlan = [
  {
    link: 'https://buy.stripe.com/test_9AQ4jI8fffk75igcMN',
    price: 7.99,
    priceId: 'price_1PUNYmSISOkj08jR30L0UpyY',
    duration: 'Monthly',
    savings: null,
    popular: false,
    description: 'Perfect for getting started with AI mock interviews'
  },
  {
    link: 'https://buy.stripe.com/test_eVabMa8fffk78us000',
    price: 49.00,
    priceId: 'price_1PUNZQSISOkj08jRFQkKuzXi',
    duration: 'Yearly',
    savings: 46, // (7.99 * 12 - 49) = 46.88 ≈ 46
    popular: true,
    description: 'Best value for serious interview preparation'
  }
];

export default PricingPlan;