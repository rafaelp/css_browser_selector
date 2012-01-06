showLog=true;
function log(m) {if ( window.console && showLog ) {console.log(m); }  }

// query string parser
function parseQuery(fldNm)
	{
	var oRe = new RegExp("[\\?&]"+fldNm+"=([^&#]*)","i");
	var fldVal = oRe.exec(parent.location.search);
	return (fldVal) ? unescape(fldVal[1]) : "";
	}

$(document).ready(function () {

	
	full_test =  false;
	
	if (full_test==true) { document.documentElement.className =   document.documentElement.className +" full_test" }
	
	
	passed = 0;
	failed = 0;
	output='';
	h=document.documentElement;
	currentNavigator = '<h1><div class="user_agent">Your UA string: '+navigator.userAgent+'<\/div><div class="generated_classes">Your HTML classes: '+h.className+'<\/div><\/h1>',
	
    $.each(user_agent_strings,function(index, item) 
    	{
		ua = item[0];
		
		codes_expected = item[1];
		debug = item[2];
		codes_returned = css_browser_selector(ua).replace("  "," ")
		//if(showLog) { log("|"+codes_returned+"|"); };
		//codes_returned = codes_returned.replace(' js','');
		if(showLog) { log(codes_returned) };
		generate_class= (codes_expected=="header") ? codes_expected : "result generate"
		if (full_test==false || codes_expected=="header")
			{
			output += '<div class="'+generate_class+'"><h3>'+ua+'<\/h3>'+(codes_expected!="header"?'\n<div class="returned">generated: '+codes_returned+'<\/div>\n':'')+'<\/div>';
			}
		else if(codes_expected == codes_returned) 
			{
			output += '<div class="result pass"><h3>'+ua+'<\/h3>\n<div class="returned">got: '+codes_returned+'<\/div>\n<\/div>';
			passed++;
			}
		else 
			{
			output += '<div class="result fail">\n<h3>'+ua+'<\/h3>\n<div class="expected">expected: '+codes_expected+'<\/div>\n<div class="got">got: '+codes_returned+'<\/div>\n<\/div>';
			failed++;
			}
    	});
    
    var passHead = '<h2 class="pass passed">'+passed+' tests passed<\/h2>',
    	failHead = '<h2 class="fail failed">'+failed+' tests failed<\/h2>',
    	outputHeaders =	//allHead + "\n" +
			//currentHead  + "\n" +
			currentNavigator + "\n" +
			(full_test ? passHead  + "\n" +failHead :"")
			;

	$("<div/>").attr("id","container").appendTo("body");
	$(outputHeaders).appendTo("#container");
	$("<div/>").attr("id","results").appendTo("#container");
	
	$(output).appendTo("#results");

	// adds "odd" class to odd TRs for zebra striping
	$("#results .result:odd").addClass("odd");

});


