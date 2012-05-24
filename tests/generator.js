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

	test_mode = "full";	//	full = shows all pass fail outputs
							//	partial = shows a list of classes generated for each UA string
							//	generate = generates a new array for user_agent_strings once all testing done
	passed = 0;
	failed = 0;
	output='';
	h=document.documentElement;
	
	currentNavigator = '<h1><div class="user_agent">Your UA string: '+navigator.userAgent+'<\/div><div class="generated_classes">Your HTML classes: '+h.className+'<\/div><\/h1>';

	if (test_mode=="full") { document.documentElement.className =   document.documentElement.className +" full_test" }
	all = user_agent_strings.length;

	if (test_mode=="generate") { output+='<pre>' }

    $.each(user_agent_strings,function(index, item) 
    	{
		ua = item[0];
		codes_expected = item[1];		
		codes_returned = css_browser_selector(ua);
		log("|"+codes_returned+"|");
		generate_class= (codes_expected=="header") ? codes_expected : "result partial"
		if (test_mode=="generate")
			{ output+= (codes_expected=="header"?'<br /><br />':'<br />')+'\t["'+ua+'","'+((codes_expected=="header") ? codes_expected : codes_returned)+'"]'+(index<all-1?',':'')+(codes_expected=="header"?'<br />':''); }
		else if (test_mode=="partial" || codes_expected=="header")
			{ output += '<div class="'+generate_class+'"><h3>'+ua+'<\/h3>'+(codes_expected!="header"?'\n<div class="returned">generated: '+codes_returned+'<\/div>\n':'')+'<\/div>'; }
		else if (codes_expected == codes_returned) 
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
    
    	if (test_mode=="generate") {  output+='</pre>' }
    
    var passHead = '<h2 class="pass passed">'+passed+' tests passed<\/h2>',
    	failHead = '<h2 class="fail failed">'+failed+' tests failed<\/h2>',
    	outputHeaders =	//allHead + "\n" +
			//currentHead  + "\n" +
			currentNavigator + "\n" +
			(test_mode=="full" ? passHead  + "\n" +failHead :"")
			;

	$("<div/>").attr("id","container").appendTo("body");
	$(outputHeaders).appendTo("#container");
	$("<div/>").attr("id","results").appendTo("#container");
	
	$(output).appendTo("#results");

	// adds "odd" class to odd TRs for zebra striping
	$("#results .result:odd").addClass("odd");

});


