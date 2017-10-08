!function(){"use strict";var n="function"==typeof fetch?fetch.bind():function(n,t){return t=t||{},new Promise(function(e,a){function s(){var n,t=[],e=[],a={};return o.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm,function(s,o,c){t.push(o=o.toLowerCase()),e.push([o,c]),n=a[o],a[o]=n?n+","+c:c}),{ok:1==(o.status/200|0),status:o.status,statusText:o.statusText,url:o.responseURL,clone:s,text:function(){return Promise.resolve(o.responseText)},json:function(){return Promise.resolve(o.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([o.response]))},headers:{keys:function(){return t},entries:function(){return e},get:function(n){return a[n.toLowerCase()]},has:function(n){return n.toLowerCase()in a}}}}var o=new XMLHttpRequest;o.open(t.method||"get",n);for(var c in t.headers)o.setRequestHeader(c,t.headers[c]);o.withCredentials="include"==t.credentials,o.onload=function(){e(s())},o.onerror=a,o.send(t.body)})},t=function(n){var t,e="";return n.user?e+='\n<div class="schnack-form">\n    <textarea class="schnack-body" placeholder="Post a comment. Markdown is supported!"></textarea><br>\n    <button class="schnack-button">Send comment</button>\n    (signed in as <span class="schnack-user">@'+(null==(t=n.user.name)?"":t)+'</span> :: <a class="schnack-signout" href="#">sign out</a>)\n</div>\n':(e+="\nTo post a comment you need to sign in via<br>\n",n.auth.forEach(function(n,a){e+="\n    "+(null==(t=a?" or ":"")?"":t)+'<button class="schnack-signin-'+(null==(t=n.id)?"":t)+'">'+(null==(t=n.name)?"":t)+"</button>\n"}),e+="\n"),e+='\n<ul class="schnack-comments">\n    ',n.comments.forEach(function(a){e+='\n        <li class="schnack-comment',a.approved||a.trusted||(e+=" schnack-not-approved"),e+='">\n            <div class="schnack-dateline">\n                <span class="schnack-author">',a.author_url&&(e+='<a href="'+(null==(t=a.author_url)?"":t)+'" target="_blank">'),e+=null==(t=a.name)?"":t,a.author_url&&(e+="</a>"),e+='</span>\n                <span class="schnack-date">'+(null==(t=a.created_at_s)?"":t)+":</span>\n                ",n.user&&n.user.admin&&!a.trusted&&["trust","block"].forEach(function(n){e+='\n                <button class="schnack-action" data-target="'+(null==(t=a.user_id)?"":t)+'" data-class="user" data-action="'+(null==(t=n)?"":t)+'">'+(null==(t=n)?"":t)+"</button>\n                "}),e+='\n            </div>\n            <blockquote class="schnack-body">\n                <p>'+(null==(t=a.comment)?"":t)+"</p>\n            </blockquote>\n            ",a.approved||a.trusted||(e+='\n            <div class="schnack-awaiting-approval">\n                This comment is still waiting for '+(null==(t=n.user.admin?"your ":"")?"":t)+"approval"+(null==(t=n.user.admin?"":" by the site owner")?"":t)+".\n                ",n.user&&n.user.admin&&["approve","reject"].forEach(function(n){e+='\n                <button class="schnack-action" data-target="'+(null==(t=a.id)?"":t)+'" data-class="comment" data-action="'+(null==(t=n)?"":t)+'">'+(null==(t=n)?"":t)+"</button>\n                "}),e+="\n            </div>\n            "),e+="\n        </li>\n    "}),e+="\n</ul>"};!function(){function e(){n(i,{credentials:"include",headers:{"Content-Type":"application/json"}}).then(function(n){return n.json()}).then(function(s){a(l).innerHTML=t(s);var o=a(l+" .schnack-button");if(o&&o.addEventListener("click",function(t){var s={comment:a(l+" .schnack-body").value};n(i,{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}).then(function(n){return n.json()}).then(function(n){console.log(n),e()})}),s.user){var c=a("a.schnack-signout");c&&c.addEventListener("click",function(t){t.preventDefault(),n(u+"/signout",{credentials:"include",headers:{"Content-Type":"application/json"}}).then(function(n){return n.json()}).then(function(n){console.log(n),e()})})}else s.auth.forEach(function(n){var t=a(l+" .schnack-signin-"+n.id);t&&t.addEventListener("click",function(t){var a=window.open(u+"/auth/"+n.id,n.name+" Sign-In","resizable,scrollbars,status,width=600,height=500");window.__schnack_wait_for_oauth=function(){a.close(),e()}})});if(s.user&&s.user.admin){var r=function(t){var a=t.target.dataset;n(u+"/"+a.class+"/"+a.target+"/"+a.action,{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:""}).then(function(n){return n.json()}).then(function(n){console.log(n),e()})};document.querySelectorAll(".schnack-action").forEach(function(n){n.addEventListener("click",r)})}})}var a=function(n){return document.querySelector(n)},s=a("script[data-schnack-target]");if(!s)return console.warn("schnack script tag needs some data attributes");var o=s.dataset,c=o.schnackSlug,r=new URL(s.getAttribute("src")),u=r.protocol+"//"+r.host,i=u+"/comments/"+c,l=o.schnackTarget;document.domain=document.domain.split(".").slice(1).join("."),e()}()}();
