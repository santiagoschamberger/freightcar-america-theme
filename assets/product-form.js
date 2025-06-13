if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.variantIdInput.disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        this.submitButtonText = this.submitButton.querySelector('span');

        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        debugger;
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
       const quantityElement = document.querySelector(".quantity-cart");
        debugger;
            var forceError = false;
            // for product detail
            if(quantityElement){
            var added_qty = quantityElement ? parseInt(quantityElement.innerText) : 0;;
            var maxQty = parseInt(this.form.quantity.dataset.max);
            var inputQty = parseInt(this.form.quantity.value);
            var remaningQty = parseInt(maxQty - added_qty)
            var setQty = 0;
            var errorMsg = "";
            
                      if(parseInt(this.form.quantity.dataset.is_pallet) == 1){
                          if(inputQty > remaningQty){
                            setQty = remaningQty;
                            this.form.quantity.value = setQty; 
                            forceError = true;
                            errorMsg = "Only "+ maxQty +" items were added to your cart due to availability.";
                          }
                      }else{
                          if(maxQty && inputQty > remaningQty){
                            setQty = remaningQty;
                            this.form.quantity.value = setQty; 
                            forceError = true;
                            errorMsg = "Only "+ maxQty +" items were added to your cart due to availability.";
                          }  
                      }
        }
        // profuct details
        if(this.form.quantity.dataset.is_listing && parseInt(this.form.quantity.dataset.is_listing) == 1){
                debugger;
                 fetch("/cart.js")
                .then(response => response.json())
                .then(data => {
                  data.items.forEach(item => {
                    if (this.form.quantity.dataset.product_id == item.product_id) {
                       var added_qty = item.quantity > 0 ? parseInt(item.quantity) : 0;;
                      var maxQty = parseInt(this.form.quantity.dataset.max);
                      var inputQty = parseInt(this.form.quantity.value);
                      var remaningQty = parseInt(maxQty - added_qty)
                      var setQty = 0;
                      var errorMsg = "";
                      
                      if(this.form.quantity.dataset.is_pallet == 1){
                          if(inputQty > remaningQty){
                            setQty = remaningQty;
                            this.form.quantity.value = setQty; 
                            forceError = true;
                            errorMsg = "Only "+ maxQty +" items were added to your cart due to availability.";
                            this.handleErrorMessage(errorMsg);
                            return;
                          }
                      }else{
                          if(maxQty && inputQty > remaningQty){
                            setQty = remaningQty;
                            this.form.quantity.value = setQty; 
                            forceError = true;
                            errorMsg = "Only "+ maxQty +" items were added to your cart due to availability.";
                            this.handleErrorMessage(errorMsg);
                            return;
                          }  
                      }



                    
                    }
                  });

                  this.handleAddtoCart();
                
        })
                      }else{
           this.handleAddtoCart();
                      }
        this.handleErrorMessage();

        
      }

      handleAddtoCart(current){
        debugger;
        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');
       

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id)
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButtonText.classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }

            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                cartData: response,
              });
            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    this.cart.renderContents(response);
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              this.cart.renderContents(response);
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading__spinner').classList.add('hidden');
			if(forceError){
                const errorWrapper = document.querySelector(".product-form__error-message-wrapper");
                const errorMessage = document.querySelector(".product-form__error-message");
            
                if (errorWrapper && errorMessage) {
                    // Remove the hidden attribute
                    errorWrapper.removeAttribute("hidden");
            
                    // Update the error message text
                    errorMessage.textContent = errorMsg;
                }
            }
          });
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }

      toggleSubmitButton(disable = true, text) {
        if (disable) {
          this.submitButton.setAttribute('disabled', 'disabled');
          if (text) this.submitButtonText.textContent = text;
        } else {
          this.submitButton.removeAttribute('disabled');
          this.submitButtonText.textContent = window.variantStrings.addToCart;
        }
      }

      get variantIdInput() {
        return this.form.querySelector('[name=id]');
      }
    }
  );
}
