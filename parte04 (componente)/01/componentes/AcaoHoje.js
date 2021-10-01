import DolarHoje from './DolarHoje.js';
export default {
    name: "AcaoHoje",
    components:{
        DolarHoje,
    },
    filters:{
        numeroPreco(valor){
          return valor.toLocaleString("us", {style: "currency", currency: "USD"})
        }
    },
    data() {
        return{
            valorMerc: 0,
        }
    },
    template: `<div><p class="text-warning bg-dark p-2">Valor de mercado da Apple é {{valorMerc | numeroPreco}}</p>
    <dolar-hoje></dolar-hoje>
    </div>`,
    methods: {
        getAcao() {
            axios.get("https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_b47f6bc7520d43be82b779d469c8f427")
            .then(res => { this.valorMerc = res.data.marketCap })
            .catch((erro) => {
                console.log(erro);
            })
        }
    },
    created() {
        this.getAcao();
    }
}