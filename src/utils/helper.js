export const formatData = (listings) => {
  console.log(listings);
  const formattedListings = listings.map((listing) => {
    return {
      listingId: listing?.basicPropertyData?.id,
      title: listing?.displayName?.text,
      pageName: listing?.basicPropertyData?.pageName,
      amount:
        listing?.priceDisplayInfoIrene?.priceBeforeDiscount?.displayPrice
          ?.amountPerStay?.amount || 0.0,
    };
  });

  return formattedListings;
};
