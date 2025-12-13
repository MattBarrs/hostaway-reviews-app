# Google Reviews API Integration Findings
There is an API for Google Reviews. The integration method depends on whether you are managing reviews for your own business or displaying public reviews for others.

## 1. Official API Options

| API Name | Best For | Key Limitation |
| :--- | :--- | :--- |
| Google Places API (New) | Displaying public reviews for any business (e.g., a directory, travel app). | Limit of 5 reviews per request. You cannot fetch all reviews for a place. |
| Google Business Profile API | Business owners managing their own reviews (e.g., a dashboard for replying to customers). | Requires business verification & OAuth 2.0. |

## 2. Integration via Google Places API 
* Endpoint: https://places.googleapis.com/v1/places/{PLACE_ID}
* Method: GET
* Data Fields: You must specify a "Field Mask" to retrieve reviews.
    * reviews (returns an array of up to 5 review objects)
    * reviews.name (resource name)
    * reviews.relativePublishTimeDescription
    * reviews.rating
    * reviews.text
    * reviews.authorAttribution (name, photo, URI)

Sample Request (HTTP):
GET https://places.googleapis.com/v1/places/ChIJN1t_tDeuEmsRUsoyG83frY4?fields=reviews,rating,userRatingCount&key=YOUR_API_KEY

### Technical Constraints:

* The 5-Review Limit: The API returns only up to 5 reviews. You cannot paginate to get the 6th, 7th, etc.
* Sorting: The "New" Places API allows you to sort reviews by relevance or recency, which helps you at least get the freshest 5 reviews.

## 3.Integration via Google Business Profile API
* Access: You must apply for access and the business location must be verified.
* Capabilities: Retrieves all reviews, allows replying to reviews, and provides historical data.
* Auth: Requires OAuth 2.0 (user login), not just a simple API Key.

## 4. Third-Party "Scraper" APIs (Alternative)
Because of the 5-review limit on the public Places API, many developers use third-party services that scrape Google Maps to provide a complete list of reviews.
* Pros: Can fetch all 100+ reviews; often easier to implement.
* Cons: Not an official Google product; relies on scraping which can be less stable; separate pricing models.


# Summary Recommendation
* For public websites: Use the Google Places API (New) if displaying a "Top 5" or "Latest 5" snapshot is sufficient.
* For deeper data: If you absolutely need all reviews for a place you don't own, you must look into Third-Party Scraper APIs as the official Google API will not support this.

## References
- Business Profile APIs Overview: https://developers.google.com/my-business
- Working with Review Data: https://developers.google.com/my-business/content/review-data
- API Prerequisites (Access Requirements): https://developers.google.com/my-business/content/prereqs