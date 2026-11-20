/* =========================================================
   CARDÁPIO DO ATELIÊ DA JAQUE
   Para mudar preço, sabor ou produto, edite só este arquivo.
   ========================================================= */

window.ATELIE = {
  // Número do WhatsApp com DDI 55 + DDD + número, só dígitos.
  // Exemplo de formato: "5511999999999". Enquanto estiver vazio, o botão
  // abre o WhatsApp para a pessoa escolher o contato.
  whatsapp: "5534997718118",

  instagram: "ateliedajaque27",

  // Cidade atendida (aparece em "Entregas").
  cidade: "Araguari",

  taxaEntrega: 8.0,

  categorias: [
    { id: "docinhos", nome: "Docinhos" },
    { id: "cupcakes", nome: "Cupcakes" },
    { id: "morango", nome: "Com morango" },
    { id: "individuais", nome: "Individuais" }
  ],

  produtos: [
    {
      id: "docinho-tradicional",
      categoria: "docinhos",
      nome: "Docinhos tradicionais",
      frase: "Docinhos que conquistam pelo sabor e pela delicadeza",
      foto: "img/docinhos-tradicionais.jpg",
      preco: 1.35,
      unidade: "unidade",
      destaqueCento: 135.0,
      sabores: ["Brigadeiro", "Leite Ninho", "Paçoca", "Dois Amores", "Beijinho", "Bicho de Pé (morango)", "Uva", "Abacaxi", "Maracujá", "Limão"],
      info: "Cerca de 15 g cada, feitos com chocolate nobre. Forminha tradicional inclusa."
    },
    {
      id: "docinho-gourmet",
      categoria: "docinhos",
      nome: "Docinhos gourmet",
      frase: "Sabores especiais para ocasiões inesquecíveis",
      foto: "img/docinhos-gourmet.jpg",
      preco: 1.5,
      unidade: "unidade",
      destaqueCento: 150.0,
      sabores: ["Brigadeiro gourmet com cacau e granulado Dona Jura", "Olho de Sogra", "Leite Ninho com Nutella", "Pudim", "Churros", "Cappuccino", "Açaí", "Prestígio"],
      info: "Perfeitos para aniversários, casamentos e confraternizações."
    },
    {
      id: "bala-baiana",
      categoria: "docinhos",
      nome: "Balas baianas",
      frase: "Crocantes por fora, cremosas por dentro",
      foto: "img/balas-baianas.jpg",
      preco: 2.5,
      unidade: "unidade",
      sabores: ["Coco", "Chocolate", "Leite Ninho", "Paçoca", "Abacaxi"],
      info: "Ótimas para festas, eventos ou para presentear."
    },
    {
      id: "cupcakes-grandes",
      categoria: "cupcakes",
      nome: "Cupcakes grandes",
      frase: "Fofinhos, delicados e perfeitos para todas as ocasiões",
      foto: "img/cupcakes.jpg",
      info: "Massa macia à base de iogurte natural integral, branca ou de chocolate. Recheio de brigadeiro, creme de Ninho ou prestígio.",
      variantes: [
        { id: "cupcake-recheado", nome: "Recheado + chantininho", preco: 8.0, faixa: { apartir: 8, preco: 7.0 } },
        { id: "cupcake-sem-recheio", nome: "Sem recheio + chantininho", preco: 7.0, faixa: { apartir: 8, preco: 6.0 } },
        { id: "cupcake-bolinho", nome: "Só o bolinho", preco: 6.0, faixa: { apartir: 8, preco: 5.0 } }
      ]
    },
    {
      id: "mini-cupcakes",
      categoria: "cupcakes",
      nome: "Mini cupcakes para festa",
      frase: "Do tamanho certo para a mesa de doces",
      foto: "img/cupcakes.jpg",
      info: "Forminha tradicional inclusa. Modelos personalizados sob consulta.",
      variantes: [
        { id: "mini-recheado", nome: "Recheado + chantininho", preco: 4.0, faixa: { apartir: 16, preco: 3.0 } },
        { id: "mini-sem-recheio", nome: "Sem recheio + chantininho", preco: 3.0, faixa: { apartir: 16, preco: 2.0 } },
        { id: "mini-bolinho", nome: "Só o bolinho", preco: 2.0, faixa: { apartir: 16, preco: 1.0 } }
      ]
    },
    {
      id: "bombom-morango-pote",
      categoria: "morango",
      nome: "Bombom de morango aberto (pote)",
      frase: "Uma delícia para adoçar seu dia",
      foto: "img/bombom-morango-pote.jpg",
      preco: 10.0,
      unidade: "pote",
      novidade: true
    },
    {
      id: "bombom-morango-travessa",
      categoria: "morango",
      nome: "Bombom de morango na travessa",
      frase: "Para dividir com a família",
      foto: "img/bombom-morango-travessa.jpg",
      preco: 90.0,
      unidade: "travessa"
    },
    {
      id: "coxinha-doce",
      categoria: "morango",
      nome: "Coxinha doce de morango",
      frase: "Brigadeiro com morango ou Ninho com morango",
      foto: "img/coxinhas-doces.jpg",
      preco: 10.0,
      unidade: "unidade",
      sabores: ["Brigadeiro com morango", "Ninho com morango"]
    },
    {
      id: "brownie",
      categoria: "individuais",
      nome: "Brownie especial",
      frase: "Casquinha crocante por fora e que derrete na boca",
      foto: "img/brownie.jpg",
      preco: 10.0,
      unidade: "unidade",
      novidade: true,
      info: "Chocolate cremoso com cobertura de chantininho."
    }
  ],

  avisos: [
    { titulo: "Pagamento", texto: "Aceitamos Pix, dinheiro ou cartão." },
    { titulo: "Encomendas de cento", texto: "Para reservar, pedimos o pagamento antecipado de 50%." },
    { titulo: "Entregas", texto: "Atendemos todos os bairros{cidade}, com taxa fixa de R$ 8,00." },
    { titulo: "Antecedência", texto: "Faça seu pedido com pelo menos 15 dias de antecedência." }
  ]
};
