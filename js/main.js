var parent = document.querySelector('.container'),
    input = document.querySelector('#user-input'),
    userClick = document.querySelector('#user-click'),
    userString = document.createElement('p'),
    countClick = 0,
    span = '',
    userLetters = [],
    coordLetter = [],
    elemUnder = null,
    objLetters = {},
    shiftX = 0,
    shiftY = 0;

function getUserLetters() {
  // получаем массив букв из инпута
  userLetters = input.value.split('');
  // обнуляем тег p, чтобы не добавлять предыдущее слово
  userString.innerHTML = null;

  for (var i = 0; i < userLetters.length; i++) {
    span = document.createElement('span');
    span.innerHTML = userLetters[i];
    userString.appendChild(span);
    // получаем объект из букв строки типа {'r': 'r'};
    objLetters[userLetters[i]] = userLetters[i];
  }
  // добавляем в div с классом .container наш тег p, с тегами span внутри
  parent.appendChild(userString);

  return objLetters;
}

userClick.addEventListener('click', function(){  
  return getUserLetters();
});


function moveAt(pageX, pageY, element) {
  element.style.left = pageX - element.offsetWidth / 2 + 'px';
  element.style.top = pageY - element.offsetHeight / 2 + 'px';
}

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY, event.target);
}


var myEvent = function(event){

  if (event.target.innerHTML in objLetters) {

    countClick = countClick + 1;

    if (countClick === 1) {
      coordLetter[0] = event.clientX - 30 + 'px';
      coordLetter[1] = event.clientY - 30 + 'px';
    }

    event.target.style.position = 'absolute';
    event.target.style.zIndex = 1000;

    document.addEventListener('mousemove', onMouseMove);

    onMouseMove(event);

    event.target.hidden = true;
    elemUnder = document.elementFromPoint(event.clientX, event.clientY);

    if (elemUnder.tagName === 'SPAN' && countClick > 1) {
      elemUnder.style.left = coordLetter[0];
      elemUnder.style.top = coordLetter[1];
    }

    event.target.hidden = false;
  }

  if (countClick > 1) {
    document.removeEventListener('mousemove', onMouseMove);
    userString.addEventListener('click', myEvent);
    countClick = 0;
  }

  event.target.ondragstart = function() {
    return false;
  };
}

userString.addEventListener('click', myEvent);