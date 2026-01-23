"use strict";

// ==========================================================
// CDN BASE FOR ALL IMAGES
// ==========================================================
const IMAGE_CDN_BASE =
  "https://cdn.jsdelivr.net/gh/marlwolf606-dev/JavascriptGameDepo@main/static/images/";

// ----------------------------------------------------------
// Internal Helpers (unchanged logic, CDN images applied)
// ----------------------------------------------------------

function internal_get_a_class_named(curr, searched_name) {
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

function internal_FixTheRanking(rank) {
  if (rank === 14) return "ace";
  if (rank === 13) return "king";
  if (rank === 12) return "queen";
  if (rank === 11) return "jack";
  if (rank > 0 && rank < 11) return rank;
  alert("Unknown rank " + rank);
  return rank;
}

function internal_FixTheSuiting(suit) {
  if (suit === 'c') return 'clubs';
  if (suit === 'd') return 'diamonds';
  if (suit === 'h') return 'hearts';
  if (suit === 's') return 'spades';
  alert('Unknown suit ' + suit);
  return suit;
}

// Build full CDN URL for card face image
function internal_GetCardImageUrl(card) {
  var suit = card.substring(0, 1);
  var rank = parseInt(card.substring(1));
  rank = internal_FixTheRanking(rank);
  suit = internal_FixTheSuiting(suit);

  return "url('" + IMAGE_CDN_BASE + rank + "_of_" + suit + ".png')";
}

function internal_setBackground(diva, image, opacity) {
  diva.style.opacity = opacity;
  diva.style.backgroundImage = image;
}

function internal_setCard(diva, card, folded) {
  // card may be "" -> do not show card
  //             "blinded" -> show back
  //             "s14" -> show ace of spades

  var image = "url('" + IMAGE_CDN_BASE + "cardback.png')";
  var opacity = 1.0;

  if (typeof card === 'undefined') {
    opacity = 0.0;
  } else if (card === "") {
    opacity = 0.0;
  } else if (card === "blinded") {
    // keep back of card
  } else {
    if (folded) {
      opacity = 0.5;
    }
    image = internal_GetCardImageUrl(card);
  }
  internal_setBackground(diva, image, opacity);
}

function internal_clickin_helper(button, button_text, func_on_click) {
  if (button_text === 0) {
    button.style.visibility = 'hidden';
  } else {
    button.style.visibility = 'visible';
    button.innerHTML = button_text;
    button.onclick = func_on_click;
  }
}

// ----------------------------------------------------------
// GUI Functions (called by game logic)
// ----------------------------------------------------------

function gui_hide_poker_table() {
  var table = document.getElementById('poker_table');
  table.style.visibility = 'hidden';
}

function gui_show_poker_table() {
  var table = document.getElementById('poker_table');
  table.style.visibility = 'visible';
}

function gui_set_player_name(name, seat) {
  var table = document.getElementById('poker_table');
  var seatloc = table.children['seat' + seat];
  var chipsdiv = internal_get_a_class_named(seatloc, 'name-chips');
  var namediv = internal_get_a_class_named(chipsdiv, 'player-name');
  seatloc.style.visibility = name === "" ? 'hidden' : 'visible';
  namediv.textContent = name;
}

function gui_hilite_player(hilite_color, name_color, seat) {
  var table = document.getElementById('poker_table');
  var seatloc = table.children['seat' + seat];
  var chipsdiv = internal_get_a_class_named(seatloc, 'name-chips');
  var namediv = internal_get_a_class_named(chipsdiv, 'player-name');
  if (name_color !== "") namediv.style.color = name_color;
  if (hilite_color !== "") namediv.style.backgroundColor = hilite_color;
}

function gui_set_bankroll(amount, seat) {
  var table = document.getElementById('poker_table');
  var seatloc = table.children['seat' + seat];
  var chipsdiv = internal_get_a_class_named(seatloc, 'name-chips');
  var namediv = internal_get_a_class_named(chipsdiv, 'chips');
  namediv.textContent = (!isNaN(amount) && amount !== "") ? "$" + amount : amount;
}

function gui_set_bet(bet, seat) {
  var table = document.getElementById('poker_table');
  var seatloc = table.children['seat' + seat];
  var betdiv = internal_get_a_class_named(seatloc, 'bet');
  betdiv.textContent = bet;
}

function gui_set_player_cards(card_a, card_b, seat, folded) {
  var table = document.getElementById('poker_table');
  var seatloc = table.children['seat' + seat];
  var cardsdiv = internal_get_a_class_named(seatloc, 'holecards');
  var card1 = internal_get_a_class_named(cardsdiv, 'card holecard1');
  var card2 = internal_get_a_class_named(cardsdiv, 'card holecard2');
  internal_setCard(card1, card_a, folded);
  internal_setCard(card2, card_b, folded);
}

function gui_lay_board_card(n, the_card) {
  var ids = ['flop1', 'flop2', 'flop3', 'turn', 'river'];
  var boardDiv = document.getElementById('poker_table').children.board;
  internal_setCard(boardDiv.children[ids[n]], the_card);
}

function gui_burn_board_card(n, the_card) {
  var ids = ['burn1', 'burn2', 'burn3'];
  var boardDiv = document.getElementById('poker_table').children.board;
  internal_setCard(boardDiv.children[ids[n]], the_card);
}

function gui_write_basic_general(pot_size) {
  var table = document.getElementById('poker_table');
  var pot_div = table.children.pot;
  var total_div = pot_div.children['total-pot'];
  total_div.innerHTML = 'Total pot: ' + pot_size;
}

var log_text = [];
var log_index = 0;

function gui_log_to_history(text_to_write) {
  for (var idx = log_index; idx > 0; --idx) {
    log_text[idx] = log_text[idx - 1];
  }
  log_text[0] = text_to_write;
  if (log_index < 40) log_index++;
  var text_to_output = '<br><b>' + log_text[0] + '</b>';
  for (idx = 1; idx < log_index; ++idx) {
    text_to_output += '<br>' + log_text[idx];
  }
  document.getElementById('history').innerHTML = text_to_output;
}

function gui_hide_log_window() {
  document.getElementById('history').style.display = 'none';
}

function gui_place_dealer_button(seat) {
  var button = document.getElementById('button');
  if (seat < 0) {
    button.style.visibility = 'hidden';
  } else {
    button.style.visibility = 'visible';
    button.style.backgroundImage = "url('" +
      IMAGE_CDN_BASE + "dealerbutton.png')";
    button.className = 'seat' + seat + '-button';
  }
}

function gui_hide_dealer_button() {
  gui_place_dealer_button(-1);
}

function gui_hide_fold_call_click() {
  var buttons = document.getElementById('action-options');
  internal_clickin_helper(buttons.children['fold-button'], 0, 0);
  internal_clickin_helper(buttons.children['call-button'], 0, 0);
}

function gui_setup_fold_call_click(show_fold, call_text, fold_func, call_func) {
  var buttons = document.getElementById('action-options');
  internal_clickin_helper(buttons.children['fold-button'], show_fold, fold_func);
  internal_clickin_helper(buttons.children['call-button'], call_text, call_func);
}

function gui_hide_guick_raise() {
  document.getElementById('quick-raises').style.visibility = 'hidden';
}

function gui_write_guick_raise(text) {
  var response = document.getElementById('quick-raises');
  response.style.visibility = text ? 'visible' : 'hidden';
  response.innerHTML = text;
}

function gui_hide_game_response() {
  document.getElementById('game-response').style.visibility = 'hidden';
}

function gui_show_game_response() {
  document.getElementById('game-response').style.visibility = 'visible';
}

function gui_write_game_response(text) {
  var response = document.getElementById('game-response');
  response.innerHTML = text;
}

function gui_initialize_css() {
  // Set table background from CDN
  var table = document.getElementById('poker_table');
  internal_setBackground(table,
    "url('" + IMAGE_CDN_BASE + "poker_table.png')", 1.0);
}

function gui_enable_shortcut_keys(func) {
  document.addEventListener('keydown', func);
}

function gui_disable_shortcut_keys(func) {
  document.removeEventListener('keydown', func);
}

// Theme / mode functions unchanged...
// (rest of gui theme functions remain exactly as before)
