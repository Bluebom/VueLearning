export default {
    name: "TempoHoje",
    data() {
        return {
            temperaturaMaxima: 0,
        }
    },
    template: `<p class="text-warning bg-dark p-2">Rio de Janeiro máxima de: {{temperaturaMaxima}}</p>`,
    methods: {
        getTempo(){
            axios.get("http://www.metaweather.com/api/location/455825/")
            .then(res => { this.temperaturaMaxima = res.data.consolidated_weather[0].max_temp.toFixed(2) })
            .catch((error) => {
                console.log(error);
              });
        }
    },
    created() {
        this.getTempo();
    }
}