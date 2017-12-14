# Amazon Price Finder API for Zendesk

Amazon Price Finder API uses Amazon's Item search operation to look for items which are similair to keyword which is taken from zendesk ticket TV Model field. Retrieves the list of products which when clicked on displays further information about the product.

## Amazon Price Finder Sample Input/Output

A GET request is being sent to the API where Authetication is achieved via access key id, associate id and signature and item being searched is sent as Keywords.

	### Request Payload
	
		http://webservices.amazon.co.uk/onca/xml?
		Service=AWSECommerceService&
		AWSAccessKeyId=[AWS Access Key ID]&
		AssociateTag=[Associate ID]&  
		Operation=ItemSearch&
		Keywords=[TV Model Number from the ticket]&
		SearchIndex=Electronics
		&Timestamp=[YYYY-MM-DDThh:mm:ssZ]
		&Signature=[Request Signature]


	### Response Payload

	<Item>
         <ASIN>B073VQB5X3</ASIN>
         <ParentASIN>B0744K69WQ</ParentASIN>
         <DetailPageURL>https://www.amazon.co.uk/Toshiba-65U6763DB-65-Inch-Ultra-Freeview/dp/B073VQB5X3?psc=1&amp;SubscriptionId=AKIAJPOPMTPE6XJQEZTQ&amp;tag=legal12345-21&amp;linkCode=xm2&amp;camp=2025&amp;creative=165953&amp;creativeASIN=B073VQB5X3</DetailPageURL>
         <MediumImage>
            <URL>https://images-eu.ssl-images-amazon.com/images/I/41hYDQKupGL._SL160_.jpg</URL>
            <Height Units="pixels">107</Height>
            <Width Units="pixels">160</Width>
         </MediumImage>
         <ItemAttributes>
            <Binding>Television</Binding>
            <Brand>Toshiba</Brand>
            <Color>Black</Color>
            <EAN>5055862313831</EAN>
            <EANList>
               <EANListElement>5055862313831</EANListElement>
            </EANList>
            <Feature>Ultra HD (4K)</Feature>
            <Feature>4x HDMI, 3x USB, 1x Scart</Feature>
            <Feature>ME/MC (Motion Estimation Motion Compensation)</Feature>
            <Feature>Toshiba Smart Portal</Feature>
            <Feature>Internal WLAN &amp; Bluetooth</Feature>
            <Label>Toshiba</Label>
            <ListPrice>
               <Amount>119999</Amount>
               <CurrencyCode>GBP</CurrencyCode>
               <FormattedPrice>£1,199.99</FormattedPrice>
            </ListPrice>
            <Manufacturer>Toshiba</Manufacturer>
            <Model>65U6763DB</Model>
            <MPN>65U6763DB</MPN>
            <NumberOfItems>1</NumberOfItems>
            <PackageDimensions>
               <Height Units="hundredths-inches">787</Height>
               <Length Units="hundredths-inches">6378</Length>
               <Weight Units="hundredths-pounds">6614</Weight>
               <Width Units="hundredths-inches">3937</Width>
            </PackageDimensions>
            <PackageQuantity>1</PackageQuantity>
            <PartNumber>65U6763DB</PartNumber>
            <ProductGroup>Home Theater</ProductGroup>
            <ProductTypeName>TELEVISION</ProductTypeName>
            <Publisher>Toshiba</Publisher>
            <Size>65-Inch</Size>
            <Studio>Toshiba</Studio>
            <Title>Toshiba 65U6763DB 65-Inch Ultra HD LED Smart TV with Freeview Play - Black (2017 Model)</Title>
         </ItemAttributes>
         <OfferSummary>
            <LowestNewPrice>
               <Amount>79900</Amount>
               <CurrencyCode>GBP</CurrencyCode>
               <FormattedPrice>£799.00</FormattedPrice>
            </LowestNewPrice>
            <TotalNew>2</TotalNew>
            <TotalUsed>0</TotalUsed>
            <TotalCollectible>0</TotalCollectible>
            <TotalRefurbished>0</TotalRefurbished>
         </OfferSummary>
         <Offers>
            <TotalOffers>1</TotalOffers>
            <TotalOfferPages>1</TotalOfferPages>
            <MoreOffersUrl>https://www.amazon.co.uk/gp/offer-listing/B073VQB5X3?SubscriptionId=AKIAJPOPMTPE6XJQEZTQ&amp;tag=legal12345-21&amp;linkCode=xm2&amp;camp=2025&amp;creative=12734&amp;creativeASIN=B073VQB5X3</MoreOffersUrl>
            <Offer>
               <OfferAttributes>
                  <Condition>New</Condition>
               </OfferAttributes>
               <OfferListing>
                  <Price>
                     <Amount>79900</Amount>
                     <CurrencyCode>GBP</CurrencyCode>
                     <FormattedPrice>£799.00</FormattedPrice>
                  </Price>
                  <AmountSaved>
                     <Amount>40099</Amount>
                     <CurrencyCode>GBP</CurrencyCode>
                     <FormattedPrice>£400.99</FormattedPrice>
                  </AmountSaved>
                  <PercentageSaved>33</PercentageSaved>
                  <Availability>Usually dispatched within 24 hours</Availability>
                  <AvailabilityAttributes>
                     <AvailabilityType>now</AvailabilityType>
                     <MinimumHours>0</MinimumHours>
                     <MaximumHours>0</MaximumHours>
                  </AvailabilityAttributes>
                  <IsEligibleForSuperSaverShipping>1</IsEligibleForSuperSaverShipping>
                  <IsEligibleForPrime>0</IsEligibleForPrime>
               </OfferListing>
            </Offer>
         </Offers>
      </Item>