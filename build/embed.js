!function(){"use strict";var n="function"==typeof fetch?fetch.bind():function(n,t){return t=t||{},new Promise(function(e,a){function s(){var n,t=[],e=[],a={};return o.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm,function(s,o,c){t.push(o=o.toLowerCase()),e.push([o,c]),n=a[o],a[o]=n?n+","+c:c}),{ok:1==(o.status/200|0),status:o.status,statusText:o.statusText,url:o.responseURL,clone:s,text:function(){return Promise.resolve(o.responseText)},json:function(){return Promise.resolve(o.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([o.response]))},headers:{keys:function(){return t},entries:function(){return e},get:function(n){return a[n.toLowerCase()]},has:function(n){return n.toLowerCase()in a}}}}var o=new XMLHttpRequest;o.open(t.method||"get",n);for(var c in t.headers)o.setRequestHeader(c,t.headers[c]);o.withCredentials="include"==t.credentials,o.onload=function(){e(s())},o.onerror=a,o.send(t.body)})},t=function(n){var t,e="";return n.user?(e+="\n    ",n.user.admin&&(e+='\n    <div class="schnack-settings">\n        <button class="schnack-action" data-target="notification" data-class="setting" data-action="true">un</button>\n        <button class="schnack-action" data-target="notification" data-class="setting" data-action="false">mute notifications</button>\n    </div>\n    '),e+='\n<div class="schnack-form">\n    <textarea class="schnack-body" placeholder="Post a comment. Markdown is supported!"></textarea>\n    <blockquote class="schnack-body" style="display:none"></blockquote>\n    <br>\n    <button class="schnack-preview">Preview</button>\n    <button style="display:none" class="schnack-write">Edit</button>&nbsp;\n    <button class="schnack-button">Send comment</button><br>\n    (signed in as <span class="schnack-user">@'+(null==(t=n.user.name)?"":t)+'</span> :: <a class="schnack-signout" href="#">sign out</a>)\n</div>\n'):(e+="\nTo post a comment you need to sign in via<br>\n",n.auth.forEach(function(n,a){e+="\n    "+(null==(t=a?" or ":"")?"":t)+'<button class="schnack-signin-'+(null==(t=n.id)?"":t)+'">'+(null==(t=n.name)?"":t)+"</button>\n"}),e+="\n"),e+='\n<ul class="schnack-comments">\n    ',n.comments.forEach(function(a){e+='\n        <li class="schnack-comment',a.approved||a.trusted||(e+=" schnack-not-approved"),e+='">\n            <div class="schnack-dateline">\n                <span class="schnack-author">',a.author_url&&(e+='<a href="'+(null==(t=a.author_url)?"":t)+'" target="_blank">'),e+=null==(t=a.display_name||a.name)?"":t,a.author_url&&(e+="</a>"),e+='</span>\n                <span class="schnack-date">'+(null==(t=a.created_at_s)?"":t)+":</span>\n                ",n.user&&n.user.admin&&!a.trusted&&["trust","block"].forEach(function(n){e+='\n                <button class="schnack-action" data-target="'+(null==(t=a.user_id)?"":t)+'" data-class="user" data-action="'+(null==(t=n)?"":t)+'">'+(null==(t=n)?"":t)+"</button>\n                "}),e+='\n            </div>\n            <blockquote class="schnack-body">\n                '+(null==(t=a.comment)?"":t)+"\n            </blockquote>\n            ",a.approved||a.trusted||(e+='\n            <div class="schnack-awaiting-approval">\n                This comment is still waiting for '+(null==(t=n.user.admin?"your ":"")?"":t)+"approval"+(null==(t=n.user.admin?"":" by the site owner")?"":t)+".\n                ",n.user&&n.user.admin&&["approve","reject"].forEach(function(n){e+='\n                <button class="schnack-action" data-target="'+(null==(t=a.id)?"":t)+'" data-class="comment" data-action="'+(null==(t=n)?"":t)+'">'+(null==(t=n)?"":t)+"</button>\n                "}),e+="\n            </div>\n            "),e+="\n        </li>\n    "}),e+="\n</ul>\n"};!function(){function e(){n(l,{credentials:"include",headers:{"Content-Type":"application/json"}}).then(function(n){return n.json()}).then(function(s){a(u).innerHTML=t(s);var o=a(u+" textarea.schnack-body"),i=a(u+" .schnack-form blockquote.schnack-body"),d=window.localStorage.getItem("schnack-draft-"+c);d&&o&&(o.value=d);var h=a(u+" .schnack-button"),f=a(u+" .schnack-preview"),p=a(u+" .schnack-write");if(h&&(h.addEventListener("click",function(t){var a=o.value;n(l,{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comment:a})}).then(function(n){return n.json()}).then(function(n){console.log(n),o.value="",window.localStorage.setItem("schnack-draft-"+c,o.value),e()})}),f.addEventListener("click",function(t){var e=o.value;o.style.display="none",f.style.display="none",i.style.display="block",p.style.display="inline",n(r+"/markdown",{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comment:e})}).then(function(n){return n.json()}).then(function(n){console.log(n),i.innerHTML=n.html})}),p.addEventListener("click",function(n){o.style.display="inline",f.style.display="inline",i.style.display="none",p.style.display="none"}),o.addEventListener("keyup",function(){window.localStorage.setItem("schnack-draft-"+c,o.value)})),s.user){var k=a("a.schnack-signout");k&&k.addEventListener("click",function(t){t.preventDefault(),n(r+"/signout",{credentials:"include",headers:{"Content-Type":"application/json"}}).then(function(n){return n.json()}).then(function(n){console.log(n),e()})})}else s.auth.forEach(function(n){var t=a(u+" .schnack-signin-"+n.id);t&&t.addEventListener("click",function(t){var a=window.open(r+"/auth/"+n.id,n.name+" Sign-In","resizable,scrollbars,status,width=600,height=500");window.__schnack_wait_for_oauth=function(){a.close(),e()}})});if(s.user&&s.user.admin){var m=function(t){var a=t.target.dataset;n(r+"/"+a.class+"/"+a.target+"/"+a.action,{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:""}).then(function(n){return n.json()}).then(function(n){console.log(n),e()})};document.querySelectorAll(".schnack-action").forEach(function(n){n.addEventListener("click",m)})}})}var a=function(n){return document.querySelector(n)},s=a("script[data-schnack-target]");if(!s)return console.warn("schnack script tag needs some data attributes");var o=s.dataset,c=o.schnackSlug,i=new URL(s.getAttribute("src")),r=i.protocol+"//"+i.host,l=r+"/comments/"+c,u=o.schnackTarget;document.domain=i.host.split(".").slice(1).join("."),e()}()}();
