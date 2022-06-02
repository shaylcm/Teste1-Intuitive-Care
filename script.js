
/**
 * @author Shayene Lorrane Couto Manoel
 * @version 1.5
 * @since 01/06/2022
 * 
 */

Vue.createApp({  

  /**
   * 
   * @returns retorna os elements abaixo
   */
    data() {
      return {
       
        result :[], //armazena o vetor com as informações dos arquivos 
        parse_header: [], //armazena em um vetor o cabeçalho da do arquivo 
        parse_csv: [], //armazena em um vetor o arquivo csv
        sortOrders:{}, //referente a ordenação
        sortKey: "", //referente a ordenação das chaves 
        search:"",    //referente ao conteudo pesquisado   
      };
    },
  
    /**
     *@description filtro de saída
     */
    
    filters: {
       /**
        * @description faz com que a saída tenha a primeira letra maiúscua
        * @param {String} str 
        * @returns 
        */
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },


    /**
     * @description funções computadas
     */
    computed:{

      /**
       * @description função responsavel por filtrar os resultados da pesquisa
       * 
       * @returns Retorna o resultado filtrado
       */
      dadosFilter(){
        var values = [];      
      

        /**@callback filtra o valor digitado */
         values = this.result.filter((key) => { 
             
           return (             
             key["Registro ANS"].toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.CNPJ.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key["Nome Fantasia"].toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Modalidade.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Logradouro.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Número.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Complemento.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Bairro.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Cidade.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.UF.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.CEP.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.DDD.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Telefone.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Fax.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key["Endereço eletrônico"].toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key.Representante.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key["Cargo Representante"].toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
             key["Data Registro ANS"].toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1              
           );          
         });         
        document.getElementById("tableone").style.display="none "; 
        return values;     
      }      
    },
    
    /** @description Métodos */
    methods: {

      /**
       * @description método responsavel por ordenar por chave
       * @param {*} key 
       */
      sortBy: function (key) {
        var vm = this
        vm.sortKey = key
        vm.sortOrders[key] = vm.sortOrders[key] * -1
      },
      
    

      /**
       * @description método responsavel pela formatação e obtenção do vetor de objetos  do arquivo sendo ele csv ou JSON
       * @param {*} csv 
       * @returns  retorna o vetor de objetos do arquivos
       */
      csvJSON(csv){
        var vm = this
        var lines = csv.split("\r")
        //var result = []
        var headers = lines[0].split(";")
        vm.parse_header = lines[0].split(";") 
        lines[0].split(";").forEach(function (key) {
          vm.sortOrders[key] = 1
        })
        
        lines.map(function(line, indexLine){
          if (indexLine <1) return // Jump header line
          
          var obj = {}
          var currentline = line.split(";") 
          
          headers.map(function(header, indexHeader){
            obj[header] = currentline[indexHeader]
          })
          
          vm.result.push(obj)
         
        })
        
       vm.result.pop() // remove the last item because undefined values
    
        console.log(this.result);
        return vm.result // JavaScript object
      },
      

      /**
       * @description Método responsável por carregar o arquivo CSV
       * @param {*} e 
       */
      loadCSV(e) {
        var vm = this
        if (window.FileReader) {
          var reader = new FileReader();
          reader.readAsText(e.target.files[0]);
          // Handle errors load
          reader.onload = function(event) {
            var csv = event.target.result;
            vm.parse_csv = vm.csvJSON(csv)
            
          };
          reader.onerror = function(evt) {
            if(evt.target.error.name == "NotReadableError") {
              alert("Canno't read file !");
            }
          };
        } else {
          alert('FileReader are not supported in this browser.');
        }
       
      }
      
    },
    
  }).mount('#app');



  
  
