/*
CSS Browser Selector 0.6.5
Originally written by Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors

Co-maintained by:
https://github.com/verbatim/css_browser_selector

*/

showLog=true;
function log(m) {if ( window.console && showLog ) {console.log(m); }  }

function css_browser_selector(u)
	{
	var ua=u.toLowerCase(),
	//is=function(t) { ua.indexOf(t.toLowerCase())>-1 },
	is=function(t) { return RegExp(t,"i").test(ua);  },

	g='gecko',
	w='webkit',
	c='chrome',
	f='firefox',
	s='safari',
	o='opera',
	m='mobile',
	a='android',
	bb='blackberry',
	lang='lang_',
	d='device_',
	h=document.documentElement,
	b=	[
		
		// browser
		(!(/opera|webtv/i.test(ua))&&/msie\s(\d+)/.test(ua))?('ie ie'+(/trident\/4\.0/.test(ua) ? '8' : RegExp.$1))
		:is('firefox/')?g+ " " + f+(/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+f+RegExp.$2 + ' '+f+RegExp.$2+"_"+RegExp.$4:'')	
		:is('gecko/')?g
		:is('opera')?o+(/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+o+RegExp.$2 + ' '+o+RegExp.$2+"_"+RegExp.$4 : (/opera(\s|\/)(\d+)\.(\d+)/.test(ua)?' '+o+RegExp.$2+" "+o+RegExp.$2+"_"+RegExp.$3:''))
		:is('konqueror')?'konqueror'

		:is('blackberry') ? 
			( bb + 
				( /Version\/(\d+)(\.(\d+)+)/i.test(ua)
					? " " + bb+ RegExp.$1 + " "+bb+ RegExp.$1+RegExp.$2.replace('.','_')
					: (/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) 
						? ' ' +bb+RegExp.$2 + (RegExp.$3?' ' +bb+RegExp.$2+RegExp.$3:'')
						: '')
				)
				// MIDP and CLDC: 
				// not sure what these represent but have put in until someone can 
				// tell me they aren't necessary for the purposes of this plugin
				+ ( /MIDP-((\d+)\.(\d+))/i.test(ua)
					? " midp"+ RegExp.$2 + " midp"+ RegExp.$1.replace('.','_')
					:'' )
				+ ( /CLDC-((\d+)\.(\d+))/i.test(ua)
					? " cldc"+ RegExp.$2 + " cldc"+ RegExp.$1.replace('.','_')
					:'' )
			) 

		:is('android') ? 
			(  ' ' + a +
				( /Version\/(\d+)(\.(\d+))+/i.test(ua)
					? " " + a+ RegExp.$1 + " "+a+ RegExp.$1+RegExp.$2.replace('.','_')
					: '')
				+ (/Android (.+); (.+) Build/i.test(ua)
					? ' device_'+( (RegExp.$2).replace(/ /g,"_") ).replace(/-/g,"_")
					:''	)
			)

		:is('chrome')?w+   ' '+c+(/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+c+RegExp.$2 +((RegExp.$4>0) ? ' '+c+RegExp.$2+"_"+RegExp.$4:''):'')	
		
		:is('iron')?w+' iron'
		
		:is('applewebkit/') ? 
			( w+ ' '+ s + 
				( /version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)
					?  ' '+ s +RegExp.$2 + " "+s+ RegExp.$2+RegExp.$3.replace('.','_')
					:  ( / Safari\/(\d+)/i.test(ua) 
						? 
						( (RegExp.$1=="419" || RegExp.$1=="417" || RegExp.$1=="416" || RegExp.$1=="412" ) ? ' '+ s + '2_0' 
							: RegExp.$1=="312" ? ' '+ s + '1_3'
							: RegExp.$1=="125" ? ' '+ s + '1_2'
							: RegExp.$1=="85" ? ' '+ s + '1_0'
							: '' )
						:'')
					)
			)	
	
		:is('mozilla/')?g
		:''
		
		// mobile
		,is("mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook")?m:''
		
		// os/platform
		,is('j2me')?'j2me'
		:is('iphone')?'iphone'
		:is('ipod')?'ipod'
		:is('ipad')?'ipad'
		:is('playbook')?'playbook'
		:is('mac')?'mac'+ (/mac os x ((\d+)[.|_](\d+))/.test(ua) ? ' mac' + (RegExp.$1).replace('.',"_") : '' )
		:is('darwin')?'mac'
		:is('webtv')?'webtv'
		:is('win')?'win'+
				(is('windows nt 6.2')?' win8'
				:is('windows nt 6.1')?' win7'
				:is('windows nt 6.0')?' vista'
				:is('windows nt 5.2') || is('windows nt 5.1') ? ' win_xp' 
				:is('windows nt 5.0')?' win_2k'
				:is('windows nt 4.0') || is('WinNT4.0') ?' win_nt'
				: ''
				) 
		:is('freebsd')?'freebsd'
		:(is('x11')||is('linux'))?'linux'
		:''
		
		// user agent language
		,(/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua))?(lang+RegExp.$2).replace("-","_")+(RegExp.$3!=''?(' '+lang+RegExp.$1).replace("-","_"):''):''

		// javascript
		,'js'

		];

	var cssbs = (b.join(' ')).replace(/ +/g," ");
	h.className =   ( h.className.replace(/no[-|_]?js/g,"") + " " + cssbs ).replace(/^ /, "");

	return cssbs;
	}
	
css_browser_selector(navigator.userAgent);


