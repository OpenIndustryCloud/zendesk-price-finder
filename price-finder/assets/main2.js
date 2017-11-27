$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '140px' });
 
  var tv_asin,requestData,xml,tv_price,tv_manu,tv_model;
 
  client.get('ticket.customField:custom_field_114099896612').then(
	function(data) {
		tv_asin = data['ticket.customField:custom_field_114099896612'];
		console.log(tv_asin);//B01GA3Z1M2
        showInfo(tv_asin,client);
	}
  );
});

function showInfo(tv_asin,client) {
	
	var tv_price;	
	var access_key_id = "AWSAccessKeyId=YOURAWSACCESSKEYID";
	var secret_key = "YOURSECRETKEY";
	var associate_Id= "&AssociateTag=YOURASSOCIATETAG";
	var idType= "&IdType=ASIN";
	var itemId= "&ItemId="+tv_asin;
	var operation = "&Operation=ItemLookup";
	var responseGroup= "&ResponseGroup=Images%2CItemAttributes%2COffers%2CReviews";
	var service = "&Service=AWSECommerceService";
	var UTCstring = new Date().toISOString();
	var encodedUTCstring1 = UTCstring.replace(":", "%3A");	
	var encodedUTCstring2 = encodedUTCstring1.replace(":", "%3A");	
	var timestamp = "&Timestamp=" + encodedUTCstring2;
	var url = "http://webservices.amazon.co.uk/onca/xml?";
	var version = "&Version=2017-08-01";

	var sign_string = "GET\nwebservices.amazon.co.uk\n/onca/xml\n"+access_key_id+associate_Id+idType+itemId+operation+responseGroup+service+timestamp+version;
	
	var signature2 = CryptoJS.HmacSHA256(sign_string, secret_key);
	var abcd= signature2.toString(CryptoJS.enc.Base64);
	var one  = abcd.replace("+","%2B");
	var two = one.replace("=", "%3D");
	var signature = "&Signature=" + two;
	var endpoint = url+access_key_id+associate_Id+idType+itemId+operation+responseGroup+service+timestamp+version+signature;
	var settings = {
		url: endpoint,
		type: 'GET',
		dataType: 'json',
		contentType: 'application/json'
	};	
	
	client.request(settings).then(
		function(response) {
			console.log("response = " + response);
		},
		function(data){
			var parser, xmlDoc;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(data.responseText,"text/xml");
			if(xmlDoc!=undefined){
				tv_price = xmlDoc.getElementsByTagName("FormattedPrice")[1]!=undefined ? 
					xmlDoc.getElementsByTagName("FormattedPrice")[1].innerHTML : "Error Occured" ;//OfferSummary.FormattedPrice
				tv_manu = xmlDoc.getElementsByTagName("Manufacturer")[0]!=undefined ? 
					xmlDoc.getElementsByTagName("Manufacturer")[0].innerHTML : "Error Occured";
				tv_model = xmlDoc.getElementsByTagName("Model")[0]!=undefined ? 
					xmlDoc.getElementsByTagName("Model")[0].innerHTML : "Error Occured";
			}
			sendData(tv_price,tv_asin, tv_model, tv_manu);			
		}
	)
}
 
function sendData(tv_price, tv_asin, tv_model, tv_manu){
	var tv_link  = "https://www.amazon.co.uk/dp/" + tv_asin;	
	 var requester_data = {
		'tv_price': tv_price,
		'tv_asin' : tv_asin,
		'tv_manu' : tv_manu,
		'tv_model' : tv_model,
		'tv_link' : tv_link		
	};
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
} 