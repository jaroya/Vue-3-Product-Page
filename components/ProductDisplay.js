app.component('product-display', {

    props: {

        premium: {
            type: Boolean,
            required: true
            
        }
    },

    template: 
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image" alt="">
      </div>

      <div class="product-info">
        <h1>{{title}}</h1>
        <p v-show="onSale">On Sale</p>
        <p>Shipping:{{shipping}}</p>
        <p>{{description}}</p>
        <p><a :href="url" target="_blank">Jaroya API</a></p>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
        <p v-else>Out of Stock</p>

        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>

        <div v-for="variant in variants" 
        :key="variant.id"
         @mouseover="updateImage(variant.image)"
         class="color-circle"
         :style="{ backgroundColor: variant.color}">
         
        </div>


        <button 
        class="button"
        :class="{disabledButton: !inStock}"
        :disabled="!inStock"
         @click="addToCart">
         Add to Cart
        </button>

      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>   `,

  data(){
    return {
        product: "Socks",
        brand: "Yala",
        inStock: true,
        image: './assets/images/socks_green.jpg',
        url: 'http://jaroya.me/',
        inventory: 0,
        onSale: true,
        description: "Beautiful socks for sale at a very affordable price",
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
             {id: 2234, color:'green', image: './assets/images/socks_green.jpg'},
             {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg'}
        ],
        reviews: []

    }
},

methods: {
    addToCart(){
        this.$emit('add-to-cart');
    },

    updateImage(variantImage){
        this.image = variantImage
    },

    inStockFun(){
     if(this.inventory <= 0){

         this.inStock = false

     }else{

         this.inStock = true
     }

    },

    addReview(review){
        this.reviews.push(review);
    }
}, 

computed: {
    title(){
        return ` ${this.brand} ${this.product}`
    },

    shipping(){
        if(this.premium){
            return `Free`
        }
        return `$2.99`
    }
}



})