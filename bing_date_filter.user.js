// ==UserScript==
// @version 0.0.0
// @namespace http://d.hatena.ne.jp/kanonji/
// @include http://www.bing.com/search*
// // ==/UserScript==
(function(){
    var d = document;
    var prefix = 'tbs=qdr:';
    var loc = d.location;
    var hash = {
        'd2': '2日以内',
        'w2': '2週間以内',
        'm': '1ヶ月以内',
        'm6': '6ヶ月以内',
        'y': '1年以内'
    };
    display();
    function display(){
        var target = d.getElementById('sc_expPane');
        target.appendChild( createUlLi(hash) );
    }
    function createUrl(qs){
        var url = '';
        if(loc.search){
            if(-1 === loc.search.indexOf(prefix)){
                url = [loc.href, qs].join('&');
            }else {
                url = loc.href.replace( new RegExp(prefix+'[0-9a-zA-Z]+'), qs );
            }
        } else {
            url = [loc.href, qs].join('?');
        }
        return url;
    }
    function createUlLi(hash){
        var ul = d.createElement('ul');
        for(var key in hash){
            var li = d.createElement('li');
            li.appendChild( createLink(hash[key], createUrl( prefix + key )) );
            ul.appendChild(li);
        }
        return ul;
    }
    function createLink(text, url){
        var a = d.createElement('a');
        a.href = url;
        a.innerText = text;
        return a;
    }
})();
