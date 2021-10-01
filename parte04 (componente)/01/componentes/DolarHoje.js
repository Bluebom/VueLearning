export default {
    name: "DolarHoje",
    data(){
        return {
            valueDolar: 0,
        }
    },
    filters:{
        numeroPreco(valor){
          return parseFloat(valor).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        }
    },
    template: `<p class="text-warning bg-dark p-2">O valor do dolar hoje custa {{valueDolar | numeroPreco}}</p>`,
    methods:{
        getDolar(){
            axios.get("https://economia.awesomeapi.com.br/json/last/USD")
            .then(res => { this.valueDolar = res.data.USDBRL.bid})
            .catch((erro) => {
                console.log(erro);
            })
        }
    },
    created(){
        this.getDolar();
    }
}