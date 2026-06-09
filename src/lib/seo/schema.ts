import { accommodations, activities, articles, faqItems, touristCenter } from "@/lib/demo-data";

export function buildTourismSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#business`,
        name: touristCenter.name,
        description: touristCenter.tagline.nb,
        url: siteUrl,
        telephone: touristCenter.phone,
        email: touristCenter.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: touristCenter.location,
          addressCountry: "NO",
        },
      },
      ...activities.map((activity) => ({
        "@type": "TouristTrip",
        name: activity.title.nb,
        description: activity.description.nb,
        image: activity.imageUrl,
        offers: {
          "@type": "Offer",
          price: activity.priceFrom,
          priceCurrency: "NOK",
          availability: "https://schema.org/InStock",
        },
      })),
      ...accommodations.map((accommodation) => ({
        "@type": "LodgingBusiness",
        name: accommodation.title.nb,
        description: accommodation.description.nb,
        image: accommodation.imageUrl,
        amenityFeature: accommodation.amenities.map((amenity) => ({
          "@type": "LocationFeatureSpecification",
          name: amenity,
        })),
      })),
      ...articles.map((article) => ({
        "@type": "Article",
        headline: article.title.nb,
        description: article.excerpt.nb,
        image: article.imageUrl,
        url: `${siteUrl}/artikler/${article.slug}`,
      })),
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
          name: item.question.nb,
            acceptedAnswer: {
              "@type": "Answer",
            text: item.answer.nb,
            },
        })),
      },
    ],
  };
}
