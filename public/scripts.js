function makeListeners() {
    document.querySelectorAll("input[type='radio']").forEach((radio) => {
        radio.addEventListener("change", function () {
          let labels = this.closest("form").querySelectorAll(`[name="${this.name}"]`);
        
          labels.forEach((input) => {
            input.parentElement.classList.remove("selected");
          });
      
          this.parentElement.classList.add("selected");
        });
      });
}

makeListeners();