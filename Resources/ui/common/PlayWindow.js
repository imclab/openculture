var globals = require('/ui/common/globals');
var css = require('/ui/common/css');

function fn(identifier,cnt,typ) {
	
	
	require("/helpers/flurry").log("display_item",{identifier : identifier });
	
	function isfavourite (ident) {
	    var items = require("/helpers/LocalStorage").getObject("personal");
	    if (!items || items == null) return false;
	    for (var i=0; i <items.length; i++) {
	        if (ident == items[i].identifier) return true;
	    }
	    return false;
	}

	var self = Titanium.UI.createWindow({
    	navBarHidden: true,
    	backgroundColor:css.DARKBACKGROUND
	});
	var table;
	var lbl122 = "";
	var searchtitle = "";
	var wikipediasearch = "";
	var googlesearch = ""
	var Currenttitle = "";
	var Currenttitle1 = "";
	var Currenttitle2 = "";
	var ExtraButtons = [];
	var ExtraMeta = [];
	var docTitle = "";
	var twitter_image = "";
	var twitter_link = "";
	var twitter_text = "";
	var facebook_appid = "";

	var button2 = "";
	var button2_link = "";
	var button3 = "";
	var button3_link = "";


	
	var b1 = Titanium.UI.createButton({
		image : "/images/glyphicons_212_down_arrow.png"
	})
	var b99 = Titanium.UI.createButtonBar({
//	    labels:['Search', 'Personal Museum','clear','me','pin'],
	    labels:['Home','Search results', 'Your Favourites', 'Help'],
	    backgroundColor:css.DARKBACKGROUND,
	    top:50,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height:30,
	    width:400
	});
	
	var bbselect = function(e) {
		var tab = e.index;
		if (tab == 0) {
			winclose();
			setTimeout(function() {
				Titanium.App.fireEvent("display-search-force",{});
			},500);	
		}
		if (tab == 1) {
			winclose();			
		}
		if (tab == 2) {
			winclose();	
			setTimeout(function() {
				Titanium.App.fireEvent("redisplay-personal",{});			
			},100);	
		}
		if (tab == 3) {
			//require("/helpers/LocalStorage").setObject("personal",[]);
			//Titanium.App.fireEvent("redisplay-personal",{});	
			//winclose();	
			Titanium.App.fireEvent("display1-main-help",{});
			//Titanium.App.fireEvent("display-search-force",{});
		}
		// if (tab == 3) {
			// mainview2.asImage();
		// }
	}
	b99.addEventListener("click",bbselect);
	
	var b99emp = Titanium.UI.createButton({
		image : '',
		width:15
	})
	var b9emp = Titanium.UI.createButton({
		image : '',
		width:145
	})
	var blogo = Titanium.UI.createButton({
		image : "/images/small-logo.png"
	})
	
	var winclose = function(e) {
		self.close();
	}
	b1.addEventListener("click", winclose);
	
	var bbb1 = Ti.UI.createButton({
		image:'images/glyphicons_027_searcht.png'
	});
	
	var topbar = Titanium.UI.iOS.createToolbar({
		top:0,right:0,left:0,height:40,
		items : [b1,b99,b99emp,blogo,b9emp,bbb1],
		barColor : css.DARKBACKGROUND,
		borderTop:false,
	    borderBottom:true
	})	
	self.add(topbar);
	
	var search = Titanium.UI.createTextField({
		right : 10,
		top : 5,
		height : 30,
		autocorrect : false,
		autocapitalization : false,
		clearButtonMode : 1,
		width : 200,
		borderRadius : 5,
		backgroundColor : css.VERYLIGHTCOLOUR,
		borderColor : css.LIGHTCOLOUR,
		borderWidth : 1,
		color : css.LIGHTCOLOUR,
		value : require("/helpers/LocalStorage").getString("search-string"),
		font : {
			fontFamily : "SinhalaSangamMN",
			fontSize : 18
		}
	})
	
	topbar.add(search);

	search.addEventListener("click", function() {
		search.value='';
	});
	search.addEventListener("return", function() {
		winclose();
		require("/helpers/LocalStorage").setString("search-string",search.getValue());
        require("/helpers/LocalStorage").setString("yr-string","");
        require("/helpers/LocalStorage").setString("place-string","");
        require("/helpers/LocalStorage").setString("type-string","");
        Titanium.App.fireEvent("app:search2",{});
	});

	var b2 = Titanium.UI.createButton({
		image : "/images/glyphicons_012_heart.png",
		left:20
	})
	var isfav = function(identifier) {
		var personal = require("/helpers/LocalStorage").getObject("personal");
		if (!personal || personal == null) return false;
		for (var i=0; i < personal.length; i++) {
			if (personal[i].identifier == identifier) {
				return true;
			}
			if (personal[i].id == identifier) {
				return true;
			}
		}
		return false;
	}
	var removefav = function(identifier) {
		var personal = require("/helpers/LocalStorage").getObject("personal");
		if (!personal || personal == null) return;
		for (var i=personal.length; i > 0; i--) {
			var j= (i-1);
			if (personal[j].identifier == identifier || personal[j].id == identifier) {
				personal.splice(j,1);
			}
		}
		require("/helpers/LocalStorage").setObject("personal",personal);
	}

	var like = function() {
		if (isfav(identifier) == false) {
			var newitem = require("/helpers/LocalStorage").getObject("search")[cnt];
			var personal = require("/helpers/LocalStorage").getObject("personal");
			lbl122.image = '/images/buttons/menu-favourite-active.png';
			if (!personal || personal == null) personal = [];
			personal.push(newitem);
			require("/helpers/LocalStorage").setObject("personal",personal);
			require("/helpers/flurry").log("like",{identifier : identifier });
			
		} else {
			lbl122.image = '/images/buttons/menu-favourite.png';
			removefav(identifier);		
			require("/helpers/flurry").log("unlike",{identifier : identifier });
		}
	}
	b2.addEventListener("click",like);

	var currentlink = "";
	var addcomment = function(e) {
		require("/helpers/flurry").log("add_comment_openwindow",{identifier : identifier });

		var v = Ti.UI.createWindow({
		});
		v.add(Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			backgroundColor : css.DARKBACKGROUND,
			opacity : 0.5
		}));
		var v1 = Ti.UI.createView({
			width : '80%',
			height : '80%'
		});
		var v2 = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			backgroundColor : css.VERYLIGHTCOLOUR
		});
		v2.add(Ti.UI.createLabel({
			text : 'Post a comment',
			top:15,left:66,height:50,width:300,
			font : {
				fontSize : 22,
				fontFamily : "arial"
			},
			color : "#222"
		}));
		

		
		var srch = Ti.UI.createTextArea({
			top:60,left:66,height:150,right:66,
			hintText : "What do you want to say?",
			borderRadius : 10,
			font : {
				fontSize : 22,
				fontFamily : "arial"
			},
			backgroundColor : css.VERYLIGHTCOLOUR,color:css.LIGHTCOLOUR,borderColor:'#ccc',borderWidth:1
		});
		v2.add(srch);
		var addlink_btn = Ti.UI.createLabel({
			top:220,right:66,height:50,width:150,
			font : {
				fontSize : 22,
				fontFamily : "arial"
			},
			color : css.VERYLIGHTCOLOUR,
			borderRadius : 10,
			textAlign : 'center',
			text : 'Send',
			backgroundColor : '#5184CC'
		});
		v2.add(addlink_btn);
		var closecomentwindow = function() {
			v.close();
		}
		var addlinkfn = function() {
			var _data = {
				action : "json-addlink",
				a : identifier,
				b : "",
				type : "comment",
				comment : srch.value
			};
//alert("f");			
			ajax.getdata({
				url : require("/etc/config").api,
				data : _data,
				fn : function(e1) {
					Titanium.API.info(e1);
					require("/ui/common/growl/fn").growl("post added",closecomentwindow);
					table.fireEvent("updateLinks",{links:e1.links});
					showfront();
				},
				err : function(e1) {
					Titanium.API.info(e1);
					alert("There was an error adding the link");
				}
			});
			require("/helpers/flurry").log("add_comment_added",{identifier : identifier });
			
//alert("g");			
		};
		addlink_btn.addEventListener('click',addlinkfn);

		var spacer0 = Ti.UI.createButton({
			width:'750'
		});
		var bgc = Ti.UI.createButton({
			image:'/images/close1.png'
		});
		bgc.addEventListener('click',function(e){
			v.close();
		})
		
		
		var bar = Titanium.UI.iOS.createToolbar({
			top:0,right:0,left:0,height:40,
			items : [spacer0,bgc],
			barColor : css.DARKBACKGROUND,
			borderTop:true,
		    borderBottom:false
		});
		var vb = Ti.UI.createView({
			top:42,
			left:0,
			width : Ti.UI.FILL,
			height : Ti.UI.FILL
			// borderColor : "#ff0000",
			// borderWidth : 2
		});
		
		v.add(v1);
		v1.add(bar);
		v1.add(vb);
		vb.add(v2);
		v.open();
		srch.focus();


	};
//alert("h");	
	var currentlink = "";
	var POPWEBSMALL = function(URI) {
		
		var URL = URI;
		
		var vminus1 = Ti.UI.createWindow({
			width : '100%',
			height : '1000%',
			backgroundColor: css.DARKBACKGROUND,
			opacity: 0.7
		});
		
		var v = Ti.UI.createWindow({
			width : '90%',
			height : '90%'
		});
		var v = Ti.UI.createWindow({
		});
		var v0 = Ti.UI.createView({
			width : '90%',
			height : '90%'
		});
		
		var v1 = Ti.UI.createView({
		});
		var search = Ti.UI.createTextField({
			width : 450,
			height: 30,
			autocapitalization : 0,
			autocorrect : false,
			backgroundColor : css.VERYLIGHTCOLOUR
		});
		var bgo = Ti.UI.createButton({
			image : 'images/glyphicons_212_right_go_arrow.png'
		});
		var bgo_fn = function(e){
			if (search.value && search.value != "") {
				/*if (search.value.toLowerCase().indexOf("www") != 0){
					search.value = "http://www.google.com/search?as_q="+search.value
				}*/
				if (search.value.toLowerCase().indexOf("http") != 0) {
					search.value = "http://"+search.value
				}
				showfront();
				web.setUrl(search.value);
			}
		};
		bgo.addEventListener('click',bgo_fn);
		search.addEventListener('enter',bgo_fn);
		search.addEventListener('return',bgo_fn);

		var bgf = Ti.UI.createButton({
			image : 'images/glyphicons_212_right_arrow.png'
		});
		bgf.addEventListener('click',function(e){
			showfront();
			web.goForward();
		})

		var bgb = Ti.UI.createButton({
			image : 'images/glyphicons_212_left_arrow.png'
		});
		bgb.addEventListener('click',function(e){
			showfront();
			web.goBack();
		})
		var bgc = Ti.UI.createButton({
			image:'/images/close1.png'
		});
		bgc.addEventListener('click',function(e){
			v.close();
			vminus1.close();
		})
		
		var bgemp11 = Ti.UI.createButton({
			image : '',
			width:800
		});
		
		var bar = Titanium.UI.iOS.createToolbar({
			top:0,right:0,left:0,height:Ti.UI.SIZE,
			items : [bgb,bgf,bgemp11,bgc],
			barColor : css.DARKBACKGROUND,
			borderTop:true,
		    borderBottom:false
		    
		});
		var vb = Ti.UI.createView({
			top:42,
			left:0,
			width : Ti.UI.FILL,
			height : Ti.UI.FILL
		});
		var web = Ti.UI.createWebView({
			top:0,
			left:0,
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			url : URL
		});
		
		
		v1.add(bar);
		v1.add(vb);
		vb.add(web);
		v0.add(v1);
		v.add(v0);
		vminus1.open();
		v.open();
		
		
	}
	
	var addlink = function(e) {

		require("/helpers/flurry").log("add_link_openwindow",{identifier : identifier });


		if (!searchtitle || searchtitle == null) searchtitle = "";
		var searchtitlea = searchtitle.replace(" ","_");
		var searchtitleb = searchtitlea.replace(" ","_");
		var searchtitlec = searchtitleb.replace(" ","_");
		var searchtitled = searchtitlec.replace(" ","_");
		var searchtitlee = searchtitled.replace(" ","_");
		var searchtitlef = searchtitlee.replace(" ","_");
		var searchtitleg = searchtitlef.replace(" ","_");
		var searchtitleh = searchtitleg.replace(" ","_");
		var searchtitlei = searchtitleh.replace(" ","_");
		var searchtitlej = searchtitlei.replace(" ","_");
		var searchtitlek = searchtitlej.replace(" ","_");
		var searchtitlel = searchtitlek.replace(" ","_");
		var searchtitlex = searchtitlel.replace(" ","_");
		var searchtitlez = searchtitlex.replace(" ","_");
		var fullthingy = "http://en.wikipedia.org/wiki/"+searchtitlez;
		
		
		var fullthingy = "http://nl.wikipedia.org/wiki/Special:Search?search="+Ti.Network.encodeURIComponent(searchtitle)+"&go=Go";
		var fullthingy = wikipediasearch;
		var fullthingy = googlesearch;
		
		//alert(searchtitlez);
//alert("i");		
		var URL = e.url;
		if (!URL || URL == "") URL = fullthingy;
		
		var vminus1 = Ti.UI.createWindow({
			width : '100%',
			height : '100%',
			backgroundColor: css.DARKBACKGROUND,
			opacity: 0.7
		});
		
		var v = Ti.UI.createWindow({
			width : '90%',
			height : '90%'
		});
		var v = Ti.UI.createWindow({
		});
		var v0 = Ti.UI.createView({
			width : '90%',
			height : '90%'
		});
		
		var v1 = Ti.UI.createView({
		});
		var search = Ti.UI.createTextField({
			width : 450,
			height: 30,
			autocapitalization : 0,
			autocorrect : false,
			backgroundColor : css.VERYLIGHTCOLOUR
		});
		var bgo = Ti.UI.createButton({
			image : 'images/glyphicons_212_right_go_arrow.png'
		});
		var bgo_fn = function(e){
			if (search.value && search.value != "") {
				/*if (search.value.toLowerCase().indexOf("www") != 0){
					search.value = "http://www.google.com/search?as_q="+search.value
				}*/
				if (search.value.toLowerCase().indexOf("http") != 0) {
					search.value = "http://"+search.value
				}
				showfront();
				web.setUrl(search.value);
			}
		};
		bgo.addEventListener('click',bgo_fn);
		search.addEventListener('enter',bgo_fn);
		search.addEventListener('return',bgo_fn);

		var bgf = Ti.UI.createButton({
			image : 'images/glyphicons_212_right_arrow.png'
		});
		bgf.addEventListener('click',function(e){
			showfront();
			web.goForward();
		})

		var bgb = Ti.UI.createButton({
			image : 'images/glyphicons_212_left_arrow.png'
		});
		bgb.addEventListener('click',function(e){
			showfront();
			web.goBack();
		})
		/*var bgl = Ti.UI.createImageView({
			image : 'images/glyphicons_050_link.png',
			top:15,left:40
		});*/
		var bgemp = Ti.UI.createButton({
			image : '',
			width:2
		});
		
		
		
		
		
		var bgyu = Ti.UI.createButton({
			image : button2 	// 'images/glyphicons_382_youtube1.png'
		});
		
		var bgfli = Ti.UI.createButton({
			image : button3		//	'images/glyphicons_395_flickr.png'
		});
		
		var bgpin = Ti.UI.createButton({
			image : 'images/glyphicons_360_pinterest1.png'
		});
		
		var bggoo = Ti.UI.createButton({
			image : 'images/glyphicons_362_google1.png'
		});
		
		/* the search part */
		var lnk = (search.value);
		var v2 = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			backgroundColor : css.VERYLIGHTCOLOUR
		});
		v2.add(Ti.UI.createLabel({
			text : "Final step, please describe the connection you're making",
			top:140,left:66,height:50,width:650,
			font : {
				fontSize : 22,
				fontFamily : "arial"
			},
			color : "#222"
		}));
		
		var srch = Ti.UI.createTextField({
			top:190,left:66,height:50,width:605,
			font : {
				fontSize : 24,
				fontFamily : "arial"
			},
			paddingLeft : 20,
			backgroundColor : css.VERYLIGHTCOLOUR,
			color:css.LIGHTCOLOUR,
			borderColor : "#ccc",
			borderWidth : 1
		});
		v2.add(srch);
		v2.add(Ti.UI.createLabel({
			text : 'Almost there, please select a category for your connection',
			top:15,left:66,height:50,width:600,
			font : {
				fontSize : 22,
				fontFamily : "arial"
			},
			color : "#222"
		}));
		
		var vals = ['What','Where','When','Who','General link'];
		var valarray = [];
		var TYP = "";		
		var selectlabel2 = function(xval) {
			TYP = xval;
			for (var i=0; i < valarray.length; i++) {
				if (valarray[i].xval == xval) {
					valarray[i].color = css.VERYLIGHTCOLOUR;
					valarray[i].backgroundColor = "#5184CC";
					
				} else {
					valarray[i].color = css.VERYLIGHTCOLOUR;
					valarray[i].backgroundColor = "#eee";
				}
			}
		}
//alert("j");		
		bggoo.addEventListener('click',function(e){
			//alert("a");
			search.value = googlesearch;
			//"http://www.google.nl";
			web.setUrl(search.value);
		});
		bgyu.addEventListener('click',function(e){
			//alert("a");
			search.value = button2_link;	//"http://www.youtube.com/?nomobile=1";
			web.setUrl(search.value);
		});
		bgfli.addEventListener('click',function(e){
			//alert("a");
			search.value = button3_link;	//"http://www.flickr.com";
			web.setUrl(search.value);
		});
		bgpin.addEventListener('click',function(e){
			//alert("a");
			search.value = "http://www.pinterest.com";
			web.setUrl(search.value);
		});
		
		var selectlabel = function(e) {
			selectlabel2(e.source.xval);
			
		}
		for (var i=0; i < vals.length; i++) {
			var lbl = Ti.UI.createLabel({
				top:0,left:(i*150+13),height:50, width : 150,
				textAlign:'center',
				color : "#222",
//				borderRadius : 10,
				borderColor : "#ccc",
				backgroundColor : "#eee",
				borderWidth : 1,
				font : {
					fontSize : 24,
					fontFamily : "arial"
				},
				text : " "+vals[i]+" ",
				xi : i,
				xval : vals[i]
			});
			lbl.addEventListener('click',selectlabel);
			valarray.push(lbl);
		}
		
		var sel = Ti.UI.createView({
			top:57,left:55,height:100,width:810
		});
		
		for (var i=0; i < valarray.length; i++) {
			sel.add(valarray[i]);
		}
		v2.add(sel);
		var addlink_btn = Ti.UI.createLabel({
			top:190,right:100,height:50,width:147,
			font : {
				fontSize : 26,
				fontFamily : "arial"
			},
			borderRadius : 0,
			color : css.VERYLIGHTCOLOUR,
			text : '  Add Link ',
			backgroundColor : '#5184CC'
		});
		v2.add(addlink_btn);
		var closelinkwindow = function() {
			v.close();
			vminus1.close();
		}
		var addlinkfn = function() {
			if (TYP == null || TYP == "" || search.value == "") {
				alert("You need to write a description and also indicate what it describes (WHAT,WHERE,WHEN,WHO,GENERAL) before adding the link");
				return;
			}
			var _data = {
				action : "json-addlink",
				a : identifier,
				b : search.value,
				type : TYP,
				comment : srch.value
			};
			
			ajax.getdata({
				url : require("/etc/config").api,
				data : _data,
				fn : function(e1) {
					Titanium.API.info(e1);
					table.fireEvent("updateLinks",{links:e1.links});
					require("/ui/common/growl/fn").growl("link added",closelinkwindow);
					showfront();
				},
				err : function(e1) {
					Titanium.API.info(e1);
					alert("There was an error adding the link");
				}
			});
			require("/helpers/flurry").log("add_link_added",{identifier : identifier });
			
			
		};
		addlink_btn.addEventListener('click',addlinkfn);
		
		var current = "v1";
		var showfront = function() {
			if (current == "v2") {
				vb.animate({view:web,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
				current = "v1";
			}
		}

		var bgc = Ti.UI.createButton({
			image:'/images/close1.png'
		});
		bgc.addEventListener('click',function(e){
			v.close();
			vminus1.close();
		})
		
		var bgemp11 = Ti.UI.createButton({
			image : '',
			width:5
		});
		var bgemp1 = Ti.UI.createButton({
			image : '',
			width:12
		});
		var bgemp2 = Ti.UI.createButton({
			image : '',
			width:7
		});
		var bgemp3 = Ti.UI.createButton({
			image : '',
			width:7
		});
		var bgemp4 = Ti.UI.createButton({
			image : '',
			width:30
		});

		var spacer = Ti.UI.createButton({
			image : '',
			width:20
		});
		
		var bar = Titanium.UI.iOS.createToolbar({
			top:0,right:0,left:0,height:Ti.UI.SIZE,
//			items : [bgb,bgf,search,bgo,bgemp11,bgyu,bgemp1,bgfli,bgemp2,bggoo,bgemp3,bgpin,bgemp4,bgc],
			items : [bgb,bgf,search,bgo,bgemp11,bggoo,bgemp1,bgyu,bgemp2,bgfli,bgemp3,bgpin,bgemp4,bgc],
			barColor : css.DARKBACKGROUND,
			borderTop:true,
		    borderBottom:false
		    
		});
		var vb = Ti.UI.createView({
			top:42,
			left:0,
			width : Ti.UI.FILL,
			height : Ti.UI.FILL
		});
		var web = Ti.UI.createWebView({
			top:0,
			left:0,
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			url : URL
		});
		
		var webover = Ti.UI.createImageView({
			right:55,top:1, height : 38, width:100,image:'/images/button_connect_large.png'
		});
		
		webover.addEventListener('click',function(e){
			if (current == "v1") {
				vb.animate({view:v2,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
				docTitle = web.evalJS('document.title');
				srch.value = docTitle;
				current = "v2";
			} else {
				vb.animate({view:web,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
				current = "v1";
			}
		});
		
		
		web.addEventListener('load',function(e){
			search.value = e.url;
		})
		
		v1.add(bar);
		v1.add(vb);
		vb.add(web);
		v0.add(v1);
		v0.add(webover);
		v.add(v0);
		vminus1.open();
		v.open();
		
		
	}
	var b3 = Titanium.UI.createButton({
		image : "/images/glyphicons_050_link.png"
	})
	b3.addEventListener("click",addlink);
	var b3a = Titanium.UI.createButton({
		image : "/images/glyphicons_151_edit.png"
	})
	b3a.addEventListener("click",addcomment);

	var b31 = Titanium.UI.createButton({
		image : "/images/glyphicons_377_linked_in.png"
	})
	
	var botbar = Titanium.UI.iOS.createToolbar({
		bottom:0,right:0,height:40,
		items : [],
		barColor : css.DARKBACKGROUND,
		borderTop:true,
	    borderBottom:false
	})	
	//self.add(botbar);

	var path = null;
	var endlabel = "";
	
	var ajax = require("/helpers/ajax");
	var _data = {};
	_data.identifier = identifier;
	_data.action = "json-get";
	
//alert("l");	
	ajax.getdata({
		url : require("/etc/config").api+"?action=json-get&identifier="+identifier,
		fn : function(e) {
			Ti.API.debug("BBBBBB GOT DATA");
			
			Ti.API.info(e);
			searchtitle = e.data[0].ccsearchterm;
			twitter_image = e.data[0].twitter_image;
			twitter_link = e.data[0].twitter_link;
			twitter_text = e.data[0].twitter_text;
			wikipediasearch = e.data[0].ccwikipediasearch;
			googlesearch = e.data[0].ccgooglesearch;
			facebook_appid = e.data[0].facebook_appid;
			button2 = e.data[0].button2;
			button2_link = e.data[0].button2_link;
			button3 = e.data[0].button3;
			button3_link = e.data[0].button3_link;
			
			Ti.API.debug(e);
			var img = Titanium.UI.createImageView({
				left:0,top:40,height:200,right:0,
				backgroundColor:css.DARKBACKGROUND,
				image : e.data[0].img	//.thumbsrc
			});
			
			var txt = Titanium.UI.createLabel({
				top:20,
				height : 'auto',
				font : {
					fontSize : 16,
					fontFamily : "arial"
				},
				text : e.data[0].title+"\n"+e.data[0].description,	//.description
				enableZoomControls :true
			});		
			botbar.title = e.data.provider;
			var view = Titanium.UI.createView({
				top:44,left:0,bottom:0,width:600
			});
			var view22 = Titanium.UI.createView({
				top:50,right:5,left:600,width:420, height:700,
				borderColor:css.DARKBACKGROUND,borderRadius:5,borderWidth:1
			});
			var view2 = Titanium.UI.createView({
				top:0,left:0,bottom:0,right:0,height:630
			});
			var view4 = Titanium.UI.createView({
				top:635,left:0,bottom:0,right:0,backgroundColor:css.DARKBACKGROUND
				
			});
			
			table = Ti.UI.createTableView({
				backgroundColor : css.DARKBACKGROUND,
				separatorColor : css.DARKBACKGROUND
			});
			view2.add(table);
			
			table.addEventListener('click', function(e) {
				if (e.row.xurl && e.row.xurl != "") {
					addlink({
						url : e.row.xurl
					});
				}
				
				if (e.row.xsurl && e.row.xsurl != "") {
					POPWEBSMALL(e.row.xsurl);
				}
			})
						
			var vals = ['what','where','when','who','general link','comment'];

			var updateLinks = function(links) {
				var vals = ['what','where','when','who','general link','comment'];
				var rows = [];
				
				var secv1 = Ti.UI.createView({
						height : 30,
						backgroundColor : css.LIGHTCOLOUR
				});
				secv1.add(Ti.UI.createLabel({
					height : Ti.UI.SIZE,
					textAlign: "left",
					width:425,
					left:5,
					top:7,
					font : {
						fontSize : 16,
						fontFamily : "arial"
					},
					color : css.VERYLIGHTCOLOUR,
					text : 'ABOUT'
				}));
				var sec1 = Ti.UI.createTableViewSection({
					headerView : secv1
				});
				var row1 = Ti.UI.createTableViewRow({
					height:Ti.UI.SIZE,
					selectionStyle : 0,
					layout:'vertical'
				});
				var rowv1 = Ti.UI.createView({
					backgroundColor : css.DARKBACKGROUND,
					height : Ti.UI.SIZE,
					top:10, bottom:10,
					width:425,
					layout: 'vertical'
				});
				var lblrow1=Ti.UI.createLabel({
					text:Currenttitle,
					color:css.VERYLIGHTCOLOUR,
					font : {
						fontSize : 24,
						fontFamily : "arial",
						fontStyle : 'bold'
					},
					height:Ti.UI.SIZE,
					left:17,right:10,top:0
				});
				
				var lblrow2=Ti.UI.createLabel({
					text:Currenttitle1,
					color:css.VERYLIGHTCOLOUR,
					font : {
						fontSize : 14,
						fontFamily : "arial",
						fontWeight: "normal"
					},
					height:Ti.UI.SIZE,
					left:17,right:15,top:5
				});
				
				var lblrow3=Ti.UI.createLabel({
					text:Currenttitle2,
					color:css.VERYLIGHTCOLOUR,
					font : {
						fontSize : 14,
						fontFamily : "arial"
					},
					height:Ti.UI.SIZE,
					left:17,right:15,top:5
				});
				rowv1.add(lblrow1);
				rowv1.add(lblrow2);
				rowv1.add(lblrow3);
				row1.add(rowv1);
				sec1.add(row1);
				rows.push(sec1);
				var BW = 0;
				for (var i=0; i<ExtraMeta.length; i++){
					var button = ExtraMeta[i];
					var row1 = Ti.UI.createTableViewRow({
						height:Ti.UI.SIZE,
						selectionStyle : 0,
						borderWidth : BW,
						layout:'vertical'
					});
					var rowv1 = Ti.UI.createView({
						backgroundColor : css.DARKBACKGROUND,
						height : Ti.UI.SIZE,
						borderWidth : BW,
						top:4, bottom:4,
						width:425,
//						layout: 'vertical'
					});
					var lblrow5wrap = Ti.UI.createView({
						height : Ti.UI.SIZE,
						layout : 'horizontal',
						left:17,top:0, width : 110
					});
					var lblrow5 = Ti.UI.createLabel({
						text:button.label,
						height : Ti.UI.SIZE,
						color:css.VERYLIGHTCOLOUR,
						borderWidth : BW,
						font : {
							fontSize : 15,
							fontFamily : "arial",
							fontWeight: "bold"
						},
						width : Ti.UI.SIZE, 
						top: 0,
						left: 0
					});
					lblrow5wrap.add(lblrow5);
					var fam = "arial";
					var txt = button.value;
					var siz = 14;
					var xxlink = "";
					var connect = "n";
					if (txt.indexOf("|") > -1) {
						var txt2 = txt.split("|");
						if (txt2.length > 1) xxlink = txt2[1];						
						txt = txt2[0];
					}
					if (txt.indexOf("§") == 0) {
						txt = txt.substring(1);
						fam = "icomoon";
						siz = 18;
					}
					if (txt.indexOf("con:") == 0) {
						txt = txt.substring(4);
						connect = "y";
					}
					var lblrow4 = Ti.UI.createLabel({
						text: txt,
						//html:"<b>"+button.value+"</b>",
						height : Ti.UI.SIZE,
						color:css.VERYLIGHTCOLOUR,
						borderWidth : BW,
						font : {
							fontSize : siz,
							fontFamily : fam
						},
						left:130,top:0, width : 270
//						left:10,top:8
					});
					if (xxlink != "") row1.xurl = xxlink;
					rowv1.add(lblrow5wrap);
					rowv1.add(lblrow4);
					if (connect == "y") {
						lblrow5wrap.add(Ti.UI.createImageView({
							left:4,
							top:0,
							image : '/images/buttons/logo-connect.png',
							height : 16,
							width : 16
						}));
					}
					
					row1.add(rowv1);
					sec1.add(row1);
				}
				for (var i=0; i < ExtraButtons.length; i++) {
					var button = ExtraButtons[i];
					//button.title
					//button.url
					var row1 = Ti.UI.createTableViewRow({
						height:Ti.UI.SIZE,
						selectionStyle : 0,
						xsurl : button.url,
						layout:'vertical'
					});
					var rowv1 = Ti.UI.createView({
						backgroundColor : css.VERYLIGHTCOLOUR,
						height : Ti.UI.SIZE,
						top:10, bottom:10,
						width:425,
						layout: 'vertical'
					});
					
					var lblrow14 = Ti.UI.createView({
						backgroundImage:'/images/butbg.png',
						borderRadius : 5,
						height:32,
						left:17,right:20,top:0
					});
					var lblrow4 = Ti.UI.createLabel({
						text:button.title,
						color:css.VERYLIGHTCOLOUR,
						font : {
							fontSize : 16,
							fontFamily : "arial"
						},
						left:10,top:8
					});
					rowv1.add(lblrow14);
					lblrow14.add(lblrow4);
//					lblrow4.addEventListener('click',function(e){
						//alert(button.url);
//						POPWEBSMALL(button.url);
//					});
					row1.add(rowv1);
					sec1.add(row1);
				}
				
				for (var i=0; i < vals.length; i++) {
					var secv = Ti.UI.createView({
						height : 30,
						backgroundColor : css.LIGHTCOLOUR
					});
					secv.add(Ti.UI.createLabel({
						color : css.LIGHTCOLOUR,
						height : Ti.UI.SIZE,
						textAlign: "left",
						width:425,
						left:5,
						top:7,
						font : {
							fontSize : 16,
							fontFamily : "arial"
						},
						color : css.VERYLIGHTCOLOUR,
						text : vals[i].toUpperCase()
					}));
					var sec = Ti.UI.createTableViewSection({
						headerView : secv
					});
 					var cnt = 0;
					for (var l=0; l < links.length; l++) {
						if (links[l].type == vals[i]) {
							cnt++;
							var row = Ti.UI.createTableViewRow({
								selectionStyle : 0,
								xurl : links[l].url
							});
							var rv = Ti.UI.createView({
								backgroundColor : css.DARKBACKGROUND,
								height : Ti.UI.SIZE,
								top:10, bottom:10,
								width:425
							});
							row.add(rv);
							rv.add(Ti.UI.createLabel({
								color : css.VERYLIGHTCOLOUR,
								height : Ti.UI.SIZE,
								textAlign: "left",
								width:425,
								left:50,
								font : {
									fontSize : 16,
									fontWeight: "bold",
									fontFamily : "arial"
								},
								text : (links[l].comment != "") ? links[l].comment : links[l].url								
							}));
							rv.add(Ti.UI.createImageView({
								left:20,
								top:0,
								height:15,width:15,
								image: "/images/button_connect_small.png" 
							}));
							sec.add(row);
						}
					}
					if (cnt > 0) {
						rows.push(sec);
					}
				}
				table.setData(rows);
			}

			Currenttitle=e.data[0].title;
			Currenttitle1=e.data[0].description;
			Currenttitle2=e.data["creator"];
			ExtraButtons = e.data1.buts;
			ExtraMeta = e.data1.meta;
			updateLinks(e.data1.links);
			var updateLinksFn = function(e) {
				updateLinks(e.links);
			}
			table.addEventListener("updateLinks",updateLinksFn);
			
			self.add(view);
			view22.add(view4);
			Ti.API.debug("AAAAAA - 99");
			
			
			var lbl121 = Ti.UI.createImageView({
				image : "/images/buttons/menu-connect.png",
				left : 50,
				bottom:10
			});
			lbl122 = Ti.UI.createImageView({
				image : "/images/buttons/menu-favourite.png",
				left : 140,
				bottom:10
			});
			if (isfav(identifier) == true){
				lbl122.image = "/images/buttons/menu-favourite-active.png";
			}
			var lbl123 = Ti.UI.createImageView({
				image : "/images/buttons/menu-comment.png",
				left : 230,
				bottom:10
			});
			var lbl124 = Ti.UI.createImageView({
				image : "/images/buttons/menu-share.png",
				left : 320,
				bottom:10
			});
			
			view4.add(lbl121);
			//view4.add(lbl122a);
			view4.add(lbl122);
			view4.add(lbl123);
			view4.add(lbl124);
			
			var poper = function(){
				var self = Titanium.UI.createOptionDialog({
			        cancel: 2,
			        options: ['share on Facebook', 'share on Twitter', 'cancel',''],
			        message: 'testing version no. ',
			        title: 'Options',
			    });
			    //alert("b");
			   self.addEventListener('click',function(e) {
			        if (e.index == 0) {
						require("/helpers/social/share").facebook(twitter_text, twitter_image, twitter_link,false,facebook_appid);
			        }
			        else if (e.index == 1) {
						require("/helpers/social/share").tweet(twitter_text, twitter_image, twitter_link, false);
			        }
			        else if (e.index == 2) {
			        }
			    });
			    self.show();
			    return self;
			};
			
			lbl121.addEventListener("click",addlink);
			lbl122.addEventListener("click",like);
			lbl123.addEventListener("click",addcomment);
			lbl124.addEventListener("click",function(e){
				//winclose();
				//Titanium.App.fireEvent("redisplay-personal",{});
				poper();
			});
			
			view22.add(view2);
			self.add(view22);
			
			var html = "";
			
			html = "<img src='"+ e.data[0].img+"' style='background-color:black;border:0;padding:0;margin:0;' width='100%'>";
			
			Ti.API.debug("AAAAAA - 999");

			// self.add(Titanium.UI.createWebView({
				// left:514,bottom:40,right:0, height:200, url : "http://www.wikipedia.com"
			// }));
			
			
			// view.add(img);
			// img.addEventListener("click", winclose);
// 			
			// view.add(txt);
			
			// var wv0 = Ti.UI.createScrollView({
				// left:0,top:0, 
				// width:  Ti.UI.FILL,
				// height : Ti.UI.FILL,
			    // contentWidth:'auto',
			    // contentHeight:'auto'
			// });

			
			var wv = Titanium.UI.createWebView({
				left:0,top:0,bottom:8,right:5,
				borderRadius:5,
				width:  Ti.UI.FILL,
				height : Ti.UI.FILL,
				scalesPageToFit:true,
				touchEnabled : true,
				html : html,
				backgroundColor:css.DARKBACKGROUND
			});
			view.add(wv);
			
			var optpush = function(arr,item) {
				for (var i=0; i < arr.length; i++) {
					if (arr[i] == item) return arr;
				}
				arr.push(item);
				return arr;
			}
			var displayPath = function(ARR) {
				var view0 = Titanium.UI.createView({
					top:00,bottom:200,left:0,right:0, layout : 'vertical',
					borderColor:'#333'
//					borderRadius:20
				});
				var matched = [];
				for (var i=0; i < path.length; i++) { matched.push(true) }
				
				
				var lbl0h = Titanium.UI.createLabel({text:" How You Are Connected to "+e.data.title ,backgroundColor:"#333",color:css.VERYLIGHTCOLOUR,left:0,right:0,height:50,top:0,font : {fontFamily : "arial"}});
				view0.add(lbl0h);
				
				var lbl0 = Titanium.UI.createLabel({text:"You",height:40,top:5,font : {fontSize:20, fontFamily : "arial"}});
				lbl0.addEventListener("click",function(e) {
					ARR = [];
					displayPath(ARR);
				})
				view0.add(lbl0);
				
				
				
				for (var i=0; i < ARR.length; i++) {
					view0.add(Titanium.UI.createLabel({text:ARR[i],height:20,top:5,font : {fontFamily : "arial"}}));
					for (var j=0; j < path.length; j++) { if (path[j][i] != ARR[i]) matched[j] = false; }
				}
		
				var list = [];		
				var shortest = 999999;
				for (var i=0; i < path.length; i++) {
					if (matched[i] == true) {
						if (path[i].length < shortest) shortest = path[i].length;
						list = optpush(list,path[i][ARR.length]);
					}
				}
				view0.add(Titanium.UI.createLabel({text:"("+(path.length)+")"}));
				
				view0.add(Titanium.UI.createImageView({image:"/images/icon_arrow_green_down_15x18.gif",height:20,width:20}));
				
				
				for (var i=0; i < list.length; i++) {
					var lbl = Titanium.UI.createLabel({color : "#00f",text:list[i],height:20,top:5,font : {fontFamily : "arial"}});
					lbl.addEventListener("click",function(e) {
						ARR.push(e.source.text);
						displayPath(ARR);
					})
					view0.add(lbl);
				}
				view0.add(Titanium.UI.createImageView({image:"/images/icon_arrow_green_down_15x18.gif",height:20,width:20}));
				view0.add(Titanium.UI.createLabel({text:"("+(shortest - ARR.length)+")"}));
				view0.add(Titanium.UI.createLabel({text:e.data.title,height:20,top:5,font : {fontFamily : "arial"}}));
				if (view2.children && view2.children.length > 0) {
					view2.remove(view2.children[0]);
				}
				view2.add(view0);
			}			
			
			
			// var txt = Titanium.UI.createLabel({
				// bottom:10,
				// height : 20,
				// text : "AUTO SUGGESTIONS FROM METADATA",
				// color : "#00f",
				// font : {fontFamily : "arial"}
			// })
			// view.add(txt);
			
			Ti.API.debug("AAAAAA - 9999");
			if (e.data && e.data.susuggestions) {
			
				for (var i=0; i < e.data.suggestions.length; i++) {
					var s = e.data.suggestions[i];
					
					
					if (s.indexOf("FOUND NODE ") == 0) {
						Titanium.API.info(s);
						var node = s.substring(11);
						var nodenum = s.substring(54);
						currentlink = node;
						Titanium.API.info(nodenum);
						Titanium.API.info(s);
						var txt = Titanium.UI.createLabel({
							bottom:10,
							height : 20,
							text : node + " / " + nodenum,
							font : {fontFamily : "arial"}
						})
						view.add(txt);
						
						
						var s = require("/helpers/LocalStorage").getString("myself");
						var ss = s.split("/");
						var myid = ss[ss.length-1];
						ajax.getdata({
							url : "http://europeanaapp.glimworm.com/api.php?action=json-path&from="+myid+"&to="+nodenum,
							fn : function(e1) {
								Titanium.API.info(e1);
								var txt1 = Titanium.UI.createLabel({
									bottom:40,
									height : 150,
									text : e1.data.txt,
									font : {fontFamily : "arial"}
								})
	//							view2.add(txt1);
								path = e1.data.arr1;
								
								displayPath([]);
	
								// for (var i=0; i < e1.data; i++) {
									// var path = e1.data[i];
									// var length = path.length;
									// for (var j=0; j < path.relationships.length; j++) {
	// 									
									// }
								// }
								
							}
						});
					} else if (s.indexOf("TERM") == 0) {
						var txt = Titanium.UI.createLabel({
							bottom:10,
							height : 20,
							text : s,
							font : {fontFamily : "arial"}
						})
						view.add(txt);
						
					} else if (s.indexOf("CON") == 0) {
						var txt = Titanium.UI.createLabel({
							bottom:10,
							height : 20,
							text : s,
							font : {fontFamily : "arial"}
						})
						view.add(txt);
						
					}
				}
			}
			Ti.API.debug("AAAAAA - 99999-END");
			
		}
	})
	var displayhelp1 = function() {
		var x = Ti.UI.createWindow({
		});
		x.add(Ti.UI.createView({
			top:0,left:0,height:Ti.UI.FILL,width:Ti.UI.FILL,backgroundColor:"#333333",opacity:0.4
		}));
		x.add(Ti.UI.createImageView({
			top:0,left:0,height:Ti.UI.FILL,width:Ti.UI.FILL,
			image : '/images/eu/help-footer.png'
		}));
		x.addEventListener('click',function(e) {
			x.close();
		});
		x.open();
//		alert(Titanium.Platform.osname+"\n"+Titanium.Platform.version+"\n"+Titanium.Platform.getModel());
		
	};
//	self.addEventListener('click', displayhelp);
	Titanium.App.addEventListener("display1-main-help",displayhelp1);
	self.addEventListener('close', function() {
		Titanium.App.removeEventListener("display1-main-help",displayhelp1);
	});
	//setTimeout(displayhelp1,1000);
	
	var uuid = require("/ui/common/globals").getuuid();
	
Ti.API.debug("AAAAAA");
	globals.openmodalfull(self);	
Ti.API.debug("AAAAAA2");
	//setTimeout(globals.openmodalfull(self),5000);
	//alert(self);	
	
}

module.exports = fn;
