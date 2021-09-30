const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: '',
    carrinho: [],
    mensagemAlerta: "Item adicionado", 
    alertaAtivo: false,
    carrinhoAtivo: false,
  },
  filters:{
      numeroPreco(valor){
        return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
      }
  },
  computed: {
    carrinhoTotal(){
        let total = 0;
        if(this.carrinho.length) {
            this.carrinho.forEach(item => {
                total += item.preco;
            });
        }
        return total;
    }
  },
  methods: {
    getProdutos() {
      axios
        .get("http://127.0.0.1:5500/projeto01/api/produtos.json")
        .then((response) => {
          this.produtos = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProduto(id){
        axios.get("http://127.0.0.1:5500/projeto01/api/produtos/"+id+"/dados.json")
        .then(response => {
            this.produto = response.data;
        })
    },
    abrirModal(id){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        this.getProduto(id);
    },
    fecharModal({target, currentTarget}){
        if(target == currentTarget) this.produto = '';

    },
    clickForaCarrinho({target, currentTarget}){
      if(target == currentTarget) this.carrinhoAtivo = false;

    },
    adicionarItem(){
        this.produto.estoque--;
        const {id,nome,preco} = this.produto;
        this.carrinho.push({id, nome, preco});
        this.alerta(nome + " foi adicionado ao carrinho")
    },
    removerItem(index){
        this.carrinho.splice(index, 1);
        
    },
    checarLocalStorage() {
        if(window.localStorage.carrinho) this.carrinho = JSON.parse(window.localStorage.carrinho)
    },
    compararEstoque(){
      const items = this.carrinho.filter(({id}) => id == this.produto.id);

      this.produto.estoque -= items.length;
    },
    alerta(mensagem){
        this.mensagemAlerta = mensagem;
        this.alertaAtivo = true;
        setTimeout(()=>{
            this.alertaAtivo = false;
        }, 3000)
    },
    router(){
      const hash = document.location.hash;
      if(hash) this.getProduto(hash.replace('#',''));
    }
  },
  watch:{
    produto(){
      document.title = this.produto.nome || "Techno";
      const hash = this.produto.id || "";
      history.pushState(null,null, `#${hash}`);
      if(this.produto){
        this.compararEstoque();
      }
    },
    carrinho(){
        window.localStorage.carrinho = JSON.stringify(this.carrinho);
    }
  },
  created(){
      this.getProdutos();
      this.checarLocalStorage();
      this.router();
  }

});
