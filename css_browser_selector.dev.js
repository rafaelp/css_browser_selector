/*
CSS Browser Selector v0.5.0 (Jul 7, 2011)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
Ramin Gomari (http://saarblog.wordpress.com)
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/
function css_browser_selector(u) {
    var ua = u.toLowerCase(),is = function(t) {
        return ua.indexOf(t) > -1
    },g = 'gecko',w = 'webkit',s = 'safari',o = 'opera',m = 'mobile',h = document.documentElement,
            b = [
                (!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + (/trident\/4\.0/i.test(ua) ? '8' : RegExp.$1)) :
                        /firefox\/(\d+)\.?(\d*)/i.test(ua) && parseInt(RegExp.$1) >= 2 ? g + ' ff ff' + RegExp.$1 + (parseInt(RegExp.$2) > 0 ? ' ff' + RegExp.$1 + '_' + RegExp.$2 : '') :
                                is('gecko/') ? g :
                                        is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) :
                                                is('konqueror') ? 'konqueror' :
                                                        is('blackberry') ? m + ' blackberry' :
                                                                is('android') ? m + ' android' :
                                                                        is('chrome') ? w + ' chrome' :
                                                                                is('iron') ? w + ' iron' :
                                                                                        is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '') :
                                                                                                is('mozilla/') ? g : '',
                is('j2me') ? m + ' j2me' :
                        is('iphone') ? m + ' iphone' :
                                is('ipod') ? m + ' ipod' :
                                        is('ipad') ? m + ' ipad' :
                                                is('mac') ? 'mac' :
                                                        is('darwin') ? 'mac' :
                                                                is('webtv') ? 'webtv' :
                                                                        is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : is('windows nt 5.1') || is('windows nt 5.2') ? ' xp' : '') : /*See http://en.wikipedia.org/wiki/Windows_NT#Releases*/
                                                                                is('freebsd') ? 'freebsd' :
                                                                                        (is('x11') || is('linux')) ? 'linux' : '',
                'js'];
    c = b.join(' ');
    h.className += ' ' + c;
    return c;
}
css_browser_selector(navigator.userAgent);
