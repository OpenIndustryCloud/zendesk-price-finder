$(function() {
  // Initialize ZAF Client	
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '50px' });
 
  var tv_asin,requestData,xml,tv_manu,tv_model;  
 //	Get values from Zendesk ticket fields
  client.get('ticket.customField:custom_field_114099896612').then(
	function(data) {
		tv_asin = data['ticket.customField:custom_field_114099896612'];
		console.log(tv_asin);
		if(tv_asin!="" && tv_asin!=null){
			showInfo(tv_asin,client);
		}else{
			sendData("");
		}
	}
  );
  // Opens list of products in a modal window
  $(document).on('click',".prodList" ,function(){		
	client.invoke('instances.create', {
		location: 'modal',
		url: 'assets/price-finder-modal.html'
	});
  });
  
  client.on('modal.close', function() {
	  console.log("modal closed");
	  var myArray = JSON.parse(sessionStorage.getItem('myArray'));
	  sendMyData(myArray);
  });
  
});
//	Method which calls the item search API
function showInfo(tv_asin,client) {
	
	var tv_asin_encoded = encodeURIComponent(tv_asin.trim());
	var access_key_id = "AWSAccessKeyId=AKIAJPOPMTPE6XJQEZTQ";
	var secret_key = "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";
	var associate_Id= "&AssociateTag=legal12345-21";
	var idType= "&IdType=ASIN";
	var itemId= "&ItemId="+tv_asin_encoded;
	var operation = "&Operation=ItemSearch";
	var responseGroup= "&ResponseGroup=Images%2CItemAttributes%2COffers%2CReviews";
	var service = "&Service=AWSECommerceService";
	var UTCstring = new Date().toISOString();
	var encodedUTCstring1 = UTCstring.replace(":", "%3A");	
	var encodedUTCstring2 = encodedUTCstring1.replace(":", "%3A");	
	var timestamp = "&Timestamp=" + encodedUTCstring2;
	var url = "http://webservices.amazon.co.uk/onca/xml?";
	var version = "&Version=2017-08-01";
	var searchIndex= "&SearchIndex=Electronics";
	var keywords= "&Keywords=" + tv_asin_encoded;

	var sign_string = "GET\nwebservices.amazon.co.uk\n/onca/xml\n"+access_key_id+associate_Id+keywords+operation+responseGroup+searchIndex+service+timestamp+version;
	
	
	var signature2 = CryptoJS.HmacSHA256(sign_string, secret_key);
	var abcd= signature2.toString(CryptoJS.enc.Base64);
	var one  = abcd.replace("+","%2B");
	var two = one.replace("=", "%3D");
	var signature = "&Signature=" + two;
	var endpoint = url+access_key_id+associate_Id+keywords+operation+responseGroup+searchIndex+service+timestamp+version+signature;
	console.log(endpoint);
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
			var parser, xmlDoc, itemImage, itemPageUrl, itemMoreOffersUrl, itemTitle, itemPrice;
			var arrOfItems = [];
			var myArray=[];
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(data.responseText,"text/xml");
			if(xmlDoc!=undefined){
				
				arrOfItems = xmlDoc.getElementsByTagName("Item");
				console.log(arrOfItems);
				
				for(var i=0;i<arrOfItems.length;i++){
					var moreOffersExist = false;
					itemImage = xmlDoc.getElementsByTagName("MediumImage")[i].getElementsByTagName("URL")[0].innerHTML;
					itemPageUrl = xmlDoc.getElementsByTagName("DetailPageURL")[i].innerHTML;
					itemMoreOffersUrl = xmlDoc.getElementsByTagName("MoreOffersUrl")[i].innerHTML;
					itemPrice = xmlDoc.getElementsByTagName("LowestNewPrice")[i].getElementsByTagName("FormattedPrice")[0].innerHTML;
					if(itemMoreOffersUrl.length >1){
						moreOffersExist = true;
					}else{
						moreOffersExist = false;
					}
					itemTitle = xmlDoc.getElementsByTagName("ItemAttributes")[i].getElementsByTagName("Title")[0].innerHTML;
					var data = {
						'itemImage' : itemImage,
						'itemPageUrl' :itemPageUrl,
						'itemMoreOffersUrl': itemMoreOffersUrl,
						'itemTitle' : itemTitle,
						'moreOffersExist':moreOffersExist,
						'itemPrice': itemPrice
					};
					myArray.push(data);
				}
			}
			sessionStorage.setItem('myArray',JSON.stringify(myArray));
			sendData(myArray);
		}
	)
}
 
function sendData(myArray){
	console.log("in send data");
	var requester_data = {
		 'myArray': myArray
	};

	var source = $("#requester-template1").html();
	var template = Handlebars.compile(source);
	var html = template(requester_data);
	$("#content").html(html);
} 




function sendMyData(myArray){
	console.log("in my send data");
	var requester_data = {
		 'myArray': myArray
	};
	//console.log("requester_data = " + requester_data);
	var source = $("#requester-template").html();
	//console.log("source = " + source);
	var template = Handlebars.compile(source);
	//console.log("template = " + template);
	var html = template(requester_data);
	$("#content2").html(html);
	//console.log("in my send data ends");
}

