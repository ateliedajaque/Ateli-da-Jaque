(function () {
  "use strict";
  var A = window.ATELIE;
  var pedido = {}; // id da variante -> quantidade
  var filtroAtual = "todos";

  var brl = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  // Cada produto vira uma lista de variantes (produto simples = 1 variante)
  var variantes = {};
  A.produtos.forEach(function (p) {
    p.passo = 1;
    p.vars = p.variantes || [{ id: p.id, nome: "", preco: p.preco, faixa: p.faixa }];
    p.vars.forEach(function (v) { v.produto = p; variantes[v.id] = v; });
  });

  function precoUnit(v, qtd) {
    return v.faixa && qtd >= v.faixa.apartir ? v.faixa.preco : v.preco;
  }

  function linkZap(msg) {
    var base = A.whatsapp ? "https://wa.me/" + A.whatsapp : "https://wa.me/";
    return base + "?text=" + encodeURIComponent(msg);
  }

  /* ---------- cardápio ---------- */
  function stepper(v) {
    var q = pedido[v.id] || 0;
    return '<div class="qtd" data-id="' + v.id + '">' +
      '<button type="button" class="menos" aria-label="Tirar ' + esc(v.produto.nome + " " + v.nome) + '">−</button>' +
      '<output aria-live="polite">' + q + "</output>" +
      '<button type="button" class="mais" aria-label="Adicionar ' + esc(v.produto.nome + " " + v.nome) + '">+</button></div>';
  }

  function cartao(p) {
    var h = '<article class="produto" id="p-' + p.id + '" data-cat="' + p.categoria + '">';
    var fotos = p.fotos || [p.foto];
    h += '<div class="produto-foto"><div class="galeria" tabindex="0" aria-label="Fotos de ' + esc(p.nome) + '">' +
      fotos.map(function (f, i) {
        return '<img src="' + f + '" alt="' + esc(p.nome) + (fotos.length > 1 ? " (foto " + (i + 1) + ")" : "") + '" loading="lazy">';
      }).join("") + "</div>";
    if (fotos.length > 1) {
      h += '<button type="button" class="seta seta-ant" aria-label="Foto anterior">‹</button>' +
        '<button type="button" class="seta seta-prox" aria-label="Próxima foto">›</button>' +
        '<span class="contador">' + fotos.length + " fotos</span>";
    }
    h += "</div><div class=\"produto-corpo\"><h3>" + esc(p.nome) + "</h3>";
    if (p.frase) h += '<p class="produto-frase">' + esc(p.frase) + "</p>";
    if (p.info) h += '<p class="produto-info">' + esc(p.info) + "</p>";
    if (p.sabores) h += '<ul class="sabores" aria-label="Sabores">' + p.sabores.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>";

    p.vars.forEach(function (v) {
      var sub = "por " + (p.unidade || "unidade");
      if (p.destaqueCento) sub = "cento: " + brl(p.destaqueCento);
      if (v.faixa) sub = "a partir de " + v.faixa.apartir + ": " + brl(v.faixa.preco);
      h += '<div class="produto-rodape"><div class="preco">' +
        (v.nome ? '<span class="variante">' + esc(v.nome) + "</span>" : "") +
        brl(v.preco) + "<small>" + esc(sub) + "</small></div>" + stepper(v) + "</div>";
    });
    return h + "</div></article>";
  }

  function montarCardapio() {
    var filtros = document.getElementById("filtros");
    var cats = [{ id: "todos", nome: "Todos" }].concat(A.categorias);
    filtros.innerHTML = cats.map(function (c) {
      return '<button type="button" role="tab" class="filtro" data-cat="' + c.id + '" aria-selected="' + (c.id === filtroAtual) + '">' + esc(c.nome) + "</button>";
    }).join("");
    document.getElementById("grade").innerHTML = A.produtos.map(cartao).join("");

    filtros.addEventListener("click", function (e) {
      var b = e.target.closest(".filtro"); if (!b) return;
      filtroAtual = b.dataset.cat;
      filtros.querySelectorAll(".filtro").forEach(function (x) { x.setAttribute("aria-selected", x === b); });
      document.querySelectorAll(".produto").forEach(function (el) {
        el.hidden = !(filtroAtual === "todos" || el.dataset.cat === filtroAtual);
      });
    });

    document.getElementById("grade").addEventListener("click", function (e) {
      var b = e.target.closest(".qtd button"); if (!b) return;
      var id = b.parentNode.dataset.id, v = variantes[id], passo = v.produto.passo;
      var q = (pedido[id] || 0) + (b.classList.contains("mais") ? passo : -passo);
      if (q <= 0) delete pedido[id]; else pedido[id] = q;
      atualizar();
    });

    document.getElementById("grade").addEventListener("click", function (e) {
      var b = e.target.closest(".seta"); if (!b) return;
      var g = b.parentNode.querySelector(".galeria");
      g.scrollBy({ left: (b.classList.contains("seta-prox") ? 1 : -1) * g.clientWidth, behavior: "smooth" });
    });

    // links dos destaques mostram todos os produtos
    document.querySelectorAll('.destaque').forEach(function (a) {
      a.addEventListener("click", function () { filtros.querySelector('[data-cat="todos"]').click(); });
    });
  }

  /* ---------- pedido ---------- */
  function itensPedido() {
    return Object.keys(pedido).map(function (id) {
      var v = variantes[id], q = pedido[id], u = precoUnit(v, q);
      return { v: v, q: q, u: u, total: u * q, nome: v.produto.nome + (v.nome ? " (" + v.nome.toLowerCase() + ")" : "") };
    });
  }

  function atualizar() {
    document.querySelectorAll(".qtd").forEach(function (el) {
      var q = pedido[el.dataset.id] || 0;
      el.querySelector("output").textContent = q;
    });
    document.querySelectorAll(".produto").forEach(function (card) {
      card.classList.toggle("no-pedido",
        Array.prototype.some.call(card.querySelectorAll(".qtd"), function (q) { return pedido[q.dataset.id]; }));
    });

    var itens = itensPedido();
    var sacola = document.getElementById("sacola");
    sacola.hidden = itens.length === 0;
    document.body.classList.toggle("tem-pedido", itens.length > 0);
    if (!itens.length) { fecharPainel(); return; }

    var entrega = document.getElementById("pedido-entrega").checked;
    var soma = itens.reduce(function (s, i) { return s + i.total; }, 0);
    var n = itens.reduce(function (s, i) { return s + i.q; }, 0);
    var gratis = n >= 100; // a partir de 100 doces a entrega é grátis
    var taxa = entrega && !gratis ? A.taxaEntrega : 0;
    var total = soma + taxa;

    document.getElementById("sacola-qtd").textContent = n + (n === 1 ? " doce" : " doces");
    document.getElementById("sacola-total").textContent = brl(total);
    document.getElementById("sacola-lista").innerHTML = itens.map(function (i) {
      return "<li><span>" + i.q + "× " + esc(i.nome) + "</span><span>" + brl(i.total) + "</span></li>";
    }).join("") + (entrega ? '<li class="taxa"><span>Taxa de entrega</span><span>' + (gratis ? "Grátis" : brl(A.taxaEntrega)) + "</span></li>" : "");

    document.getElementById("sacola-enviar").href = linkZap(mensagem(itens, total, entrega, gratis));
  }

  function mensagem(itens, total, entrega, gratis) {
    var data = document.getElementById("pedido-data").value;
    var obs = document.getElementById("pedido-obs").value.trim();
    var m = "Olá, Jaque! Quero fazer este pedido pelo site:\n\n";
    itens.forEach(function (i) { m += "• " + i.q + "x " + i.nome + " = " + brl(i.total) + "\n"; });
    m += entrega ? "• Entrega: " + (gratis ? "grátis (pedido de cento)" : brl(A.taxaEntrega)) + "\n" : "• Vou retirar\n";
    m += "\nTotal estimado: " + brl(total);
    if (data) m += "\nData: " + data.split("-").reverse().join("/");
    if (obs) m += "\nObservações: " + obs;
    return m;
  }

  function fecharPainel() {
    document.getElementById("sacola-painel").hidden = true;
    document.getElementById("sacola-abrir").setAttribute("aria-expanded", "false");
    document.querySelector(".sacola-ver").textContent = "Ver pedido";
  }

  function montarSacola() {
    document.getElementById("sacola-abrir").addEventListener("click", function () {
      var painel = document.getElementById("sacola-painel");
      var abrir = painel.hidden;
      painel.hidden = !abrir;
      this.setAttribute("aria-expanded", String(abrir));
      document.querySelector(".sacola-ver").textContent = abrir ? "Fechar" : "Ver pedido";
    });
    document.getElementById("sacola-limpar").addEventListener("click", function () { pedido = {}; atualizar(); });
    ["pedido-data", "pedido-obs", "pedido-entrega"].forEach(function (id) {
      document.getElementById(id).addEventListener("input", atualizar);
      document.getElementById(id).addEventListener("change", atualizar);
    });
  }

  /* ---------- avisos e links ---------- */
  function montarAvisos() {
    var cidade = A.cidade ? " de " + A.cidade : " da cidade";
    document.getElementById("avisos").innerHTML = A.avisos.map(function (a) {
      return '<div class="aviso"><dt>' + esc(a.titulo) + "</dt><dd>" + esc(a.texto.replace("{cidade}", cidade)) + "</dd></div>";
    }).join("");
  }

  function montarLinksZap() {
    document.querySelectorAll(".js-zap").forEach(function (a) {
      a.href = linkZap(a.dataset.msg || "Olá, Jaque!");
      a.target = "_blank"; a.rel = "noopener";
    });
  }

  montarCardapio();
  montarSacola();
  montarAvisos();
  montarLinksZap();
  atualizar();
})();
