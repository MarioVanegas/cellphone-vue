<template>
    <div>        
        <h1>{{ anuncios.titulo}}</h1>
    </div>
</template>

<script>
import { db } from "../db.js"

export default {
    name: 'WorkspaceJsonAnuncio',
    components: {   
  },  

    data() {
        return {
        anuncios: {            
        }  
        };
    },

    mounted() {
        
    },

   methods: {
    async mostrarProducto() {
      await db
        .collection("anuncios")
        .doc(this.$route.params.id)
        .get()
        .then((r) => {
          this.anuncios = r.data();        
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created(){
      this.mostrarProducto()
  }
};
</script>

<style lang="scss" scoped>

</style>