"use strict";

/* ===============================
   GitHub / CDN image base path
   =============================== */
const IMAGE_BASE =
  "https://cdn.jsdelivr.net/gh/marlwolf606-dev/JavascriptGameDepo@main/static/images/";

// --- Not in the interface ---

function internal_get_a_class_named(curr, searched_name) {
  if (!curr) {
    gui_log_to_history(
      "internal_get_a_class_named, no curr for " + searched_name
    );
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
  return "unknown";
}

function internal_FixTheSuiting(suit) {
  if (suit === "c") return "clubs";
  if (suit === "d") return "diamonds";
  if (suit === "h") return "hearts";
  if (suit === "s") return "spades";
  alert("Unknown suit " + suit);
  return "unknown";
}

function internal_GetCardImageUrl(card) {
  var suit = card.substring(0, 1);
  var rank = parseInt(card.substring(1));
  rank = internal_FixTheRanking(rank);
  suit = internal_FixTheSuiting(suit);
  return "url('" + IMAGE_BASE + rank + "_of_" + suit + ".png')";
}

function internal_setBackground(diva, image, opacity) {
  diva.style.opacity = opacity;
  diva.style.backgroundImage = image;
}

function internal_setCard(diva, card, folded) {
  var image = "url('" + IMAGE_BASE + "cardback.png')";
  var opacity = 1.0;

  if (typeof card === "undefined") {
    opacity = 0.0;
  } else if (card === "") {
    opacity = 0.0;
  } else if (card === "blinded") {
    // keep card back
  } else {
    if (folded) opacity = 0.5;
    image = internal_GetCardImageUrl(card);
  }
  internal_setBackground(diva, image, opacity);
}

function internal_clickin_helper(button, button_text, func_on_click) {
  if (button_text === 0) {
    button.style.visibility = "hidden";
  } else {
    button.style.visibility = "visible";
    button.innerHTML = button_text;
    button.onclick = func_on_click;
  }
}

/* ===============================
   GUI functions
   =============================== */

function gui_hide_poker_table() {
  document.getElementById("poker_table").style.visibility = "hidden";
}

function gui_show_poker_table() {
  document.getElementById("poker_table").style.visibility = "visible";
}

function gui_set_player_name(name, seat) {
  var table = document.getElementById("poker_table");
  var seatloc = table.children["seat" + seat];
  var chipsdiv = internal_get_a_class_named(seatloc, "name-chips");
  var namediv = internal_get_a_class_named(chipsdiv, "player-name");

  seatloc.style.visibility = name === "" ? "hidden" : "visible";
  namediv.textContent = name;
}

function gui_set_bankroll(amount, seat) {
  var table = document.getElementById("poker_table");
  var seatloc = table.children["seat" + seat];
  var chipsdiv = internal_get_a_class_named(seatloc, "name-chips");
  var chipstext = internal_get_a_class_named(chipsdiv, "chips");
  chipstext.textContent = isNaN(amount) ? amount : "$" + amount;
}

function gui_set_bet(bet, seat) {
  var table = document.getElementById("poker_table");
  var seatloc = table.children["seat" + seat];
  internal_get_a_class_named(seatloc, "bet").textContent = bet;
}

function gui_set_player_cards(card_a, card_b, seat, folded) {
  var table = document.getElementById("poker_table");
  var seatloc = table.children["seat" + seat];
  var cards = internal_get_a_class_named(seatloc, "holecards");
  internal_setCard(
    internal_get_a_class_named(cards, "card holecard1"),
    card_a,
    folded
  );
  internal_setCard(
    internal_get_a_class_named(cards, "card holecard2"),
    card_b,
    folded
  );
}

function gui_lay_board_card(n, card) {
  var ids = ["flop1", "flop2", "flop3", "turn", "river"];
  var board = document.getElementById("poker_table").children.board;
  internal_setCard(board.children[ids[n]], card);
}

function gui_burn_board_card(n, card) {
  var ids = ["burn1", "burn2", "burn3"];
  var board = document.getElementById("poker_table").children.board;
  internal_setCard(board.children[ids[n]], card);
}

function gui_initialize_css() {
  var table = document.getElementById("poker_table");
  internal_setBackground(
    table,
    "url('" + IMAGE_BASE + "poker_table.png')",
    1.0
  );
}
