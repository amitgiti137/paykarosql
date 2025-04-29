const Offer = require('../models/Offer');

exports.createOffer = async (req, res) => {
  try {
    const offerData = {
      ...req.body,
      image: req.file ? `uploads/stores/${req.file.filename}` : undefined,
    };

    const offer = await Offer.create(offerData);
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const { storeId } = req.query;
    const query = storeId ? { store: storeId } : {};

    const offers = await Offer.find(query).populate('store').populate('category');;

    const formattedOffers = offers.map(offer => {
      const store = offer.store || {};
      const categoryId = offer.category?._id?.toString();

      // Find matching category cashback
      const categoryCashback = store.categoryCashbacks?.find(cb =>
        cb.category?.toString() === categoryId
      );

      let cashbackText = "No Cashback";

      if (offer.cashbackPercent) {
        cashbackText = `Flat ${offer.cashbackPercent}% Cashback`;
      } else if (categoryCashback) {
        cashbackText =
          categoryCashback.cashback.type === 'percent'
            ? `Up to ${categoryCashback.cashback.value}% Cashback`
            : `Flat ₹${categoryCashback.cashback.value} Cashback`;
      } else if (store.uptoCashback?.value) {
        cashbackText =
          store.uptoCashback.type === 'percent'
            ? `Up to ${store.uptoCashback.value}% Cashback`
            : `Flat ₹${store.uptoCashback.value} Cashback`;
      }

      const pageLink = store.store_name
        ? `${store.store_name.toLowerCase().replace(/\s+/g, "-")}-coupon`
        : "";

      return {
        _id: offer._id,
        title: offer.title,
        description: offer.description,
        trackingUrl: offer.trackingUrl,
        image: offer.image,
        cashbackText,
        store: {
          _id: store._id,
          name: store.name,
          logo: store.logo,
          pageLink
        }
      };
    });

    res.status(200).json(formattedOffers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
};
