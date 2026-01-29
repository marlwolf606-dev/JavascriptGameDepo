"use strict";

// ================= CDN BASE =================
const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/marlwolf606-dev/JavascriptGameDepo@main/static/images/";

//  --- Not in the interface ---

function internal_get_a_class_named (curr, searched_name) {
  if (!curr) {
    gui_log_to_history("internal_get_a_class_named, no curr for " +
                       searched_name);
  }
  var notes = null;
  for (var i = 0; i < curr.childNodes.length; i++) {
    if (curr.childNodes[i].className === searched_name) {
      notes = curr.childNodes[i];
      break;
    }
  }
  return notes;
}

function internal_FixTheRanking (rank) {
  var ret_rank = 'NoRank';
  if (rank === 14) {
    ret_rank = 'ace';
  } else if (rank === 13) {
    ret_rank = 'king';
  } else if (rank === 12) {
    ret_rank = 'queen';
  } else if (rank === 11) {
    ret_rank = 'jack';
  } else if (rank > 0 && rank < 11) {
    ret_rank = rank;
  } else {
    console.log(typeof rank);
    alert('Unknown rank ' + rank);
  }
  return ret_rank;
}

function internal_FixTheSuiting (suit) {
  if (suit === 'c') {
    suit = 'clubs';
  } else if (suit === 'd') {
    suit = 'diamonds';
  } else if (suit === 'h') {
    suit = 'hearts';
  } else if (suit === 's') {
    suit = 'spades';
  } else {
    alert('Unknown suit ' + suit);
    suit = 'yourself';
  }
  return suit;
}

function internal_GetCardImageUrl (card) {
  var suit = card.substring(0, 1);
  var rank = parseInt(card.substring(1));
  rank = internal_FixTheRanking(rank);
  suit = internal_FixTheSuiting(suit);

  return "url('" + CDN_BASE + rank + "_of_" + suit + ".png')";
}

function internal_setBackground (diva, image, opacity) {
  var komage = diva.style;
  komage.opacity = opacity;
  komage['background-image'] = image;
}

function internal_setCard (diva, card, folded) {
  var image = "url('" + CDN_BASE + "cardback.png')";
  var opacity = 1.0;

  if (typeof card === 'undefined') {
    alert('Undefined card ' + card);
    opacity = 0.0;
  } else if (card === "") {
    opacity = 0.0;
  } else if (card === "blinded") {
  } else {
    if (folded) {
      opacity = 0.5;
    }
    image = internal_GetCardImageUrl(card);
  }
  internal_setBackground(diva, image, opacity);
}

//  --- here is the GUI stuff ---

function gui_initialize_css () {
  var item = document.getElementById('poker_table');
  var image = "url('" + CDN_BASE + "poker_table.png')";
  internal_setBackground(item, image, 1.0);
}
