var pre = document.querySelectorAll('pre');
var js = pre[0];
var twitter = pre[1];

function toCharArray(el) {
    var html = el.innerHTML;
    return html.split('\n').map(function (l) {
        return [].map.call(l, function (c) { return c; });
    });
}

function replaceWithSpans(el) {
    el.style.display = 'none';
    var chars = toCharArray(el);
    var div = document.createElement('div');
    div.setAttribute('class', 'pre-div');
    var ids = {};

    chars.forEach(function (line) {
        var row = document.createElement('div');
        line.forEach(function (char) {
            var span = document.createElement('span');
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                ids[char] = ids[char] || 0;
                ids[char]++;
                span.setAttribute('data-id', char+'-'+ids[char]);
                span.innerHTML = char;
            }
            row.appendChild(span);
        });
        div.appendChild(row);
    });
    document.body.appendChild(div);
    return div;
}

var jsDiv = replaceWithSpans(js);
var twitterDiv = replaceWithSpans(twitter);

var canvasDiv = twitterDiv.cloneNode(true);
[].forEach.call(jsDiv.querySelectorAll('[data-id]'), function (el) {
  var target = canvasDiv.querySelector('[data-id="' + el.getAttribute('data-id') + '"]');
  if (!target) {
    canvasDiv.appendChild(el.cloneNode(true));
  }
});

[].forEach.call(twitterDiv.querySelectorAll('[data-id]'), function (el) {
  var target = canvasDiv.querySelector('[data-id="' + el.getAttribute('data-id') + '"]');
  if (!target) {
    canvasDiv.appendChild(el.cloneNode(true));
  }
});

document.querySelector('a').appendChild(canvasDiv);

function setCanvasElsTo(div) {
  var els = canvasDiv.querySelectorAll('[data-id]');
  [].map.call(els, function (el) {
    var target = div.querySelector('[data-id="' + el.getAttribute('data-id') + '"]');
    el.style.position = 'absolute';
    el.style.display = 'block';

    if (!target) {
        var offscreenX = -3000 - Math.random()*1000 + 'px';
        var offscreenY = -3000 - Math.random()*1000 + 'px';

        el.style.left = '50%';
        el.style.top = '50%';
        el.style.opacity =  0;
    } else {
        var rect = target.getBoundingClientRect();
        el.style.top = rect.top + 'px';
        el.style.left = rect.left + 'px';
        el.style.right = 'auto';
        el.style.bottom = 'auto';
        el.style.opacity =  1;
    }
  });
}

setCanvasElsTo(jsDiv);
canvasDiv.addEventListener('mouseenter', function () {
  setCanvasElsTo(twitterDiv);
});
canvasDiv.addEventListener('mouseleave', function () {
  setCanvasElsTo(jsDiv);
});
canvasDiv.setAttribute('class', 'pre-div pre-div-canvas');

setTimeout(function () {
  canvasDiv.setAttribute('class', canvasDiv.getAttribute('class') + ' with-transition');
}, 0);
